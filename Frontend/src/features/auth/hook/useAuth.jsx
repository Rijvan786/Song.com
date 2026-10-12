import { useEffect } from "react";
import {
  getme,
  login,
  logout,
  register,
  resendVerificationMail,
  sendForgetPasswordMail,
  ForgetPassword,
} from "../services/Auth.api.jsx";
import { setUser, setLoading, setError, clearError } from "../states/auth.slice.jsx";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();

  const handleRegister = async ({ username, email, password }) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      const data = await register({ username, email, password });
      dispatch(setUser(data.user));
      return data;
    } catch (error) {
      console.error("Registration error:", error);
      const message =
        error?.response?.data?.message || error.message || "Registration failed";
      dispatch(setError(message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleResendMail = async ({ email }) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      const data = await resendVerificationMail({ email });
      return data;
    } catch (error) {
      console.error("ResendMail error:", error);
      const message =
        error?.response?.data?.message || error.message || "Failed to resend email";
      dispatch(setError(message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleForgetMail = async ({ email }) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      const data = await sendForgetPasswordMail({ email });
      return data;
    } catch (error) {
      console.error("ForgetMail error:", error);
      const message =
        error?.response?.data?.message || error.message || "Failed to send reset link";
      dispatch(setError(message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleForgetPassword = async ({ email, NewPassword, token }) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      const data = await ForgetPassword({ email, NewPassword, token });
      if (data?.user) {
        dispatch(setUser(data.user));
      }
      return data;
    } catch (error) {
      console.error("ForgetPassword error:", error);
      const message =
        error?.response?.data?.message || error.message || "Failed to update password";
      dispatch(setError(message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogin = async ({ username, email, password }) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      const data = await login({ username, email, password });
      dispatch(setUser(data.user));
      return data;
    } catch (error) {
      console.error("Login error:", error);
      const message =
        error?.response?.data?.message || error.message || "Login failed";
      dispatch(setError(message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handlegetme = async () => {
    try {
      dispatch(setLoading(true));
      const data = await getme();
      dispatch(setUser(data.user));
      dispatch(clearError());
      return data;
    } catch (error) {
      // NOTE: An unauthenticated check on page refresh/load is standard behavior, NOT an actionable error.
      // Do NOT set state.error here to prevent annoying popups on refresh!
      dispatch(setUser(null));
      console.log("No active user session found.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      await logout();
      dispatch(setUser(null));
    } catch (error) {
      console.error("Logout error:", error);
      const message =
        error?.response?.data?.message || error.message || "Logout failed";
      dispatch(setError(message));
    } finally {
      dispatch(setLoading(false));
    }
  };

 

  return {
    handleRegister,
    handleResendMail,
    handleForgetMail,
    handleForgetPassword,
    handleLogin,
    handlegetme,
    handleLogout,
  };
};