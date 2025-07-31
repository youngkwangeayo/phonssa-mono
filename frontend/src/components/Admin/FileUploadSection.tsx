import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

const SectionContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const UploadCard = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const UploadHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid #e1e8ed;
`;

const UploadTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 8px 0;
`;

const UploadDescription = styled.p`
  font-size: 14px;
  color: #7f8c8d;
  margin: 0;
  line-height: 1.5;
`;

const UploadArea = styled.div<{ $isDragOver: boolean }>`
  padding: 48px 24px;
  border: 2px dashed ${props => props.$isDragOver ? '#3498db' : '#e1e8ed'};
  border-radius: 8px;
  margin: 24px;
  text-align: center;
  background-color: ${props => props.$isDragOver ? '#f8f9fa' : 'transparent'};
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    border-color: #3498db;
    background-color: #f8f9fa;
  }
`;

const UploadIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const UploadText = styled.div`
  font-size: 18px;
  color: #2c3e50;
  margin-bottom: 8px;
  font-weight: 500;
`;

const UploadSubText = styled.div`
  font-size: 14px;
  color: #7f8c8d;
  margin-bottom: 24px;
`;

const FileInput = styled.input`
  display: none;
`;

const UploadButton = styled.button`
  padding: 12px 24px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2980b9;
  }
`;

const SupportedFormats = styled.div`
  margin-top: 16px;
  font-size: 12px;
  color: #95a5a6;
`;

const FileList = styled.div`
  margin-top: 32px;
`;

const FileListTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 16px 0;
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: white;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const FileIcon = styled.div`
  font-size: 24px;
`;

const FileDetails = styled.div``;

const FileName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #2c3e50;
`;

const FileSize = styled.div`
  font-size: 12px;
  color: #7f8c8d;
`;

const FileActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button<{ variant?: 'danger' }>`
  padding: 6px 12px;
  border: 1px solid ${props => props.variant === 'danger' ? '#e74c3c' : '#3498db'};
  background-color: ${props => props.variant === 'danger' ? '#e74c3c' : '#3498db'};
  color: white;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.variant === 'danger' ? '#c0392b' : '#2980b9'};
    border-color: ${props => props.variant === 'danger' ? '#c0392b' : '#2980b9'};
  }
`;

const ProcessingStatus = styled.div<{ status: 'processing' | 'completed' | 'failed' }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: ${props => {
    switch (props.status) {
      case 'processing': return '#f39c12';
      case 'completed': return '#27ae60';
      case 'failed': return '#e74c3c';
      default: return '#7f8c8d';
    }
  }};
`;

interface UploadFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'processing' | 'completed' | 'failed';
  progress?: number;
}

const FileUploadSection: React.FC = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
  };

  const handleFiles = (fileList: File[]) => {
    const newFiles: UploadFile[] = fileList.map(file => ({
      id: Date.now().toString() + Math.random().toString(),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'processing'
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // 파일 업로드 시뮬레이션
    newFiles.forEach(file => {
      setTimeout(() => {
        setFiles(prev => 
          prev.map(f => 
            f.id === file.id 
              ? { ...f, status: Math.random() > 0.2 ? 'completed' : 'failed' }
              : f
          )
        );
      }, 2000 + Math.random() * 3000);
    });
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const retryFile = (fileId: string) => {
    setFiles(prev => 
      prev.map(f => 
        f.id === fileId 
          ? { ...f, status: 'processing' }
          : f
      )
    );

    setTimeout(() => {
      setFiles(prev => 
        prev.map(f => 
          f.id === fileId 
            ? { ...f, status: Math.random() > 0.2 ? 'completed' : 'failed' }
            : f
        )
      );
    }, 2000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.includes('image')) return '🖼️';
    if (type.includes('excel') || type.includes('spreadsheet')) return '📊';
    if (type.includes('pdf')) return '📄';
    if (type.includes('text')) return '📝';
    return '📎';
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'processing': return '처리 중...';
      case 'completed': return '완료';
      case 'failed': return '실패';
      default: return status;
    }
  };

  return (
    <SectionContainer>
      <UploadCard>
        <UploadHeader>
          <UploadTitle>📂 단가표 파일 업로드</UploadTitle>
          <UploadDescription>
            다양한 형태의 단가표를 업로드하면 AI가 자동으로 분석하여 데이터베이스에 저장합니다.
            이미지(JPG, PNG), 엑셀(XLSX), CSV, 텍스트 파일을 지원합니다.
          </UploadDescription>
        </UploadHeader>

        <UploadArea
          $isDragOver={isDragOver}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <UploadIcon>📁</UploadIcon>
          <UploadText>파일을 드래그하거나 클릭하여 업로드</UploadText>
          <UploadSubText>
            여러 파일을 한 번에 업로드할 수 있습니다
          </UploadSubText>
          
          <UploadButton>
            파일 선택
          </UploadButton>
          
          <SupportedFormats>
            지원 형식: JPG, PNG, XLSX, CSV, TXT (최대 10MB)
          </SupportedFormats>
        </UploadArea>

        <FileInput
          id="file-input"
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.xlsx,.csv,.txt"
          onChange={handleFileSelect}
        />
      </UploadCard>

      {files.length > 0 && (
        <FileList>
          <FileListTitle>📋 업로드된 파일 ({files.length}개)</FileListTitle>
          {files.map((file) => (
            <FileItem key={file.id}>
              <FileInfo>
                <FileIcon>{getFileIcon(file.type)}</FileIcon>
                <FileDetails>
                  <FileName>{file.name}</FileName>
                  <FileSize>{formatFileSize(file.size)}</FileSize>
                </FileDetails>
              </FileInfo>

              <FileActions>
                <ProcessingStatus status={file.status}>
                  {file.status === 'processing' && '⏳'}
                  {file.status === 'completed' && '✅'}
                  {file.status === 'failed' && '❌'}
                  {getStatusText(file.status)}
                </ProcessingStatus>
                
                {file.status === 'failed' && (
                  <ActionButton onClick={() => retryFile(file.id)}>
                    재시도
                  </ActionButton>
                )}
                
                <ActionButton 
                  variant="danger" 
                  onClick={() => removeFile(file.id)}
                >
                  삭제
                </ActionButton>
              </FileActions>
            </FileItem>
          ))}
        </FileList>
      )}
    </SectionContainer>
  );
};

export default FileUploadSection;