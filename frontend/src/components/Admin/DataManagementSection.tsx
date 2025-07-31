import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Product } from '../../types';

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ManagementCard = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const CardHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid #e1e8ed;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLeft = styled.div``;

const CardTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 8px 0;
`;

const CardDescription = styled.p`
  font-size: 14px;
  color: #7f8c8d;
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'success' | 'danger' }>`
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${props => {
    switch (props.variant) {
      case 'success': return '#27ae60';
      case 'danger': return '#e74c3c';
      case 'primary':
      default: return '#3498db';
    }
  }};
  color: white;

  &:hover {
    background-color: ${props => {
      switch (props.variant) {
        case 'success': return '#229954';
        case 'danger': return '#c0392b';
        case 'primary':
        default: return '#2980b9';
      }
    }};
  }
`;

const FilterSection = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #e1e8ed;
  background-color: #f8f9fa;
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

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
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
  white-space: nowrap;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr<{ $selected?: boolean }>`
  background-color: ${props => props.$selected ? '#f0f8ff' : 'transparent'};
  
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
  white-space: nowrap;
`;

const Checkbox = styled.input`
  margin: 0;
  cursor: pointer;
`;

const EditableCell = styled.input`
  border: none;
  background: transparent;
  font-size: 14px;
  color: #2c3e50;
  width: 100%;
  padding: 4px;
  border-radius: 4px;

  &:focus {
    outline: none;
    background-color: #f8f9fa;
    border: 1px solid #3498db;
  }
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

const BulkActions = styled.div`
  padding: 16px 24px;
  background-color: #e8f4fd;
  border-bottom: 1px solid #e1e8ed;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const BulkActionText = styled.span`
  font-size: 14px;
  color: #2c3e50;
`;

const Pagination = styled.div`
  padding: 20px 24px;
  display: flex;
  justify-content: between;
  align-items: center;
  background-color: #f8f9fa;
`;

const PageInfo = styled.div`
  font-size: 14px;
  color: #7f8c8d;
`;

const PageControls = styled.div`
  display: flex;
  gap: 8px;
  margin-left: auto;
