import type { ApiError } from '../types/api'

export class ErrorHandler {
  static handle(error: unknown): string {
    if (error instanceof Error) {
      return error.message
    }
    
    if (typeof error === 'object' && error !== null && 'message' in error) {
      return (error as ApiError).message
    }
    
    return 'An unexpected error occurred'
  }

  static isNetworkError(error: unknown): boolean {
    return error instanceof TypeError && error.message.includes('fetch')
  }

  static isAuthError(error: unknown): boolean {
    if (typeof error === 'object' && error !== null && 'status' in error) {
      const status = (error as ApiError).status
      return status === 401 || status === 403
    }
    return false
  }

  static getErrorMessage(error: unknown): string {
    const message = this.handle(error)
    
    if (this.isNetworkError(error)) {
      return 'Network error. Please check your connection.'
    }
    
    if (this.isAuthError(error)) {
      return 'Authentication failed. Please log in again.'
    }
    
    return message
  }
}

export const handleApiError = (error: unknown): string => {
  return ErrorHandler.getErrorMessage(error)
}
