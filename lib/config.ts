export const API_BASE_URL = "https://prometheusbe-production.up.railway.app"

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    ME: "/api/auth/me",
  },
  USERS: {
    DEMOGRAPHICS: "/api/users/demographics",
  },
  CHAT: {
    CONVERSATIONS: "/api/chat/conversations",
    MESSAGES: "/api/chat/messages",
  }
}