`;

const PageButton = styled.button<{ $active?: boolean }>`
  padding: 8px 12px;
  border: 1px solid #e1e8ed;
  background-color: ${props => props.$active ? '#3498db' : 'white'};
  color: ${props => props.$active ? 'white' : '#2c3e50'};
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: ${props => props.$active ? '#3498db' : '#f8f9fa'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DataManagementSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    brand: '',
    status: '',
    search: ''
  });

  const itemsPerPage = 10;

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    // TODO: API 호출로 대체
    const mockProducts: Product[] = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `제품 ${i + 1}`,
      brand: ['Apple', 'Samsung', 'LG'][i % 3],
      model: `Model ${i + 1}`,
      category: '스마트폰',
      price: 500000 + (i * 50000),
      discount_price: 400000 + (i * 40000),
      discount_rate: 20,
      stock_quantity: Math.floor(Math.random() * 100),
      status: ['active', 'inactive', 'out_of_stock'][i % 3] as 'active' | 'inactive' | 'out_of_stock',
      created_at: '2024-01-01',
      updated_at: '2024-01-01'
    }));
    setProducts(mockProducts);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(products.map(p => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
    }
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
  };

  const handleSave = (id: number) => {
    // TODO: API 호출로 저장
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleBulkDelete = () => {
    if (window.confirm(`선택된 ${selectedIds.length}개 항목을 삭제하시겠습니까?`)) {
      setProducts(prev => prev.filter(p => !selectedIds.includes(p.id)));
      setSelectedIds([]);
    }
  };

  const handleBulkStatusChange = (status: 'active' | 'inactive') => {
    setProducts(prev => 
      prev.map(p => 
        selectedIds.includes(p.id) ? { ...p, status } : p
      )
    );
    setSelectedIds([]);
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

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <SectionContainer>
      <ManagementCard>
        <CardHeader>
          <HeaderLeft>
            <CardTitle>📊 제품 데이터 관리</CardTitle>
            <CardDescription>
              등록된 제품 정보를 직접 수정하고 관리할 수 있습니다.
            </CardDescription>
          </HeaderLeft>
          <HeaderActions>
            <ActionButton variant="success">📥 내보내기</ActionButton>
            <ActionButton variant="primary">➕ 신규 추가</ActionButton>
          </HeaderActions>
        </CardHeader>

        <FilterSection>
          <FilterRow>
            <FilterGroup>
              <FilterLabel>브랜드</FilterLabel>
              <Select 
                value={filters.brand} 
                onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value }))}
              >
                <option value="">전체</option>
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                <option value="LG">LG</option>
              </Select>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>상태</FilterLabel>
              <Select 
                value={filters.status} 
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
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
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              />
            </FilterGroup>
          </FilterRow>
        </FilterSection>

        {selectedIds.length > 0 && (
          <BulkActions>
            <BulkActionText>{selectedIds.length}개 항목 선택됨</BulkActionText>
            <ActionButton onClick={() => handleBulkStatusChange('active')}>
              활성화
            </ActionButton>
            <ActionButton onClick={() => handleBulkStatusChange('inactive')}>
              비활성화
            </ActionButton>
            <ActionButton variant="danger" onClick={handleBulkDelete}>
              삭제
            </ActionButton>
          </BulkActions>
        )}

        <TableContainer>
          <Table>
            <TableHeader>
              <tr>
                <TableHeaderCell>
                  <Checkbox
                    type="checkbox"
                    checked={selectedIds.length === products.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </TableHeaderCell>
                <TableHeaderCell>ID</TableHeaderCell>
                <TableHeaderCell>제품명</TableHeaderCell>
                <TableHeaderCell>브랜드</TableHeaderCell>
                <TableHeaderCell>정가</TableHeaderCell>
                <TableHeaderCell>할인가</TableHeaderCell>
                <TableHeaderCell>재고</TableHeaderCell>
                <TableHeaderCell>상태</TableHeaderCell>
                <TableHeaderCell>액션</TableHeaderCell>
              </tr>
            </TableHeader>
            <TableBody>
              {currentProducts.map((product) => (
                <TableRow 
                  key={product.id} 
                  $selected={selectedIds.includes(product.id)}
                >
                  <TableCell>
                    <Checkbox
                      type="checkbox"
                      checked={selectedIds.includes(product.id)}
                      onChange={(e) => handleSelectItem(product.id, e.target.checked)}
                    />
                  </TableCell>
                  <TableCell>{String(product.id).padStart(3, '0')}</TableCell>
                  <TableCell>
                    {editingId === product.id ? (
                      <EditableCell 
                        defaultValue={product.name}
                        onBlur={(e) => {
                          // TODO: 값 업데이트
                        }}
                      />
                    ) : (
                      product.name
                    )}
                  </TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>
                    {editingId === product.id ? (
                      <EditableCell 
                        type="number"
                        defaultValue={product.price}
                        onBlur={(e) => {
                          // TODO: 값 업데이트
                        }}
                      />
                    ) : (
                      formatPrice(product.price)
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === product.id ? (
                      <EditableCell 
                        type="number"
                        defaultValue={product.discount_price || ''}
                        onBlur={(e) => {
                          // TODO: 값 업데이트
                        }}
                      />
                    ) : (
                      product.discount_price ? formatPrice(product.discount_price) : '-'
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === product.id ? (
                      <EditableCell 
                        type="number"
                        defaultValue={product.stock_quantity}
                        onBlur={(e) => {
                          // TODO: 값 업데이트
                        }}
                      />
                    ) : (
                      product.stock_quantity
                    )}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={product.status}>
                      {getStatusText(product.status)}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    {editingId === product.id ? (
                      <>
                        <ActionButton onClick={() => handleSave(product.id)}>
                          저장
                        </ActionButton>
                        <ActionButton onClick={handleCancel}>
                          취소
                        </ActionButton>
                      </>
                    ) : (
                      <ActionButton onClick={() => handleEdit(product.id)}>
                        수정
                      </ActionButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Pagination>
          <PageInfo>
            {startIndex + 1}-{Math.min(endIndex, products.length)} / {products.length}개
          </PageInfo>
          <PageControls>
            <PageButton 
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              처음
            </PageButton>
            <PageButton 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              이전
            </PageButton>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = Math.max(1, currentPage - 2) + i;
              if (page > totalPages) return null;
              return (
                <PageButton
                  key={page}
                  $active={page === currentPage}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </PageButton>
              );
            })}
            <PageButton 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              다음
            </PageButton>
            <PageButton 
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              마지막
            </PageButton>
          </PageControls>
        </Pagination>
      </ManagementCard>
    </SectionContainer>
  );
};

export default DataManagementSection;