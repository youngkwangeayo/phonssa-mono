import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 280px;
  background-color: #2c3e50;
  color: white;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Logo = styled.div`
  padding: 20px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid #34495e;
  color: #3498db;
`;

const Nav = styled.nav`
  flex: 1;
  padding: 20px 0;
`;

const NavItem = styled(Link)<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: ${props => props.$isActive ? '#3498db' : '#ecf0f1'};
  text-decoration: none;
  font-size: 16px;
  background-color: ${props => props.$isActive ? '#34495e' : 'transparent'};
  transition: background-color 0.2s;

  &:hover {
    background-color: #34495e;
    color: #3498db;
  }

  &::before {
    content: '▷';
    margin-right: 10px;
    font-size: 14px;
  }
`;

const UserProfile = styled.div`
  padding: 20px;
  border-top: 1px solid #34495e;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #3498db;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-weight: 500;
  font-size: 14px;
`;

const UserRole = styled.span`
  font-size: 12px;
  color: #bdc3c7;
`;

const Sidebar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/chat', label: '새 채팅', icon: '💬' },
    { path: '/products', label: '표 보기', icon: '📊' },
    { path: '/admin', label: '관리자', icon: '⚙️' },
  ];

  return (
    <SidebarContainer>
      <Logo>📱 Phonssa</Logo>
      
      <Nav>
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            to={item.path}
            $isActive={location.pathname === item.path}
          >
            <span style={{ marginRight: '8px' }}>{item.icon}</span>
            {item.label}
          </NavItem>
        ))}
      </Nav>

      <UserProfile>
        <Avatar>👤</Avatar>
        <UserInfo>
          <UserName>사용자</UserName>
          <UserRole>일반 사용자</UserRole>
        </UserInfo>
      </UserProfile>
    </SidebarContainer>
  );
};

export default Sidebar;