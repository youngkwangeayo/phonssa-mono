import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const StatIcon = styled.div`
  font-size: 32px;
  margin-bottom: 12px;
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #7f8c8d;
  margin-bottom: 4px;
`;

const StatChange = styled.div<{ $positive: boolean }>`
  font-size: 12px;
  color: ${props => props.$positive ? '#27ae60' : '#e74c3c'};
  font-weight: 500;
`;

const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ChartTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 20px 0;
`;

const ChartPlaceholder = styled.div`
  height: 300px;
  background-color: #f8f9fa;
  border: 2px dashed #e1e8ed;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #7f8c8d;
`;

const RecentActivity = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ActivityHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid #e1e8ed;
`;

const ActivityTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
`;

const ActivityList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const ActivityItem = styled.div`
  padding: 16px 24px;
  border-bottom: 1px solid #e1e8ed;
  display: flex;
  align-items: center;
  gap: 12px;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f8f9fa;
  }
`;

const ActivityIcon = styled.div`
  font-size: 20px;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityText = styled.div`
  font-size: 14px;
  color: #2c3e50;
  margin-bottom: 4px;
`;

const ActivityTime = styled.div`
  font-size: 12px;
  color: #7f8c8d;
`;

const TopProducts = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-top: 24px;
`;

const TopProductsHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid #e1e8ed;
`;

const TopProductsTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
`;

const ProductList = styled.div`
  padding: 24px;
`;

const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #e1e8ed;

  &:last-child {
    border-bottom: none;
  }
`;

const ProductInfo = styled.div``;

const ProductName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #2c3e50;
  margin-bottom: 4px;
`;

const ProductBrand = styled.div`
  font-size: 12px;
  color: #7f8c8d;
`;

const ProductStats = styled.div`
  text-align: right;
`;

const ProductViews = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #3498db;
  margin-bottom: 4px;
`;

const ProductLabel = styled.div`
  font-size: 12px;
  color: #7f8c8d;
`;

interface StatItem {
  icon: string;
  value: string;
  label: string;
  change: string;
  positive: boolean;
}

interface ActivityItemData {
  id: string;
  icon: string;
  text: string;
  time: string;
}

interface TopProduct {
  id: number;
  name: string;
  brand: string;
  views: number;
}

const StatisticsSection: React.FC = () => {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [activities, setActivities] = useState<ActivityItemData[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    // TODO: API 호출로 대체
    setTimeout(() => {
      setStats([
        {
          icon: '📱',
          value: '1,247',
          label: '총 제품 수',
          change: '+12% 이번 달',
          positive: true
        },
        {
          icon: '💬',
          value: '3,456',
          label: '총 채팅 세션',
          change: '+8% 이번 달',
          positive: true
        },
        {
          icon: '📊',
          value: '89%',
          label: 'AI 추천 정확도',
          change: '+2% 지난 달',
          positive: true
        },
        {
          icon: '📂',
          value: '156',
          label: '업로드된 단가표',
          change: '+24% 이번 달',
          positive: true
        }
      ]);

      setActivities([
        {
          id: '1',
          icon: '📂',
          text: '새로운 단가표가 업로드되었습니다 (iPhone_16_prices.xlsx)',
          time: '5분 전'
        },
        {
          id: '2',
          icon: '💬',
          text: '사용자가 "70만원대 아이폰" 추천을 요청했습니다',
          time: '12분 전'
        },
        {
          id: '3',
          icon: '✅',
          text: 'Galaxy S24 제품 정보가 자동 분석 완료되었습니다',
          time: '25분 전'
        },
        {
          id: '4',
          icon: '📊',
          text: '관리자가 제품 가격을 수정했습니다 (iPhone 15 Pro)',
          time: '1시간 전'
        },
        {
          id: '5',
          icon: '🔄',
          text: '벡터 DB 인덱스가 업데이트되었습니다',
          time: '2시간 전'
        }
      ]);

      setTopProducts([
        { id: 1, name: 'iPhone 16 Pro', brand: 'Apple', views: 1234 },
        { id: 2, name: 'Galaxy S24 Ultra', brand: 'Samsung', views: 987 },
        { id: 3, name: 'iPhone 15', brand: 'Apple', views: 856 },
        { id: 4, name: 'Galaxy S24', brand: 'Samsung', views: 743 },
        { id: 5, name: 'iPhone 16', brand: 'Apple', views: 654 }
      ]);
    }, 1000);
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('ko-KR');
  };

  return (
    <SectionContainer>
      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard key={index}>
            <StatIcon>{stat.icon}</StatIcon>
            <StatValue>{stat.value}</StatValue>
            <StatLabel>{stat.label}</StatLabel>
            <StatChange $positive={stat.positive}>
              {stat.positive ? '📈' : '📉'} {stat.change}
            </StatChange>
          </StatCard>
        ))}
      </StatsGrid>

      <ChartsContainer>
        <ChartCard>
          <ChartTitle>📈 월별 채팅 세션 수</ChartTitle>
          <ChartPlaceholder>
            차트 컴포넌트 영역<br />
            (Chart.js 또는 Recharts 등으로 구현 예정)
          </ChartPlaceholder>
        </ChartCard>

        <ChartCard>
          <ChartTitle>🏷️ 브랜드별 분포</ChartTitle>
          <ChartPlaceholder>
            파이 차트 영역<br />
            (브랜드별 제품 분포)
          </ChartPlaceholder>
        </ChartCard>
      </ChartsContainer>

      <ChartsContainer>
        <RecentActivity>
          <ActivityHeader>
            <ActivityTitle>🕐 최근 활동</ActivityTitle>
          </ActivityHeader>
          <ActivityList>
            {activities.map((activity) => (
              <ActivityItem key={activity.id}>
                <ActivityIcon>{activity.icon}</ActivityIcon>
                <ActivityContent>
                  <ActivityText>{activity.text}</ActivityText>
                  <ActivityTime>{activity.time}</ActivityTime>
                </ActivityContent>
              </ActivityItem>
            ))}
          </ActivityList>
        </RecentActivity>

        <TopProducts>
          <TopProductsHeader>
            <TopProductsTitle>🔥 인기 제품</TopProductsTitle>
          </TopProductsHeader>
          <ProductList>
            {topProducts.map((product, index) => (
              <ProductItem key={product.id}>
                <ProductInfo>
                  <ProductName>
                    {index + 1}. {product.name}
                  </ProductName>
                  <ProductBrand>{product.brand}</ProductBrand>
                </ProductInfo>
                <ProductStats>
                  <ProductViews>{formatNumber(product.views)}</ProductViews>
                  <ProductLabel>조회수</ProductLabel>
                </ProductStats>
              </ProductItem>
            ))}
          </ProductList>
        </TopProducts>
      </ChartsContainer>
    </SectionContainer>
  );
};

export default StatisticsSection;