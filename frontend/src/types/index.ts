export interface Product {
  id: number;
  name: string;
  brand: string;
  model: string;
  category: string;
  price: number;
  discount_price?: number;
  discount_rate?: number;
  stock_quantity: number;
  status: 'active' | 'inactive' | 'out_of_stock';
  specs?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Plan {
  id: number;
  name: string;
  carrier: string;
  plan_type: string;
  monthly_fee: number;
  data_limit?: string;
  voice_minutes?: number;
  sms_count?: number;
  support_subsidy?: number;
  conditions?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  recommendations?: ProductRecommendation[];
}

export interface ProductRecommendation {
  product_id: number;
  name: string;
  price: number;
  discount_price?: number;
  similarity_score: number;
  reason: string;
}

export interface ChatSession {
  id: number;
  session_uuid: string;
  user_id?: string;
  message: string;
  response?: string;
  intent?: string;
  extracted_conditions?: Record<string, any>;
  recommended_products?: ProductRecommendation[];
  similarity_scores?: Record<string, number>;
  processing_time?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
}