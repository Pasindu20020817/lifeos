// Import Axios so we can create a reusable API client
import axios from "axios";

/**
 * Create one Axios instance for the entire LifeOS frontend.
 *
 * Why?
 * Instead of writing the full backend URL in every file,
 * we define it once here.
 */
const api = axios.create({
  // Read backend URL from Vite environment variables
  baseURL: import.meta.env.VITE_API_URL,

  // Tell the backend that we normally send/receive JSON
  headers: {
    "Content-Type": "application/json",
  },
});

// Export the configured Axios instance
export default api;