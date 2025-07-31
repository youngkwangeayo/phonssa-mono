import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  padding: 20px;
  border-top: 1px solid #e1e8ed;
  background-color: #f8f9fa;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 12px;
  max-width: 800px;
  margin: 0 auto;
`;

const TextAreaWrapper = styled.div`
  flex: 1;
  position: relative;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 44px;
  max-height: 120px;
  padding: 12px 50px 12px 16px;
  border: 1px solid #e1e8ed;
  border-radius: 22px;
  font-size: 15px;
  font-family: inherit;
  resize: none;
  outline: none;
  background-color: white;
  transition: border-color 0.2s;

  &:focus {
    border-color: #3498db;
  }

  &:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #95a5a6;
  }
`;

const SendButton = styled.button<{ $disabled: boolean }>`
  position: absolute;
  right: 8px;
  bottom: 8px;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background-color: ${props => props.$disabled ? '#bdc3c7' : '#3498db'};
  color: white;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #2980b9;
  }
`;

const VoiceButton = styled.button`
  width: 44px;
  height: 44px;
  border: 1px solid #e1e8ed;
  border-radius: 50%;
  background-color: white;
  color: #7f8c8d;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: all 0.2s;

  &:hover {
    background-color: #3498db;
    color: white;
    border-color: #3498db;
  }
`;

const AttachButton = styled.button`
  width: 44px;
  height: 44px;
  border: 1px solid #e1e8ed;
  border-radius: 50%;
  background-color: white;
  color: #7f8c8d;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: all 0.2s;

  &:hover {
    background-color: #27ae60;
    color: white;
    border-color: #27ae60;
  }
`;

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      adjustTextAreaHeight();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextAreaHeight = () => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = 'auto';
      textArea.style.height = `${Math.min(textArea.scrollHeight, 120)}px`;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    adjustTextAreaHeight();
  };

  const handleVoiceInput = () => {
    // TODO: 음성 입력 기능 구현
    console.log('음성 입력 버튼 클릭');
  };

  const handleFileAttach = () => {
    // TODO: 파일 첨부 기능 구현
    console.log('파일 첨부 버튼 클릭');
  };

  return (
    <InputContainer>
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <VoiceButton type="button" onClick={handleVoiceInput}>
            🎙️
          </VoiceButton>
          
          <TextAreaWrapper>
            <TextArea
              ref={textAreaRef}
              value={message}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="원하는 스마트폰 조건을 입력해주세요... (예: 70만원대 아이폰)"
              disabled={disabled}
              rows={1}
            />
            <SendButton
              type="submit"
              $disabled={disabled || !message.trim()}
              disabled={disabled || !message.trim()}
            >
              ➤
            </SendButton>
          </TextAreaWrapper>

          <AttachButton type="button" onClick={handleFileAttach}>
            ➕
          </AttachButton>
        </InputWrapper>
      </form>
    </InputContainer>
  );
};

export default ChatInput;