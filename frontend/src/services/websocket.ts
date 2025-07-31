import { io, Socket } from 'socket.io-client';
import { ChatMessage } from '../types';

export interface WebSocketEvents {
  // 클라이언트에서 서버로
  'join-session': (sessionId: string) => void;
  'leave-session': (sessionId: string) => void;
  'chat-message': (data: { sessionId: string; message: string; userId?: string }) => void;
  
  // 서버에서 클라이언트로
  'chat-response': (data: {
    sessionId: string;
    message: string;
    recommendations?: any[];
    processingTime: number;
  }) => void;
  'chat-error': (data: { sessionId: string; error: string }) => void;
  'chat-status': (data: { sessionId: string; status: 'processing' | 'completed' | 'failed' }) => void;
  'upload-progress': (data: { fileId: string; progress: number; status: string }) => void;
  'upload-complete': (data: { fileId: string; result: any }) => void;
  'upload-error': (data: { fileId: string; error: string }) => void;
}

class WebSocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  constructor() {
    this.connect();
  }

  private connect() {
    const wsUrl = process.env.REACT_APP_WS_URL || 'http://localhost:3001';
    
    this.socket = io(wsUrl, {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: this.reconnectDelay,
      transports: ['websocket', 'polling'],
    });

    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('WebSocket connected:', this.socket?.id);
      this.reconnectAttempts = 0;
      
      // 인증 토큰이 있으면 전송
      const token = localStorage.getItem('authToken');
      if (token) {
        this.socket?.emit('authenticate', { token });
      }
    });

    this.socket.on('disconnect', (reason) => {
      console.log('WebSocket disconnected:', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      this.handleReconnect();
    });

    this.socket.on('reconnect', (attemptNumber) => {
      console.log('WebSocket reconnected after', attemptNumber, 'attempts');
    });

    this.socket.on('reconnect_error', (error) => {
      console.error('WebSocket reconnection error:', error);
    });

    this.socket.on('reconnect_failed', () => {
      console.error('WebSocket reconnection failed after', this.maxReconnectAttempts, 'attempts');
    });
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.socket?.connect();
      }, this.reconnectDelay * this.reconnectAttempts);
    }
  }

  // 연결 상태 확인
  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  // 세션 입장
  joinSession(sessionId: string) {
    if (this.socket?.connected) {
      this.socket.emit('join-session', sessionId);
    }
  }

  // 세션 퇴장
  leaveSession(sessionId: string) {
    if (this.socket?.connected) {
      this.socket.emit('leave-session', sessionId);
    }
  }

  // 채팅 메시지 전송
  sendChatMessage(sessionId: string, message: string, userId?: string) {
    if (this.socket?.connected) {
      this.socket.emit('chat-message', { sessionId, message, userId });
    } else {
      throw new Error('WebSocket is not connected');
    }
  }

  // 채팅 응답 수신 리스너 등록
  onChatResponse(callback: (data: {
    sessionId: string;
    message: string;
    recommendations?: any[];
    processingTime: number;
  }) => void) {
    if (this.socket) {
      this.socket.on('chat-response', callback);
    }
  }

  // 채팅 에러 수신 리스너 등록
  onChatError(callback: (data: { sessionId: string; error: string }) => void) {
    if (this.socket) {
      this.socket.on('chat-error', callback);
    }
  }

  // 채팅 상태 수신 리스너 등록
  onChatStatus(callback: (data: { sessionId: string; status: 'processing' | 'completed' | 'failed' }) => void) {
    if (this.socket) {
      this.socket.on('chat-status', callback);
    }
  }

  // 파일 업로드 진행상황 수신 리스너 등록
  onUploadProgress(callback: (data: { fileId: string; progress: number; status: string }) => void) {
    if (this.socket) {
      this.socket.on('upload-progress', callback);
    }
  }

  // 파일 업로드 완료 수신 리스너 등록
  onUploadComplete(callback: (data: { fileId: string; result: any }) => void) {
    if (this.socket) {
      this.socket.on('upload-complete', callback);
    }
  }

  // 파일 업로드 에러 수신 리스너 등록
  onUploadError(callback: (data: { fileId: string; error: string }) => void) {
    if (this.socket) {
      this.socket.on('upload-error', callback);
    }
  }

  // 이벤트 리스너 제거
  off(event: string, callback?: (...args: any[]) => void) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  // 모든 이벤트 리스너 제거
  removeAllListeners() {
    if (this.socket) {
      this.socket.removeAllListeners();
      this.setupEventListeners(); // 기본 연결 이벤트들은 다시 등록
    }
  }

  // WebSocket 연결 해제
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // WebSocket 재연결
  reconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
    this.connect();
  }

  // 인증 토큰 업데이트
  updateAuthToken(token: string) {
    if (this.socket?.connected) {
      this.socket.emit('authenticate', { token });
    }
  }
}

// 싱글톤 인스턴스 생성
export const webSocketService = new WebSocketService();
export default webSocketService;