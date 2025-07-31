import { useState, useEffect, useCallback, useRef } from 'react';
import { ChatMessage, ProductRecommendation } from '../types';
import { apiService } from '../services/api';
import { webSocketService } from '../services/websocket';

interface UseChatOptions {
  sessionId?: string;
  userId?: string;
  enableWebSocket?: boolean;
}

interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sessionId: string | null;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  retryLastMessage: () => Promise<void>;
}

export const useChat = (options: UseChatOptions = {}): UseChatReturn => {
  const { userId, enableWebSocket = true } = options;
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(options.sessionId || null);
  
  const lastMessageRef = useRef<string>('');
  const retryCountRef = useRef<number>(0);
  const maxRetries = 3;

  // WebSocket 이벤트 리스너 설정
  useEffect(() => {
    if (!enableWebSocket) return;

    const handleChatResponse = (data: {
      sessionId: string;
      message: string;
      recommendations?: ProductRecommendation[];
      processingTime: number;
    }) => {
      if (data.sessionId === sessionId) {
        const aiMessage: ChatMessage = {
          id: Date.now().toString(),
          type: 'assistant',
          content: data.message,
          timestamp: new Date(),
          recommendations: data.recommendations,
        };

        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
        setError(null);
        retryCountRef.current = 0;
      }
    };

    const handleChatError = (data: { sessionId: string; error: string }) => {
      if (data.sessionId === sessionId) {
        setError(data.error);
        setIsLoading(false);
      }
    };

    const handleChatStatus = (data: { 
      sessionId: string; 
      status: 'processing' | 'completed' | 'failed' 
    }) => {
      if (data.sessionId === sessionId) {
        if (data.status === 'processing') {
          setIsLoading(true);
          setError(null);
        } else if (data.status === 'failed') {
          setError('메시지 처리 중 오류가 발생했습니다.');
          setIsLoading(false);
        }
      }
    };

    // WebSocket 이벤트 리스너 등록
    webSocketService.onChatResponse(handleChatResponse);
    webSocketService.onChatError(handleChatError);
    webSocketService.onChatStatus(handleChatStatus);

    // 세션 입장
    if (sessionId) {
      webSocketService.joinSession(sessionId);
    }

    // 클린업
    return () => {
      webSocketService.off('chat-response', handleChatResponse);
      webSocketService.off('chat-error', handleChatError);
      webSocketService.off('chat-status', handleChatStatus);
      
      if (sessionId) {
        webSocketService.leaveSession(sessionId);
      }
    };
  }, [sessionId, enableWebSocket]);

  // 메시지 전송
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    if (isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);
    lastMessageRef.current = content.trim();

    try {
      if (enableWebSocket && webSocketService.isConnected()) {
        // WebSocket으로 실시간 전송
        if (sessionId) {
          webSocketService.sendChatMessage(sessionId, content.trim(), userId);
        } else {
          throw new Error('Session ID가 없습니다.');
        }
      } else {
        // REST API로 전송 (fallback)
        const response = await apiService.sendChatMessage({
          content: content.trim(),
          userId,
          sessionId: sessionId || undefined,
        });

        // 새 세션 ID 저장
        if (response.sessionId && response.sessionId !== sessionId) {
          setSessionId(response.sessionId);
        }

        // AI 응답 메시지 추가
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: response.response,
          timestamp: new Date(),
          recommendations: response.recommendations,
        };

        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
        retryCountRef.current = 0;
      }
    } catch (err: any) {
      console.error('메시지 전송 실패:', err);
      setError(err.message || '메시지 전송에 실패했습니다.');
      setIsLoading(false);
    }
  }, [sessionId, userId, isLoading, enableWebSocket]);

  // 마지막 메시지 재시도
  const retryLastMessage = useCallback(async () => {
    if (!lastMessageRef.current || retryCountRef.current >= maxRetries) {
      setError('최대 재시도 횟수를 초과했습니다.');
      return;
    }

    retryCountRef.current++;
    await sendMessage(lastMessageRef.current);
  }, [sendMessage]);

  // 메시지 목록 초기화
  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
    setIsLoading(false);
    lastMessageRef.current = '';
    retryCountRef.current = 0;
  }, []);

  // 기존 세션 로드
  useEffect(() => {
    const loadExistingSession = async () => {
      if (sessionId && messages.length === 0) {
        try {
          const session = await apiService.getChatSession(sessionId);
          
          const loadedMessages: ChatMessage[] = [];
          
          // 사용자 메시지 추가
          if (session.message) {
            loadedMessages.push({
              id: `user-${session.id}`,
              type: 'user',
              content: session.message,
              timestamp: new Date(session.created_at),
            });
          }
          
          // AI 응답 추가
          if (session.response) {
            loadedMessages.push({
              id: `assistant-${session.id}`,
              type: 'assistant',
              content: session.response,
              timestamp: new Date(session.updated_at),
              recommendations: session.recommended_products,
            });
          }
          
          setMessages(loadedMessages);
        } catch (err) {
          console.error('세션 로드 실패:', err);
          setError('이전 대화를 불러오는데 실패했습니다.');
        }
      }
    };

    loadExistingSession();
  }, [sessionId]);

  return {
    messages,
    isLoading,
    error,
    sessionId,
    sendMessage,
    clearMessages,
    retryLastMessage,
  };
};