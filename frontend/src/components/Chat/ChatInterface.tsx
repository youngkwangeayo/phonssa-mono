import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ChatMessage } from '../../types';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: white;
`;

const ChatHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e1e8ed;
  background-color: #f8f9fa;
`;

const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
`;

const HeaderSubtitle = styled.p`
  font-size: 14px;
  color: #7f8c8d;
  margin: 4px 0 0 0;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const WelcomeMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #7f8c8d;
`;

const WelcomeTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 16px;
  color: #3498db;
`;

const WelcomeText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
`;

const SampleQuestions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-top: 32px;
`;

const SampleQuestion = styled.button`
  padding: 10px 16px;
  background-color: #f8f9fa;
  border: 1px solid #e1e8ed;
  border-radius: 20px;
  font-size: 14px;
  color: #34495e;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #3498db;
    color: white;
    border-color: #3498db;
  }
`;

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // TODO: API 호출로 대체
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: `${content}에 대한 추천을 분석중입니다. 70만원대 아이폰을 찾고 계시는군요! iPhone 15 128GB 모델을 추천드립니다. 정가 77만원에서 50만원으로 35% 할인된 가격으로 구매 가능합니다.`,
          timestamp: new Date(),
          recommendations: [
            {
              product_id: 1,
              name: 'iPhone 15 128GB',
              price: 770000,
              discount_price: 500000,
              similarity_score: 0.95,
              reason: '가격대와 브랜드가 정확히 일치합니다'
            }
          ]
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('메시지 전송 실패:', error);
      setIsLoading(false);
    }
  };

  const handleSampleQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const sampleQuestions = [
    "70만원 정도의 아이폰을 보고 싶어요",
    "최신 아이폰을 가장 싸게 사고 싶어요",
    "공시지원금 높은 모델 추천해줘",
    "삼성 갤럭시 S24 시리즈 보여줘"
  ];

  return (
    <ChatContainer>
      <ChatHeader>
        <HeaderTitle>🧠 AI 스마트폰 추천</HeaderTitle>
        <HeaderSubtitle>원하는 조건을 자연어로 말씀해주세요. 실제 단가표 기반으로 최적의 제품을 추천해드립니다.</HeaderSubtitle>
      </ChatHeader>

      <MessagesContainer>
        {messages.length === 0 ? (
          <WelcomeMessage>
            <WelcomeTitle>안녕하세요! 👋</WelcomeTitle>
            <WelcomeText>
              어떤 스마트폰을 찾고 계신가요?<br />
              가격대, 브랜드, 기능 등 원하는 조건을 편하게 말씀해주세요.
            </WelcomeText>
            <SampleQuestions>
              {sampleQuestions.map((question, index) => (
                <SampleQuestion
                  key={index}
                  onClick={() => handleSampleQuestion(question)}
                >
                  {question}
                </SampleQuestion>
              ))}
            </SampleQuestions>
          </WelcomeMessage>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isLoading && (
              <MessageBubble
                message={{
                  id: 'loading',
                  type: 'assistant',
                  content: '추천을 분석하고 있습니다...',
                  timestamp: new Date(),
                }}
                isLoading={true}
              />
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </MessagesContainer>

      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </ChatContainer>
  );
};

export default ChatInterface;