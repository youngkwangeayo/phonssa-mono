import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import MainLayout from './components/Layout/MainLayout';
import ChatPage from './pages/ChatPage';
import AdminPage from './pages/AdminPage';
import ProductListPage from './pages/ProductListPage';

const AppContainer = styled.div`
  height: 100vh;
  display: flex;
  background-color: #f5f5f5;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<ChatPage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="products" element={<ProductListPage />} />
            <Route path="admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;