/**
 * Represents the data entered by a user
 * when creating a LifeOS account.
 */
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

/**
 * Represents a user returned by
 * the LifeOS backend.
 */
export interface User {
  id: string;
  name: string;
  email: string;
}

/**
 * Response returned by:
 *
 * POST /api/auth/register
 */
export interface RegisterResponse {
  success: boolean;
  message: string;
  user: User;
}

/**
 * Standard API error response.
 *
 * We can reuse this later for:
 * - login
 * - tasks
 * - notes
 * - goals
 */
export interface ApiErrorResponse {
  success: boolean;
  message: string;
}