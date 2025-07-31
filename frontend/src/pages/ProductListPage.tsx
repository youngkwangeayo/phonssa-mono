import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Product } from '../types';

const PageContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const Header = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e1e8ed;
  background-color: #f8f9fa;
`;

const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 8px 0;
`;

const HeaderSubtitle = styled.p`
  font-size: 14px;
  color: #7f8c8d;
  margin: 0;
`;

const FilterSection = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e1e8ed;
  background-color: white;
`;

const FilterTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 16px 0;
`;

const FilterRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FilterLabel = styled.label`
  font-size: 12px;
  color: #7f8c8d;
  font-weight: 500;
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #e1e8ed;
  border-radius: 6px;
  font-size: 14px;
  background-color: white;
  min-width: 120px;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #e1e8ed;
  border-radius: 6px;
  font-size: 14px;
  min-width: 200px;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const SearchButton = styled.button`
  padding: 8px 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2980b9;
  }
`;

const ProductCount = styled.div`
  padding: 16px 20px;
  font-size: 14px;
  color: #7f8c8d;
  background-color: #f8f9fa;
`;

const TableContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.thead`
  background-color: #f8f9fa;
`;

const TableHeaderCell = styled.th`
  padding: 16px 12px;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: #2c3e50;
  border-bottom: 1px solid #e1e8ed;

  &:first-child {
    border-top-left-radius: 8px;
  }

  &:last-child {
    border-top-right-radius: 8px;
  }
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:hover {
    background-color: #f8f9fa;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #e1e8ed;
  }
`;

const TableCell = styled.td`
  padding: 16px 12px;
  font-size: 14px;
  color: #2c3e50;
`;

const ProductName = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

const ProductModel = styled.div`
  font-size: 12px;
  color: #7f8c8d;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;


const DiscountPrice = styled.span`
  font-weight: 600;
  color: #e74c3c;
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${props => {
    switch (props.status) {
      case 'active': return '#27ae60';
      case 'inactive': return '#95a5a6';
      case 'out_of_stock': return '#e74c3c';
      default: return '#95a5a6';
    }
  }};
  color: white;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 16px;
  color: #7f8c8d;
`;

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    brand: '',
    category: '',
    priceRange: '',
    status: '',
    search: ''
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      // TODO: API 호출로 대체
      setTimeout(() => {
        const mockProducts: Product[] = [
          {
            id: 1,
            name: 'iPhone 16 Pro',
            brand: 'Apple',
            model: '256GB',
            category: '스마트폰',
            price: 770000,
            discount_price: 500000,
            discount_rate: 35,
            stock_quantity: 25,
            status: 'active',
            created_at: '2024-01-01',
            updated_at: '2024-01-01'
          },
          {
            id: 2,
            name: 'iPhone 16',
            brand: 'Apple',
            model: '128GB',
            category: '스마트폰',
            price: 650000,
            discount_price: 420000,
            discount_rate: 35,
            stock_quantity: 40,
            status: 'active',
            created_at: '2024-01-01',
            updated_at: '2024-01-01'
          },
          {
            id: 3,
            name: 'Galaxy S25',
            brand: 'Samsung',
            model: '256GB',
            category: '스마트폰',
            price: 620000,
            discount_price: 480000,
            discount_rate: 23,
            stock_quantity: 18,
            status: 'active',
            created_at: '2024-01-01',
            updated_at: '2024-01-01'
          }
        ];
        setProducts(mockProducts);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('제품 목록 로드 실패:', error);
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    // TODO: 필터링된 검색 구현
    console.log('검색 실행:', filters);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR') + '원';
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '활성';
      case 'inactive': return '비활성';
      case 'out_of_stock': return '품절';
      default: return status;
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <LoadingContainer>제품 목록을 불러오는 중...</LoadingContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header>
        <HeaderTitle>📊 상품 단가표 관리</HeaderTitle>
        <HeaderSubtitle>등록된 모든 제품의 정보를 확인하고 관리할 수 있습니다.</HeaderSubtitle>
      </Header>

      <FilterSection>
        <FilterTitle>🔍 필터 옵션</FilterTitle>
        <FilterRow>
          <FilterGroup>
            <FilterLabel>브랜드</FilterLabel>
            <Select 
              value={filters.brand} 
              onChange={(e) => handleFilterChange('brand', e.target.value)}
            >
              <option value="">전체</option>
              <option value="Apple">Apple</option>
              <option value="Samsung">Samsung</option>
              <option value="LG">LG</option>
            </Select>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>카테고리</FilterLabel>
            <Select 
              value={filters.category} 
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="">전체</option>
              <option value="스마트폰">스마트폰</option>
              <option value="태블릿">태블릿</option>
              <option value="액세서리">액세서리</option>
            </Select>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>가격대</FilterLabel>
            <Select 
              value={filters.priceRange} 
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            >
              <option value="">전체</option>
              <option value="0-300000">30만원 이하</option>
              <option value="300000-600000">30-60만원</option>
              <option value="600000-1000000">60-100만원</option>
              <option value="1000000-">100만원 이상</option>
            </Select>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>재고상태</FilterLabel>
            <Select 
              value={filters.status} 
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="">전체</option>
              <option value="active">활성</option>
              <option value="inactive">비활성</option>
              <option value="out_of_stock">품절</option>
            </Select>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>검색</FilterLabel>
            <SearchInput
              type="text"
              placeholder="제품명 검색..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </FilterGroup>

          <SearchButton onClick={handleSearch}>🔍 검색</SearchButton>
        </FilterRow>
      </FilterSection>

      <ProductCount>
        📊 총 {products.length}개 상품 중 {products.length}개 표시
      </ProductCount>

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableHeaderCell>ID</TableHeaderCell>
              <TableHeaderCell>상품명</TableHeaderCell>
              <TableHeaderCell>정가</TableHeaderCell>
              <TableHeaderCell>할인가</TableHeaderCell>
              <TableHeaderCell>할인율</TableHeaderCell>
              <TableHeaderCell>재고</TableHeaderCell>
              <TableHeaderCell>상태</TableHeaderCell>
            </tr>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{String(product.id).padStart(3, '0')}</TableCell>
                <TableCell>
                  <ProductName>{product.name}</ProductName>
                  <ProductModel>{product.brand} {product.model}</ProductModel>
                </TableCell>
                <TableCell>{formatPrice(product.price)}</TableCell>
                <TableCell>
                  <PriceContainer>
                    {product.discount_price ? (
                      <DiscountPrice>{formatPrice(product.discount_price)}</DiscountPrice>
                    ) : (
                      <span>-</span>
                    )}
                  </PriceContainer>
                </TableCell>
                <TableCell>
                  {product.discount_rate ? `${product.discount_rate}%` : '-'}
                </TableCell>
                <TableCell>{product.stock_quantity}</TableCell>
                <TableCell>
                  <StatusBadge status={product.status}>
                    {getStatusText(product.status)}
                  </StatusBadge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PageContainer>
  );
};

export default ProductListPage;