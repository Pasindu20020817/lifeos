// Import our configured Axios instance.
//
// This already knows the backend base URL
// from VITE_API_URL.
import api from "./axios";

// Import TypeScript types used by this API.
import type {
  RegisterRequest,
  RegisterResponse,
} from "../types/auth";

/**
 * Register a new LifeOS user.
 *
 * Frontend:
 * registerUser(data)
 *
 * Backend:
 * POST /api/auth/register
 */
export const registerUser = async (
  data: RegisterRequest
): Promise<RegisterResponse> => {
  /**
   * Send registration information
   * to the LifeOS backend.
   */
  const response = await api.post<RegisterResponse>("/api/auth/register", data);

  /**
   * Axios response contains additional information
   * such as:
   *
   * response.status
   * response.headers
   * response.data
   *
   * We only need response.data.
   */
  return response.data;
};