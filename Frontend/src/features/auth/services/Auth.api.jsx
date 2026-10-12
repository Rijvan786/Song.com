import axios from "axios";

const api = axios.create({
  baseURL: "https://songcom-production.up.railway.app",
  withCredentials: true,
});

export const register = async ({ username, email, password }) => {
  const response = await api.post("/api/web/register", {
    username,
    email,
    password,
  });
  return response.data;
};

export const login = async ({ username, email, password }) => {
  const response = await api.post("/api/web/login", {
    username,
    email,
    password,
  });
  return response.data;
};

export const getme = async () => {
  const response = await api.get("/api/web/getme");
  return response.data;
};

export const logout = async () => {
  const response = await api.get("/api/web/logout");
  return response.data;
};

// Resend verification email
export const resendVerificationMail = async ({ email }) => {
  const response = await api.post("/api/web/Resend-mail", { email });
  return response.data;
};

// Send password reset email
export const sendForgetPasswordMail = async ({ email }) => {
  const response = await api.post("/api/web/ForgetPassword-mail", { email });
  return response.data;
};

// Reset password with new password and optional token
export const ForgetPassword = async ({ email, NewPassword, token }) => {
  const response = await api.patch("/api/web/ForgetPassword", {
    email,
    NewPassword,
    token,
  });
  return response.data;
};
