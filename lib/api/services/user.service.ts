import { apiClient } from '../client'
import { API_ENDPOINTS } from '../../config'
import type { User, UserDemographics } from '../../types/api'

export class UserService {
  static async getProfile(token: string): Promise<{ user: User }> {
    const response = await apiClient.get<{ user: User }>(
      API_ENDPOINTS.USERS.PROFILE,
      { Authorization: `Bearer ${token}` }
    )
    return response.data
  }

  static async updateProfile(userData: Partial<User>, token: string): Promise<{ user: User }> {
    const response = await apiClient.put<{ user: User }>(
      API_ENDPOINTS.USERS.PROFILE,
      userData,
      { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    )
    return response.data
  }

  static async deleteProfile(token: string): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(
      API_ENDPOINTS.USERS.PROFILE,
      { Authorization: `Bearer ${token}` }
    )
    return response.data
  }
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

  static async getDemographics(token: string): Promise<{ demographics: UserDemographics }> {
    const response = await apiClient.get<{ demographics: UserDemographics }>(
      API_ENDPOINTS.USERS.DEMOGRAPHICS,
      { Authorization: `Bearer ${token}` }
    )
    return response.data
  }

  static async putDemographics(
    demographics: UserDemographics,
    token: string
  ): Promise<{ message: string; demographics: UserDemographics }> {
    const response = await apiClient.put<{ message: string; demographics: UserDemographics }>(
      API_ENDPOINTS.USERS.DEMOGRAPHICS,
      demographics,
      { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    )
    return response.data
  }
}
