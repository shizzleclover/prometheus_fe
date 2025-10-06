// User Types
export interface User {
  id: string
  username: string
  email: string
  hasCompletedOnboarding?: boolean
  demographics?: UserDemographics
  createdAt?: string
  updatedAt?: string
}

export interface UserDemographics {
  gender?: string
  nationality?: string
  race?: string
  tribe?: string
  skinColor?: string
  disabilities?: string[]
  religion?: string
  religiousIntensity?: string
  religiousPhilosophy?: string
  culturalBackground?: string
  primaryLanguage?: string
  languagesSpoken?: string[]
  personalityType?: string
  humorStyle?: string
  communicationPreference?: string
  sensitivityTopics?: string[]
  politicalViews?: string
  moralAlignment?: string
  economicViews?: string
  socialValues?: string
  environmentalStance?: string
  sexualOrientation?: string
  relationshipStatus?: string
  parentalStatus?: string
  generationalIdentity?: string
  urbanRuralSuburban?: string
  favoriteHistoricalEra?: string
  leastFavoriteHistoricalEra?: string
  hobbiesInterests?: string[]
  additionalInfo?: string
  controversialTopicStances?: {
    abortion?: string
    guns?: string
    immigration?: string
  }
}

// Auth Types
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
  acceptedTermsAndConditions: boolean
}

export interface RegisterResponse {
  token: string
  user: User
}

export interface AuthUserResponse {
  user: User
}

// Chat Types
export interface Message {
  id: string
  role: 'user' | 'bot'
  content: string
  timestamp: Date
  conversationId?: string
}

export interface Conversation {
  id: string
  title: string
  preview: string
  timestamp: Date
  messages?: Message[]
}

export interface SendMessageRequest {
  content: string
  conversationId?: string
}

export interface SendMessageResponse {
  message: Message
  conversation?: Conversation
}

// Chat v2 API
export interface ChatSendResponse {
  reply: string
  conversationId: string
  timestamp: string
}

export interface ConversationHistoryMessage {
  role: 'user' | 'bot'
  content: string
  timestamp: string
}

export interface ConversationHistory {
  conversationId: string
  userId: string
  messages: ConversationHistoryMessage[]
  createdAt: string
  updatedAt: string
}

// API Error Types
export interface ApiError {
  message: string
  status: number
  code?: string
  details?: any
}
