import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearError } from '../../auth/states/auth.slice';
import '../components/Toast.scss';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth?.error);

  const showToast = useCallback((message, type = 'success', duration = 4000) => {
    if (!message) return;
    const id = Date.now();
    setToast({ message, type, id });
    if (duration > 0) {
      setTimeout(() => {
        setToast((current) => (current?.id === id ? null : current));
      }, duration);
    }
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  // Automatically listen to Redux auth errors across all pages without requiring manual boilerplate
  useEffect(() => {
    if (authError && typeof authError === 'string') {
      showToast(authError, 'error');
      // Clear error immediately so it only pops once and never on page refresh
      dispatch(clearError());
    }
  }, [authError, showToast, dispatch]);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toast && (
        <div className={`top-right-toast top-right-toast-${toast.type}`} role="alert">
          <div className="toast-left">
            <div className="toast-check-icon">
              {toast.type === 'success' && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  <path d="M8.5 12.5l2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              {toast.type === 'error' && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  <line x1="15" y1="9" x2="9" y2="15" strokeLinecap="round" />
                  <line x1="9" y1="9" x2="15" y2="15" strokeLinecap="round" />
                </svg>
              )}
              {toast.type === 'info' && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  <line x1="12" y1="8" x2="12" y2="8.01" strokeLinecap="round" />
                  <line x1="12" y1="11" x2="12" y2="16" strokeLinecap="round" />
                </svg>
              )}
              {toast.type === 'warning' && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" strokeWidth="2" />
                  <line x1="12" y1="9" x2="12" y2="13" strokeLinecap="round" />
                  <line x1="12" y1="17" x2="12" y2="17.01" strokeLinecap="round" />
                </svg>
              )}
            </div>
            <span className="toast-message-text">{toast.message}</span>
          </div>
          <button className="toast-close-btn" onClick={hideToast} aria-label="Close notification">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastContext;
