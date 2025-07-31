import React from 'react';
import styled from 'styled-components';
import { ProductRecommendation } from '../../types';

const CardContainer = styled.div`
  background-color: white;
  border: 1px solid #e1e8ed;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ProductName = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 8px 0;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`;

const OriginalPrice = styled.span`
  font-size: 14px;
  color: #95a5a6;
  text-decoration: line-through;
`;

const DiscountPrice = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #e74c3c;
`;

const DiscountBadge = styled.span`
  background-color: #e74c3c;
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
`;

const SimilarityScore = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 8px;
`;

const ScoreBar = styled.div<{ score: number }>`
  flex: 1;
  height: 4px;
  background-color: #ecf0f1;
  border-radius: 2px;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    width: ${props => props.score * 100}%;
    height: 100%;
    background-color: ${props => 
      props.score >= 0.8 ? '#27ae60' : 
      props.score >= 0.6 ? '#f39c12' : '#e74c3c'
    };
    transition: width 0.3s ease;
  }
`;

const ScoreText = styled.span`
  font-size: 12px;
  color: #7f8c8d;
  font-weight: 500;
`;

const Reason = styled.p`
  font-size: 13px;
  color: #7f8c8d;
  margin: 0;
  line-height: 1.4;
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 12px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2980b9;
  }
`;

interface ProductRecommendationCardProps {
  recommendation: ProductRecommendation;
}

const ProductRecommendationCard: React.FC<ProductRecommendationCardProps> = ({
  recommendation
}) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR') + '원';
  };

  const calculateDiscountRate = () => {
    if (!recommendation.discount_price) return 0;
    return Math.round(((recommendation.price - recommendation.discount_price) / recommendation.price) * 100);
  };

  const discountRate = calculateDiscountRate();

  const handleViewDetails = () => {
    // TODO: 제품 상세보기 모달 또는 페이지로 이동
    console.log('제품 상세보기:', recommendation.product_id);
  };

  return (
    <CardContainer>
      <ProductName>{recommendation.name}</ProductName>
      
      <PriceContainer>
        {recommendation.discount_price ? (
          <>
            <OriginalPrice>{formatPrice(recommendation.price)}</OriginalPrice>
            <DiscountPrice>{formatPrice(recommendation.discount_price)}</DiscountPrice>
            {discountRate > 0 && (
              <DiscountBadge>{discountRate}% 할인</DiscountBadge>
            )}
          </>
        ) : (
          <DiscountPrice>{formatPrice(recommendation.price)}</DiscountPrice>
        )}
      </PriceContainer>

      <SimilarityScore>
        <ScoreText>매칭도</ScoreText>
        <ScoreBar score={recommendation.similarity_score} />
        <ScoreText>{Math.round(recommendation.similarity_score * 100)}%</ScoreText>
      </SimilarityScore>

      <Reason>{recommendation.reason}</Reason>

      <ActionButton onClick={handleViewDetails}>
        자세히 보기
      </ActionButton>
    </CardContainer>
  );
};

export default ProductRecommendationCard;