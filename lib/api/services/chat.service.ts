import { apiClient } from '../client'
import { API_ENDPOINTS } from '../../config'
import type {
  Conversation,
  Message,
  SendMessageRequest,
  SendMessageResponse,
} from '../../types/api'

export class ChatService {
  static async getConversations(): Promise<{ conversations: Conversation[] }> {
    const response = await apiClient.get<{ conversations: Conversation[] }>(
      API_ENDPOINTS.CHAT.CONVERSATIONS
    )
    return response.data
  }

  static async getConversation(conversationId: string): Promise<{ conversation: Conversation }> {
    const response = await apiClient.get<{ conversation: Conversation }>(
      `${API_ENDPOINTS.CHAT.CONVERSATIONS}/${conversationId}`
    )
    return response.data
  }

  static async sendMessage(messageData: SendMessageRequest): Promise<SendMessageResponse> {
    const response = await apiClient.post<SendMessageResponse>(
      API_ENDPOINTS.CHAT.MESSAGES,
      messageData
    )
    return response.data
  }

  static async deleteConversation(conversationId: string): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(
      `${API_ENDPOINTS.CHAT.CONVERSATIONS}/${conversationId}`
    )
    return response.data
  }

  static async updateConversationTitle(
    conversationId: string,
    title: string
  ): Promise<{ conversation: Conversation }> {
    const response = await apiClient.put<{ conversation: Conversation }>(
      `${API_ENDPOINTS.CHAT.CONVERSATIONS}/${conversationId}`,
      { title }
    )
    return response.data
  }
}
