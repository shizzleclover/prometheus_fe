import { apiClient } from '../client'
import { API_ENDPOINTS } from '../../config'
import type { User, UserDemographics } from '../../types/api'

export class UserService {
  static async updateDemographics(
    demographics: UserDemographics,
    token: string
  ): Promise<{ message: string; demographics: UserDemographics }> {
    const response = await apiClient.post<{ message: string; demographics: UserDemographics }>(
      API_ENDPOINTS.USERS.DEMOGRAPHICS,
      demographics,
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    )
    return response.data
  }

  static async updateProfile(userData: Partial<User>): Promise<{ user: User }> {
    const response = await apiClient.put<{ user: User }>(
      '/api/users/profile',
      userData
    )
    return response.data
  }

  static async deleteAccount(): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>('/api/users/account')
    return response.data
  }
}
