// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
export const WS_BASE_URL = process.env.REACT_APP_WS_URL || 'ws://localhost:8000/ws';

// API Client with interceptors
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private getHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
      const error = await response.json().catch(() => ({ error: { message: 'An error occurred' } }));
      throw new Error(error.error?.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }
}

export const api = new ApiClient(API_BASE_URL);
