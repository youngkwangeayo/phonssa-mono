import React from 'react';
import styled from 'styled-components';
import { ChatMessage } from '../../types';
import ProductRecommendationCard from './ProductRecommendationCard';

const MessageContainer = styled.div<{ $isUser: boolean }>`
  display: flex;
  justify-content: ${props => props.$isUser ? 'flex-end' : 'flex-start'};
  margin-bottom: 16px;
`;

const MessageBubbleContainer = styled.div<{ $isUser: boolean; $isLoading?: boolean }>`
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 18px;
  background-color: ${props => props.$isUser ? '#3498db' : '#f8f9fa'};
  color: ${props => props.$isUser ? 'white' : '#2c3e50'};
  word-wrap: break-word;
  position: relative;
  opacity: ${props => props.$isLoading ? 0.7 : 1};

  ${props => props.$isUser ? `
    border-bottom-right-radius: 4px;
  ` : `
    border-bottom-left-radius: 4px;
  `}
`;

const MessageContent = styled.div`
  font-size: 15px;
  line-height: 1.4;
  white-space: pre-wrap;
`;

const MessageTime = styled.div<{ $isUser: boolean }>`
  font-size: 11px;
  color: ${props => props.$isUser ? 'rgba(255, 255, 255, 0.7)' : '#95a5a6'};
  margin-top: 4px;
  text-align: ${props => props.$isUser ? 'right' : 'left'};
`;

const LoadingDots = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 2px;

  &::after {
    content: '';
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #3498db;
    animation: loading 1.4s infinite ease-in-out;
  }

  &::before {
    content: '';
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #3498db;
    animation: loading 1.4s infinite ease-in-out;
    animation-delay: -0.32s;
    margin-right: 2px;
  }

  @keyframes loading {
    0%, 80%, 100% {
      opacity: 0.3;
      transform: scale(0.8);
    }
    40% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const RecommendationsContainer = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AIBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #3498db;
  margin-bottom: 8px;
  font-weight: 500;
`;

interface MessageBubbleProps {
  message: ChatMessage;
  isLoading?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isLoading = false }) => {
  const isUser = message.type === 'user';

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <MessageContainer $isUser={isUser}>
      <MessageBubbleContainer $isUser={isUser} $isLoading={isLoading}>
        {!isUser && (
          <AIBadge>
            <span>🧠</span>
            <span>AI phonSsa</span>
          </AIBadge>
        )}
        
        <MessageContent>
          {message.content}
          {isLoading && <LoadingDots />}
        </MessageContent>

        {message.recommendations && message.recommendations.length > 0 && (
          <RecommendationsContainer>
            {message.recommendations.map((recommendation, index) => (
              <ProductRecommendationCard
                key={`${message.id}-rec-${index}`}
                recommendation={recommendation}
              />
            ))}
          </RecommendationsContainer>
        )}

        <MessageTime $isUser={isUser}>
          {formatTime(message.timestamp)}
        </MessageTime>
      </MessageBubbleContainer>
    </MessageContainer>
  );
};

export default MessageBubble;