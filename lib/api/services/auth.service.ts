import { apiClient } from '../client'
import { API_ENDPOINTS } from '../../config'
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  AuthUserResponse,
} from '../../types/api'

export class AuthService {
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    )
    return response.data
  }

  static async register(userData: RegisterRequest): Promise<RegisterResponse> {
    const response = await apiClient.post<RegisterResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      userData
    )
    return response.data
  }

  static async getCurrentUser(token: string): Promise<AuthUserResponse> {
    const response = await apiClient.get<AuthUserResponse>(
      API_ENDPOINTS.AUTH.ME,
      { Authorization: `Bearer ${token}` }
    )
    return response.data
  }

  static setAuthToken(token: string) {
    apiClient.setAuthToken(token)
  }

  static removeAuthToken() {
    apiClient.removeAuthToken()
  }
}
