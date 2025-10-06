import { apiClient } from '../client'
import { API_ENDPOINTS } from '../../config'
import type { ChatSendResponse, ConversationHistory } from '../../types/api'

export class ChatService {
  static async sendMessage(conversationId: string, message: string, token: string): Promise<ChatSendResponse> {
    const response = await apiClient.post<ChatSendResponse>(
      `/api/chat/${conversationId}/messages`,
      { message },
      { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    )
    return response.data
  }

  static async getConversation(conversationId: string, token: string): Promise<ConversationHistory> {
    const response = await apiClient.get<{ conversation: ConversationHistory }>(
      `/api/chat/${conversationId}`,
      { Authorization: `Bearer ${token}` }
    )
    return response.data.conversation
  }
}
