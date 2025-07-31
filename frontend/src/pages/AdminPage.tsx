import React, { useState } from 'react';
import styled from 'styled-components';
import FileUploadSection from '../components/Admin/FileUploadSection';
import DataManagementSection from '../components/Admin/DataManagementSection';
import StatisticsSection from '../components/Admin/StatisticsSection';

const PageContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
`;

const Header = styled.div`
  padding: 20px;
  background-color: white;
  border-bottom: 1px solid #e1e8ed;
`;

const HeaderTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 8px 0;
`;

const HeaderSubtitle = styled.p`
  font-size: 16px;
  color: #7f8c8d;
  margin: 0;
`;

const TabContainer = styled.div`
  display: flex;
  background-color: white;
  border-bottom: 1px solid #e1e8ed;
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 16px 24px;
  background-color: ${props => props.$active ? '#3498db' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#7f8c8d'};
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 3px solid ${props => props.$active ? '#3498db' : 'transparent'};

  &:hover {
    background-color: ${props => props.$active ? '#3498db' : '#f8f9fa'};
    color: ${props => props.$active ? 'white' : '#2c3e50'};
  }
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
`;

type TabType = 'upload' | 'management' | 'statistics';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('upload');

  const tabs = [
    { id: 'upload' as TabType, label: '📂 파일 업로드', icon: '📂' },
    { id: 'management' as TabType, label: '📊 데이터 관리', icon: '📊' },
    { id: 'statistics' as TabType, label: '📈 통계', icon: '📈' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'upload':
        return <FileUploadSection />;
      case 'management':
        return <DataManagementSection />;
      case 'statistics':
        return <StatisticsSection />;
      default:
        return <FileUploadSection />;
    }
  };

  return (
    <PageContainer>
      <Header>
        <HeaderTitle>⚙️ 관리자 대시보드</HeaderTitle>
        <HeaderSubtitle>단가표 업로드, 데이터 관리, 통계 조회 등 관리 기능을 제공합니다.</HeaderSubtitle>
      </Header>

      <TabContainer>
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            $active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            <span style={{ marginRight: '8px' }}>{tab.icon}</span>
            {tab.label}
          </Tab>
        ))}
      </TabContainer>

      <Content>
        {renderContent()}
      </Content>
    </PageContainer>
  );
};

export default AdminPage;