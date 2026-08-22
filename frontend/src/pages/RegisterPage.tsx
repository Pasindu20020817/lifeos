// React state allows us to store
// form values and UI messages.
import { useState } from "react";

// React Router navigation allows us
// to move to another frontend page.
import { Link, useNavigate } from "react-router-dom";

// Axios is used here only to safely
// identify Axios-related errors.
import axios from "axios";

// Import registration API function.
import { registerUser } from "../api/auth.api";

// Import the API error type.
import type { ApiErrorResponse } from "../types/auth";

/**
 * RegisterPage
 *
 * Allows a new user to create
 * a LifeOS account.
 */
function RegisterPage() {
  /**
   * useNavigate lets us change routes
   * using JavaScript.
   *
   * Example:
   * navigate("/login")
   */
  const navigate = useNavigate();

  /**
   * Store form field values.
   */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * Store an error message
   * returned from frontend/backend.
   */
  const [error, setError] = useState("");

  /**
   * loading prevents users from clicking
   * Register multiple times while the request
   * is being processed.
   */
  const [loading, setLoading] = useState(false);

  /**
   * Runs when the registration
   * form is submitted.
   */
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    /**
     * Normally an HTML form refreshes
     * the entire browser page.
     *
     * React applications don't want that.
     */
    event.preventDefault();

    // Remove any previous error message.
    setError("");

    // Show loading state.
    setLoading(true);

    try {
      /**
       * Call our backend registration API.
       */
      await registerUser({
        name,
        email,
        password,
      });

      /**
       * If registration succeeds,
       * send the user to the login page.
       */
      navigate("/login");
    } catch (error) {
      /**
       * Check whether the error came
       * from an Axios HTTP request.
       */
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        /**
         * Backend might return:
         *
         * {
         *   success: false,
         *   message: "User already exists"
         * }
         */
        const message =
          error.response?.data?.message ||
          "Registration failed";

        setError(message);
      } else {
        /**
         * Handles unexpected JavaScript errors.
         */
        setError(
          "Something went wrong. Please try again."
        );
      }
    } finally {
      /**
       * finally runs whether the request
       * succeeds or fails.
       */
      setLoading(false);
    }
  };

  return (
    <main>
      <section>
        <h1>Create your LifeOS account</h1>

        <p>
          Organize your tasks, goals, notes and personal
          progress in one place.
        </p>

        {/*
          Only display the error box
          when an error actually exists.
        */}
        {error && (
          <p role="alert">
            {error}
          </p>
        )}

        {/*
          handleSubmit runs when the user
          clicks the submit button.
        */}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">
              Name
            </label>

            <input
              id="name"
              type="text"
              value={name}

              // Update state whenever the user types.
              onChange={(event) =>
                setName(event.target.value)
              }

              placeholder="Pasindu"
              required
            />
          </div>

          <div>
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="pasindu@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"

            // Prevent additional submissions
            // while registration is running.
            disabled={loading}
          >
            {/*
              Change button text while
              waiting for the API response.
            */}
            {loading
              ? "Creating account..."
              : "Create account"}
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>
      </section>
    </main>
  );
}

export default RegisterPage;