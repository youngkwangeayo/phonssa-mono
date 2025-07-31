import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Product, Plan, ChatSession, ChatMessage, ProductRecommendation } from '../types';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // 요청 인터셉터
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 응답 인터셉터
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // 제품 관련 API
  async getProducts(params?: {
    brand?: string;
    category?: string;
    priceRange?: string;
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ products: Product[]; total: number; page: number; totalPages: number }> {
    const response = await this.api.get<{
      products: Product[];
      total: number;
      page: number;
      totalPages: number;
    }>('/products', { params });
    return response.data;
  }

  async getProduct(id: number): Promise<Product> {
    const response = await this.api.get<Product>(`/products/${id}`);
    return response.data;
  }

  async createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
    const response = await this.api.post<Product>('/products', product);
    return response.data;
  }

  async updateProduct(id: number, product: Partial<Product>): Promise<Product> {
    const response = await this.api.put<Product>(`/products/${id}`, product);
    return response.data;
  }

  async deleteProduct(id: number): Promise<void> {
    await this.api.delete(`/products/${id}`);
  }

  async bulkUpdateProducts(ids: number[], updates: Partial<Product>): Promise<void> {
    await this.api.patch('/products/bulk', { ids, updates });
  }

  async bulkDeleteProducts(ids: number[]): Promise<void> {
    await this.api.delete('/products/bulk', { data: { ids } });
  }

  // 요금제 관련 API
  async getPlans(params?: {
    carrier?: string;
    planType?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ plans: Plan[]; total: number; page: number; totalPages: number }> {
    const response = await this.api.get<{
      plans: Plan[];
      total: number;
      page: number;
      totalPages: number;
    }>('/plans', { params });
    return response.data;
  }

  async getPlan(id: number): Promise<Plan> {
    const response = await this.api.get<Plan>(`/plans/${id}`);
    return response.data;
  }

  // 채팅 관련 API
  async sendChatMessage(message: {
    content: string;
    userId?: string;
    sessionId?: string;
  }): Promise<{
    sessionId: string;
    response: string;
    recommendations?: ProductRecommendation[];
    processingTime: number;
  }> {
    const response = await this.api.post<{
      sessionId: string;
      response: string;
      recommendations?: ProductRecommendation[];
      processingTime: number;
    }>('/chat/recommend', message);
    return response.data;
  }

  async getChatSessions(params?: {
    userId?: string;
    page?: number;
    limit?: number;
  }): Promise<{ sessions: ChatSession[]; total: number; page: number; totalPages: number }> {
    const response = await this.api.get<{
      sessions: ChatSession[];
      total: number;
      page: number;
      totalPages: number;
    }>('/chat/sessions', { params });
    return response.data;
  }

  async getChatSession(sessionId: string): Promise<ChatSession> {
    const response = await this.api.get<ChatSession>(`/chat/sessions/${sessionId}`);
    return response.data;
  }

  // 파일 업로드 관련 API
  async uploadFile(file: File, onUploadProgress?: (progressEvent: any) => void): Promise<{
    fileId: string;
    fileName: string;
    status: 'processing' | 'completed' | 'failed';
    message: string;
  }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.api.post<{
      fileId: string;
      fileName: string;
      status: 'processing' | 'completed' | 'failed';
      message: string;
    }>('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
    return response.data;
  }

  async getUploadStatus(fileId: string): Promise<{
    fileId: string;
    status: 'processing' | 'completed' | 'failed';
    progress: number;
    result?: {
      productsAdded: number;
      plansAdded: number;
      errors: string[];
    };
  }> {
    const response = await this.api.get<{
      fileId: string;
      status: 'processing' | 'completed' | 'failed';
      progress: number;
      result?: {
        productsAdded: number;
        plansAdded: number;
        errors: string[];
      };
    }>(`/upload/status/${fileId}`);
    return response.data;
  }

  // 통계 관련 API
  async getStatistics(): Promise<{
    totalProducts: number;
    totalSessions: number;
    aiAccuracy: number;
    totalUploads: number;
    monthlyGrowth: {
      products: number;
      sessions: number;
      uploads: number;
    };
    topProducts: Array<{
      id: number;
      name: string;
      brand: string;
      views: number;
    }>;
    recentActivities: Array<{
      id: string;
      type: string;
      message: string;
      timestamp: string;
    }>;
  }> {
    const response = await this.api.get<{
      totalProducts: number;
      totalSessions: number;
      aiAccuracy: number;
      totalUploads: number;
      monthlyGrowth: {
        products: number;
        sessions: number;
        uploads: number;
      };
      topProducts: Array<{
        id: number;
        name: string;
        brand: string;
        views: number;
      }>;
      recentActivities: Array<{
        id: string;
        type: string;
        message: string;
        timestamp: string;
      }>;
    }>('/statistics');
    return response.data;
  }

  async getChartData(type: 'monthly-sessions' | 'brand-distribution'): Promise<{
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor?: string[];
      borderColor?: string;
    }>;
  }> {
    const response = await this.api.get<{
      labels: string[];
      datasets: Array<{
        label: string;
        data: number[];
        backgroundColor?: string[];
        borderColor?: string;
      }>;
    }>(`/statistics/charts/${type}`);
    return response.data;
  }

  // 인증 관련 API
  async login(credentials: { username: string; password: string }): Promise<{
    token: string;
    user: {
      id: string;
      name: string;
      role: 'user' | 'admin';
    };
  }> {
    const response = await this.api.post<{
      token: string;
      user: {
        id: string;
        name: string;
        role: 'user' | 'admin';
      };
    }>('/auth/login', credentials);
    
    // 토큰을 로컬 스토리지에 저장
    localStorage.setItem('authToken', response.data.token);
    
    return response.data;
  }

  async logout(): Promise<void> {
    await this.api.post('/auth/logout');
    localStorage.removeItem('authToken');
  }

  async getCurrentUser(): Promise<{
    id: string;
    name: string;
    role: 'user' | 'admin';
  }> {
    const response = await this.api.get<{
      id: string;
      name: string;
      role: 'user' | 'admin';
    }>('/auth/me');
    return response.data;
  }

  // 헬스체크 API
  async healthCheck(): Promise<{ status: 'ok'; timestamp: string }> {
    const response = await this.api.get<{ status: 'ok'; timestamp: string }>('/health');
    return response.data;
  }
}

export const apiService = new ApiService();
export default apiService;