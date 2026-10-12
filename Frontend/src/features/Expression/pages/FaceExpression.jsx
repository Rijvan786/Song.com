import { useEffect, useRef, useState } from "react";
import "../style/Expression.scss";
import { detect, init } from "../utills/utills";
import {useSelector} from "react-redux"
import { useToast } from "../../shared/context/ToastContext";
import { FaceExpressionSkeleton } from "../../shared/components/Skeleton";

export default function FaceExpression({ onClick = () => {} }) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("detecting....");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const { Loading } = useSelector(state=>state.auth)
  
  const { showToast } = useToast();

  function hanldeclick() {
    const detectedExpression = detect({ landmarkerRef, videoRef, setExpression, streamRef });
    console.log("Detected expression:", detectedExpression);

    if (detectedExpression === undefined || detectedExpression === null) {
      setPopupMessage("Show your face to detect expression");
      setShowPopup(true);
      showToast("Face not detected! Please look clearly into your camera.", "error");
    } else {
      setShowPopup(false);
      onClick(detectedExpression);
    }
  }

  useEffect(() => {
    init({ videoRef, landmarkerRef, streamRef, setExpression });

    return () => {
      if (landmarkerRef.current) {
        try {
          landmarkerRef.current.close();
        } catch (err) {
          console.warn("Error closing landmarker:", err);
        }
      }
      if (streamRef.current) {
        try {
          streamRef.current.getTracks().forEach((track) => track.stop());
        } catch (err) {
          console.warn("Error stopping video stream:", err);
        }
      }
    };
  }, []);

  if (Loading) {
    return (
      <main className="w-full">
        <FaceExpressionSkeleton />
      </main>
    );
  }

  return (
    <div className="Faceexpression">
      <h2>User Expression</h2>

      <div className="video-container">
        <video ref={videoRef} autoPlay playsInline />
      </div>

      <h3>Expression: {expression}</h3>

      <button
        className="button"
        onClick={hanldeclick}
        disabled={expression === "detecting...."}
      >
        detect expression
      </button>

      {showPopup && (
        <div className="face-popup-overlay" role="dialog" aria-modal="true">
          <div className="face-popup-card">
            <button
              className="face-popup-close"
              onClick={() => setShowPopup(false)}
              aria-label="Close modal"
            >
              &times;
            </button>
            <div className="face-popup-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
                <line x1="2" y1="2" x2="22" y2="22" stroke="#ef4444" strokeWidth="2.5" />
              </svg>
            </div>
            <h3 className="face-popup-title">Face Not Detected</h3>
            <p className="face-popup-text">
              {popupMessage}
            </p>
            <div className="face-popup-actions">
              <button
                className="popup-btn-primary"
                onClick={() => {
                  setShowPopup(false);
                  hanldeclick();
                }}
              >
                Try Again
              </button>
              <button
                className="popup-btn-secondary"
                onClick={() => setShowPopup(false)}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}