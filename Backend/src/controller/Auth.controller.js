import jwt from "jsonwebtoken";
import Authmodel from "../models/Auth.model.js";
import bcrypt from "bcryptjs";
import BlackListModel from "../models/Blacklist.models.js";
import { config } from "../config/config.js";
import { SendMail } from "../services/email.service.js";

// Helper: Escape HTML to prevent injection when rendering dynamic user input in emails
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Base URLs resolution for scaling and multi-environment deployment
const getClientUrl = () => {
  return (
    config.CLIENT_URL ||
    (config.NODE_ENV === "production" ? "https://songcom-production.up.railway.app" : "http://localhost:5173")
  );
};

const getBaseUrl = () => {
  return (
    process.env.BASE_URL ||
    (config.NODE_ENV === "production"
      ? "https://songcom-production.up.railway.app"
      : `http://localhost:${config.PORT || 3000}`)
  );
};

/**
 * ============================================================================
 * MODERN RESPONSIVE HTML EMAIL TEMPLATES (Enterprise / 1M+ User Scalable)
 * Built with bulletproof table layouts, inline CSS, high-contrast CTA buttons,
 * dark-mode compatibility, and cross-client rendering (Gmail, Outlook, Apple Mail).
 * ============================================================================
 */

// Shared Email Wrapper with Modern Moodify Branding
function getEmailLayout({ previewText, badgeText, badgeColor = "#8b5cf6", title, contentHtml }) {
  const currentYear = new Date().getFullYear();
  const clientUrl = getClientUrl();

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="dark light">
  <meta name="supported-color-schemes" content="dark light">
  <title>${escapeHtml(title)}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    /* Reset & Client Normalization */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #0b0f19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    
    /* Interactive Hover Effects */
    .cta-btn:hover {
      background: linear-gradient(135deg, #7c3aed 0%, #c026d3 50%, #f43f5e 100%) !important;
      box-shadow: 0 8px 24px rgba(168, 85, 247, 0.45) !important;
    }
    .secondary-link:hover {
      color: #c084fc !important;
      text-decoration: underline !important;
    }
    
    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; max-width: 100% !important; margin: 0 !important; border-radius: 0 !important; }
      .content-padding { padding: 24px 20px !important; }
      .hero-title { font-size: 24px !important; line-height: 32px !important; }
      .feature-col { display: block !important; width: 100% !important; margin-bottom: 12px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0f19; color: #f1f5f9;">
  <!-- Preheader Teaser Text -->
  <div style="display: none; font-size: 1px; color: #0b0f19; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    ${escapeHtml(previewText)}
    ${"&nbsp;&zwnj;".repeat(30)}
  </div>

  <!-- Background Wrapper -->
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0b0f19;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <!-- Email Card Container -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="email-container" style="max-width: 600px; background-color: #111827; border: 1px solid #1f293d; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);">
          
          <!-- Top Vibrant Accent Bar -->
          <tr>
            <td height="5" style="background: linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);"></td>
          </tr>

          <!-- Header / Brand Section -->
          <tr>
            <td align="center" style="padding: 36px 32px 20px 32px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <!-- Brand Icon & Logo -->
                    <div style="display: inline-block; padding: 12px; background: rgba(99, 102, 241, 0.12); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 14px; margin-bottom: 12px;">
                      <span style="font-size: 30px; line-height: 1; display: block;">🎵</span>
                    </div>
                    <div style="font-size: 24px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff; text-transform: uppercase;">
                      Mood<span style="color: #a855f7;">ify</span>
                    </div>
                    <div style="font-size: 12px; font-weight: 600; letter-spacing: 1.5px; color: #94a3b8; text-transform: uppercase; margin-top: 4px;">
                      Your Personal Music Mood Journey
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content Body -->
          <tr>
            <td class="content-padding" style="padding: 10px 36px 36px 36px;">
              ${
                badgeText
                  ? `<div style="text-align: center; margin-bottom: 18px;">
                      <span style="display: inline-block; padding: 6px 14px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; background-color: rgba(139, 92, 246, 0.15); color: ${badgeColor}; border: 1px solid rgba(139, 92, 246, 0.35);">
                        ${escapeHtml(badgeText)}
                      </span>
                    </div>`
                  : ""
              }
              ${contentHtml}
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 36px;">
              <div style="border-top: 1px solid #1e293b; height: 1px;"></div>
            </td>
          </tr>

          <!-- Footer Section -->
          <tr>
            <td style="padding: 28px 36px; text-align: center; background-color: #0d1322;">
              <p style="margin: 0 0 12px 0; font-size: 13px; color: #64748b; line-height: 1.5;">
                You received this email because you have an account or initiated an action on 
                <a href="${clientUrl}" class="secondary-link" style="color: #a855f7; text-decoration: none; font-weight: 600;">Moodify</a>.
              </p>
              <p style="margin: 0 0 16px 0; font-size: 12px; color: #475569;">
                &copy; ${currentYear} Moodify Inc. All rights reserved. • Music tailored to your emotions.
              </p>
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center">
                <tr>
                  <td style="padding: 0 10px;">
                    <a href="${clientUrl}" style="font-size: 12px; color: #94a3b8; text-decoration: none;">Explore Music</a>
                  </td>
                  <td style="color: #334155;">•</td>
                  <td style="padding: 0 10px;">
                    <a href="${clientUrl}/Protected" style="font-size: 12px; color: #94a3b8; text-decoration: none;">Account</a>
                  </td>
                  <td style="color: #334155;">•</td>
                  <td style="padding: 0 10px;">
                    <a href="mailto:support@moodify.com" style="font-size: 12px; color: #94a3b8; text-decoration: none;">Support</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * 1. Register Verification & Welcome Email Template
 */
function getRegisterEmailHtml({ username, email, verificationUrl }) {
  const contentHtml = `
    <h1 class="hero-title" style="margin: 0 0 16px 0; font-size: 26px; font-weight: 800; color: #ffffff; text-align: center; line-height: 34px;">
      Welcome to Moodify, <span style="color: #c084fc;">${escapeHtml(username)}</span>! 🎧
    </h1>
    <p style="margin: 0 0 24px 0; font-size: 15px; color: #94a3b8; line-height: 1.6; text-align: center;">
      You're just one quick click away from unlocking personalized playlists curated exclusively for your current mood, emotions, and moments.
    </p>

    <!-- Feature Grid Highlights -->
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 28px;">
      <tr>
        <td style="padding: 14px; background-color: #1e293b; border: 1px solid #334155; border-radius: 12px;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td width="36" valign="top" style="font-size: 20px;">🎧</td>
              <td style="padding-left: 10px;">
                <div style="font-size: 14px; font-weight: 700; color: #f1f5f9;">Mood-Driven Playlists</div>
                <div style="font-size: 13px; color: #94a3b8; margin-top: 2px;">Smart curated songs that match your feelings in real time.</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr><td height="10"></td></tr>
      <tr>
        <td style="padding: 14px; background-color: #1e293b; border: 1px solid #334155; border-radius: 12px;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td width="36" valign="top" style="font-size: 20px;">⚡</td>
              <td style="padding-left: 10px;">
                <div style="font-size: 14px; font-weight: 700; color: #f1f5f9;">High-Fidelity Audio</div>
                <div style="font-size: 13px; color: #94a3b8; margin-top: 2px;">Lightning-fast, crystal-clear streaming on any device.</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Call to Action Button -->
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 28px;">
      <tr>
        <td align="center">
          <a href="${verificationUrl}" class="cta-btn" target="_blank" style="display: inline-block; padding: 16px 38px; background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%); color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 700; letter-spacing: 0.4px; border-radius: 12px; box-shadow: 0 4px 18px rgba(168, 85, 247, 0.35); text-align: center;">
            Verify My Email &amp; Start Listening &rarr;
          </a>
        </td>
      </tr>
    </table>

    <!-- Security Advisory Box -->
    <div style="padding: 14px 16px; background-color: rgba(30, 41, 59, 0.7); border-left: 4px solid #a855f7; border-radius: 8px; margin-bottom: 22px;">
      <p style="margin: 0; font-size: 13px; color: #94a3b8; line-height: 1.5;">
        <strong style="color: #e2e8f0;">Security Notice:</strong> This verification link is strictly valid for <strong>24 hours</strong>. If you did not create a Moodify account with <code>${escapeHtml(email)}</code>, you can safely disregard this email.
      </p>
    </div>

    <!-- Fallback Link -->
    <p style="margin: 0; font-size: 12px; color: #64748b; line-height: 1.5; text-align: center;">
      Button not working? Copy and paste this link into your browser:<br>
      <a href="${verificationUrl}" style="color: #a855f7; word-break: break-all; text-decoration: underline;">${verificationUrl}</a>
    </p>
  `;

  return getEmailLayout({
    previewText: `Welcome to Moodify! Please verify your email to unlock personalized music.`,
    badgeText: "✨ Welcome To Moodify",
    badgeColor: "#a855f7",
    title: "Verify your Moodify Account",
    contentHtml,
  });
}

/**
 * 2. Google OAuth Welcome Email Template
 */
function getGoogleWelcomeEmailHtml({ username, email, dashboardUrl }) {
  const contentHtml = `
    <h1 class="hero-title" style="margin: 0 0 16px 0; font-size: 26px; font-weight: 800; color: #ffffff; text-align: center; line-height: 34px;">
      You're Ready to Stream, <span style="color: #c084fc;">${escapeHtml(username)}</span>! 🚀
    </h1>
    <p style="margin: 0 0 24px 0; font-size: 15px; color: #94a3b8; line-height: 1.6; text-align: center;">
      Your Google account (<strong style="color: #e2e8f0;">${escapeHtml(email)}</strong>) is officially connected to Moodify. Your profile has been automatically verified and is set up for instant listening.
    </p>

    <!-- Quick Start Card -->
    <div style="padding: 20px; background-color: #1e293b; border: 1px solid #334155; border-radius: 12px; margin-bottom: 26px;">
      <div style="font-size: 14px; font-weight: 700; color: #f1f5f9; margin-bottom: 12px;">
        💡 3 Quick Ways to Get Started:
      </div>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td width="28" valign="top" style="color: #a855f7; font-weight: bold; font-size: 14px;">1.</td>
          <td style="font-size: 13px; color: #cbd5e1; padding-bottom: 8px;">
            <strong>Select your mood:</strong> Choose between Calm, High Energy, Melodic, or Focus.
          </td>
        </tr>
        <tr>
          <td width="28" valign="top" style="color: #a855f7; font-weight: bold; font-size: 14px;">2.</td>
          <td style="font-size: 13px; color: #cbd5e1; padding-bottom: 8px;">
            <strong>Create custom playlists:</strong> Save favorites and build your personal sound library.
          </td>
        </tr>
        <tr>
          <td width="28" valign="top" style="color: #a855f7; font-weight: bold; font-size: 14px;">3.</td>
          <td style="font-size: 13px; color: #cbd5e1;">
            <strong>Seamless Sync:</strong> Seamless playback across your phone, tablet, and computer.
          </td>
        </tr>
      </table>
    </div>

    <!-- Call to Action Button -->
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
      <tr>
        <td align="center">
          <a href="${dashboardUrl}" class="cta-btn" target="_blank" style="display: inline-block; padding: 16px 38px; background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%); color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 700; letter-spacing: 0.4px; border-radius: 12px; box-shadow: 0 4px 18px rgba(168, 85, 247, 0.35); text-align: center;">
            Launch Moodify Now &rarr;
          </a>
        </td>
      </tr>
    </table>

    <div style="padding: 12px 16px; background-color: rgba(30, 41, 59, 0.6); border-radius: 8px; text-align: center;">
      <p style="margin: 0; font-size: 12px; color: #64748b; line-height: 1.5;">
        If you did not authorize this Google sign-in on Moodify, please secure your Google account immediately and contact our support team.
      </p>
    </div>
  `;

  return getEmailLayout({
    previewText: `Welcome to Moodify! Your Google account is connected and ready to stream.`,
    badgeText: "🚀 Google Account Connected",
    badgeColor: "#38bdf8",
    title: "Welcome to Moodify",
    contentHtml,
  });
}

/**
 * 3. Resend Verification Email Template
 */
function getResendEmailHtml({ username, email, verificationUrl }) {
  const contentHtml = `
    <h1 class="hero-title" style="margin: 0 0 16px 0; font-size: 26px; font-weight: 800; color: #ffffff; text-align: center; line-height: 34px;">
      Fresh Verification Link 🔄
    </h1>
    <p style="margin: 0 0 24px 0; font-size: 15px; color: #94a3b8; line-height: 1.6; text-align: center;">
      Hi <span style="color: #f1f5f9; font-weight: 600;">${escapeHtml(username || "there")}</span>, we received a request to resend the activation link for your Moodify account (<strong style="color: #e2e8f0;">${escapeHtml(email)}</strong>).
    </p>

    <!-- Call to Action Button -->
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 28px;">
      <tr>
        <td align="center">
          <a href="${verificationUrl}" class="cta-btn" target="_blank" style="display: inline-block; padding: 16px 38px; background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%); color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 700; letter-spacing: 0.4px; border-radius: 12px; box-shadow: 0 4px 18px rgba(168, 85, 247, 0.35); text-align: center;">
            Confirm My Email Address &rarr;
          </a>
        </td>
      </tr>
    </table>

    <!-- Rate-Limit & Expiry Protection Box -->
    <div style="padding: 16px; background-color: #1e293b; border: 1px solid #334155; border-radius: 12px; margin-bottom: 22px;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td width="30" valign="top" style="font-size: 18px;">⏳</td>
          <td style="font-size: 13px; color: #cbd5e1; line-height: 1.5;">
            <strong>Link Lifespan:</strong> This new link is valid for <strong>24 hours</strong> and supersedes any prior verification emails.
          </td>
        </tr>
        <tr><td height="8"></td></tr>
        <tr>
          <td width="30" valign="top" style="font-size: 18px;">🛡️</td>
          <td style="font-size: 13px; color: #cbd5e1; line-height: 1.5;">
            <strong>Security Limit:</strong> To protect our community of 1M+ music lovers, verification requests are limited to 5 every 24 hours.
          </td>
        </tr>
      </table>
    </div>

    <!-- Fallback Link -->
    <p style="margin: 0; font-size: 12px; color: #64748b; line-height: 1.5; text-align: center;">
      Having trouble with the button? Copy and paste this URL into your browser:<br>
      <a href="${verificationUrl}" style="color: #a855f7; word-break: break-all; text-decoration: underline;">${verificationUrl}</a>
    </p>
  `;

  return getEmailLayout({
    previewText: `New verification link for your Moodify account. Valid for 24 hours.`,
    badgeText: "🔄 New Verification Link",
    badgeColor: "#fbbf24",
    title: "Verify your Moodify Account",
    contentHtml,
  });
}

/**
 * 4. Forget Password Reset Email Template
 */
function getForgetPasswordEmailHtml({ username, email, resetUrl }) {
  const contentHtml = `
    <h1 class="hero-title" style="margin: 0 0 16px 0; font-size: 26px; font-weight: 800; color: #ffffff; text-align: center; line-height: 34px;">
      Reset Your Password 🔐
    </h1>
    <p style="margin: 0 0 24px 0; font-size: 15px; color: #94a3b8; line-height: 1.6; text-align: center;">
      Hello <span style="color: #f1f5f9; font-weight: 600;">${escapeHtml(username || "there")}</span>, we received a request to reset the password for your Moodify account (<strong style="color: #e2e8f0;">${escapeHtml(email)}</strong>).
    </p>

    <!-- Call to Action Button -->
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 28px;">
      <tr>
        <td align="center">
          <a href="${resetUrl}" class="cta-btn" target="_blank" style="display: inline-block; padding: 16px 38px; background: linear-gradient(135deg, #ef4444 0%, #ec4899 50%, #8b5cf6 100%); color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 700; letter-spacing: 0.4px; border-radius: 12px; box-shadow: 0 4px 18px rgba(239, 68, 68, 0.35); text-align: center;">
            Reset My Password &rarr;
          </a>
        </td>
      </tr>
    </table>

    <!-- Urgent Security Advisory Box -->
    <div style="padding: 16px; background-color: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 12px; margin-bottom: 22px;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td width="30" valign="top" style="font-size: 18px;">⚠️</td>
          <td style="font-size: 13px; color: #fca5a5; line-height: 1.5;">
            <strong>Time Sensitive:</strong> This reset link expires in <strong>60 minutes</strong> for your security.
          </td>
        </tr>
        <tr><td height="8"></td></tr>
        <tr>
          <td width="30" valign="top" style="font-size: 18px;">🔒</td>
          <td style="font-size: 13px; color: #fca5a5; line-height: 1.5;">
            <strong>Didn't request this?</strong> If you didn't ask to reset your password, please ignore this email. Your current password remains active and fully secure.
          </td>
        </tr>
      </table>
    </div>

    <!-- Fallback Link -->
    <p style="margin: 0; font-size: 12px; color: #64748b; line-height: 1.5; text-align: center;">
      Alternatively, paste this URL into your browser:<br>
      <a href="${resetUrl}" style="color: #ec4899; word-break: break-all; text-decoration: underline;">${resetUrl}</a>
    </p>
  `;

  return getEmailLayout({
    previewText: `Reset your Moodify password. This secure link expires in 60 minutes.`,
    badgeText: "🛡️ Security Alert • Password Reset",
    badgeColor: "#f87171",
    title: "Reset Your Moodify Password",
    contentHtml,
  });
}

/**
 * 5. Modern In-Browser Landing Pages (for EmailVerificationController)
 */
function getVerificationLandingPage({ status, title, message, actionText, actionUrl }) {
  const isSuccess = status === "success";
  const isInfo = status === "info";
  const icon = isSuccess ? "🎉" : isInfo ? "ℹ️" : "⚠️";
  const accentColor = isSuccess ? "#10b981" : isInfo ? "#38bdf8" : "#ef4444";
  const glowShadow = isSuccess
    ? "rgba(16, 185, 129, 0.35)"
    : isInfo
    ? "rgba(56, 189, 248, 0.35)"
    : "rgba(239, 68, 68, 0.35)";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} - Moodify</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: radial-gradient(circle at top center, #1e1b4b 0%, #0b0f19 70%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #f8fafc;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .card {
      background: rgba(17, 24, 39, 0.9);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 24px;
      max-width: 520px;
      width: 100%;
      padding: 48px 36px;
      text-align: center;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
    }
    .icon-wrapper {
      width: 80px;
      height: 80px;
      margin: 0 auto 24px auto;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.05);
      border: 2px solid ${accentColor};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 38px;
      box-shadow: 0 0 30px ${glowShadow};
    }
    h1 {
      font-size: 28px;
      font-weight: 800;
      margin-bottom: 12px;
      color: #ffffff;
      letter-spacing: -0.5px;
    }
    p {
      color: #94a3b8;
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 32px;
    }
    .btn {
      display: inline-block;
      padding: 16px 36px;
      background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
      color: #ffffff;
      text-decoration: none;
      font-weight: 700;
      border-radius: 12px;
      font-size: 15px;
      letter-spacing: 0.3px;
      box-shadow: 0 10px 25px rgba(168, 85, 247, 0.4);
      transition: all 0.2s ease;
    }
    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 14px 30px rgba(168, 85, 247, 0.55);
    }
    .footer-brand {
      margin-top: 32px;
      font-size: 13px;
      color: #475569;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon-wrapper">${icon}</div>
    <h1>${escapeHtml(title)}</h1>
    <p>${escapeHtml(message)}</p>
    <a href="${actionUrl}" class="btn">${escapeHtml(actionText)} &rarr;</a>
    <div class="footer-brand">🎵 Moodify • Your Personal Music Mood Journey</div>
  </div>
</body>
</html>`;
}


/**
 * ============================================================================
 * AUTH CONTROLLER LOGIC & HANDLERS
 * ============================================================================
 */

function SendTokenFunction(user, res, message) {
  try {
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      config.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "lax",
    });
    return res.status(200).json({
      message,
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        verified: user.verified,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
}

/**
 * 1. RegisterController
 * Signs up a new user, hashes password, creates verification JWT,
 * and delivers modern responsive HTML welcome & verification email.
 */
export const RegisterController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const isAllReadyRegister = await Authmodel.findOne({
      $or: [{ username }, { email }],
    });

    if (isAllReadyRegister) {
      const conflictField =
        isAllReadyRegister.email === email ? "Email is already registered" : "Username is already taken";
      return res.status(409).json({
        message: conflictField,
      });
    }

    
    const user = await Authmodel.create({
      username,
      email,
      password,
      lastVerificationEmailSent: new Date(),
      VerificationEmailResendEmailCount: 1,
    });

    // Generate secure email verification token (24h validity)
    const verificationToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      config.JWT_SECRET,
      { expiresIn: "24h" }
    );

    const baseUrl = getBaseUrl();
    const verificationUrl = `${baseUrl}/api/web/Email-Verification?token=${verificationToken}&confirm=true`;

    // Render modern HTML email
    const emailHtml = getRegisterEmailHtml({
      username: user.username,
      email: user.email,
      verificationUrl,
    });

    // Send high-deliverability welcome email
    try {
      await SendMail({
        to: email,
        subject: "Welcome to Moodify — Verify Your Account 🎵",
        text: `Welcome to Moodify, ${user.username}! Please verify your email address by visiting: ${verificationUrl}`,
        html: emailHtml,
      });
    } catch (mailError) {
      console.error("Failed to send welcome email:", mailError);
      // Non-blocking mail failure: user is registered, can resend verification later
    }

    return SendTokenFunction(user, res, "User registered successfully");
  } catch (err) {
    console.error("RegisterController Error:", err);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

/**
 * 2. GoogleCallback
 * Completes Google OAuth flow and delivers modern responsive welcome email.
 */
export const GoogleCallback = async (req, res) => {
  try {
    const { id, displayName, emails, photos } = req.user;
    const email = emails[0].value;
    const photo = photos?.[0]?.value || null;

    let user = await Authmodel.findOne({ email });
    const isNewUser = !user;

    if (isNewUser) {
      user = await Authmodel.create({
        googleId: id,
        username: displayName,
        email,
        photo,
        verified: true, // Google accounts are pre-verified
      });
    }

    const clientUrl = getClientUrl();

    // Render modern HTML Google welcome email
    const emailHtml = getGoogleWelcomeEmailHtml({
      username: user.username,
      email: user.email,
      dashboardUrl:`https://songcom-production.up.railway.app/protected`,
    });

    try {
      await SendMail({
        to: email,
        subject: "Welcome to Moodify — You're Ready to Stream! 🎧",
        text: `Welcome to Moodify, ${user.username}! Your Google account is connected. Start streaming now at ${clientUrl}`,
        html: emailHtml,
      });    
    } catch (mailError) {
      console.error("Failed to send Google welcome email:", mailError);
    }

    // Set auth cookie and redirect user to dashboard
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      config.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "lax",
    });
       
    return   res.redirect(`https://songcom-production.up.railway.app/Protected`);
  } catch (err) {
    console.error("GoogleCallback Error:", err);
    return res.status(500).json({
      message: `Internal Server Error ${err.message}`,
    });
  }
};

/**
 * 3. EmailVerificationController
 * Handles verification link clicks and displays modern responsive landing pages.
 */
export const EmailVerificationController = async (req, res) => {
  const { token, confirm } = req.query;
  const clientUrl = getClientUrl();

  try {
    if (!token) {
      const html = getVerificationLandingPage({
        status: "error",
        title: "Missing Verification Token",
        message: "No verification token was provided in the request.",
        actionText: "Go to Moodify",
        actionUrl: clientUrl,
      });
      return res.status(400).send(html);
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await Authmodel.findOne({ email: decoded.email });

    if (!user) {
      const html = getVerificationLandingPage({
        status: "error",
        title: "User Not Found",
        message: "We could not find an account associated with this verification link.",
        actionText: "Create an Account",
        actionUrl: `${clientUrl}/Register`,
      });
      return res.status(404).send(html);
    }

    if (user.verified) {
      const html = getVerificationLandingPage({
        status: "info",
        title: "Already Verified!",
        message: "Your Moodify email address has already been verified. You're ready to stream!",
        actionText: "Go to Login",
        actionUrl: `${clientUrl}/Login`,
      });
      return res.status(200).send(html);
    }

    if (confirm === "true") {
      user.verified = true;
      await user.save();

      const html = getVerificationLandingPage({
        status: "success",
        title: "Email Verified Successfully!",
        message: "Your account is officially active. Welcome to the Moodify music family!",
        actionText: "Start Listening",
        actionUrl: `${clientUrl}/Login`,
      });
      return res.status(200).send(html);
    }

    const html = getVerificationLandingPage({
      status: "info",
      title: "Confirm Email Verification",
      message: "Please click the button below to confirm and activate your Moodify account.",
      actionText: "Confirm Verification",
      actionUrl: `${getBaseUrl()}/api/web/Email-Verification?token=${token}&confirm=true`,
    });
    return res.status(200).send(html);
  } catch (error) {
    console.error("EmailVerificationController Error:", error);
    const html = getVerificationLandingPage({
      status: "error",
      title: "Link Expired or Invalid",
      message: "This email verification link has expired or is invalid. Please request a new verification email.",
      actionText: "Return to Moodify",
      actionUrl: clientUrl,
    });
    return res.status(400).send(html);
  }
};

/**
 * 4. ResendMailController (also exported as ResendmailController)
 * Resends a fresh email verification link with rate-limiting and enterprise HTML design.
 */
export const ResendMailController = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email address is required",
      });
    }

    const user = await Authmodel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with this email",
      });
    }

    if (user.verified) {
      return res.status(400).json({
        success: false,
        message: "Account is already verified. You can log in directly.",
      });
    }

    // Cooldown check: 1 minute between consecutive requests
    if (user.lastVerificationEmailSent) {
      const timeSinceLastEmail = Date.now() - new Date(user.lastVerificationEmailSent).getTime();
      const oneMinute = 60 * 1000;
      if (timeSinceLastEmail < oneMinute) {
        return res.status(429).json({
          success: false,
          message: "Please wait before requesting another verification email. Try again in a minute.",
          retryAfter: Math.ceil((oneMinute - timeSinceLastEmail) / 1000),
        });
      }
    }

    // Rate-limit check: Max 5 emails per 24 hours
    if (user.lastVerificationEmailSent) {
      const twentyFourHours = 24 * 60 * 60 * 1000;
      const timeSinceFirstEmail = Date.now() - new Date(user.lastVerificationEmailSent).getTime();

      if (timeSinceFirstEmail < twentyFourHours && user.VerificationEmailResendEmailCount >= 5) {
        return res.status(429).json({
          success: false,
          message:
            "You have exceeded the maximum number of verification requests. Please try again in 24 hours.",
        });
      }

      // Reset counter if more than 24 hours have passed
      if (timeSinceFirstEmail >= twentyFourHours) {
        user.VerificationEmailResendEmailCount = 0;
      }
    }

    // Generate new verification token (24h validity)
    const emailVerificationToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      config.JWT_SECRET,
      { expiresIn: "24h" }
    );

    user.lastVerificationEmailSent = new Date();
    user.VerificationEmailResendEmailCount = (user.VerificationEmailResendEmailCount || 0) + 1;
    await user.save();

    const baseUrl = getBaseUrl();
    const verificationUrl = `${baseUrl}/api/web/Email-Verification?token=${emailVerificationToken}&confirm=true`;

    // Render modern HTML template
    const emailHtml = getResendEmailHtml({
      username: user.username,
      email: user.email,
      verificationUrl,
    });

    await SendMail({
      to: email,
      subject: "Your New Moodify Verification Link 🔗",
      text: `Hello ${user.username}, here is your new Moodify verification link: ${verificationUrl}`,
      html: emailHtml,
    });

    return res.status(200).json({
      success: true,
      message: "Verification email resent successfully. Please check your inbox.",
    });
  } catch (error) {
    console.error("ResendMailController Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

/**
 * 5. ForgetPasswordMail / ForgetmailController
 * Delivers secure password reset token via modern high-security HTML email.
 */
export const ForgetPasswordMail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await Authmodel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with this email",
      });
    }

    // Generate secure password reset token (1 hour expiry)
    const resetToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        purpose: "password_reset",
      },
      config.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const clientUrl = getClientUrl();
    const resetUrl = `${clientUrl}/ForgetPassword?token=${resetToken}&email=${encodeURIComponent(user.email)}`;

    // Render high-security HTML email template
    const emailHtml = getForgetPasswordEmailHtml({
      username: user.username,
      email: user.email,
      resetUrl,
    });

    await SendMail({
      to: email,
      subject: "Reset Your Moodify Password 🔐",
      text: `Hello ${user.username}, you requested a password reset for Moodify. Use this link to set a new password: ${resetUrl}`,
      html: emailHtml,
    });

    return res.status(200).json({
      success: true,
      message: "Password reset instructions sent to your email successfully.",
    });
  } catch (error) {
    console.error("ForgetPasswordMail Error:", error);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error: ${error.message}`,
    });
  }
};

/**
 * 6. ForgetPasswordController
 * Resets user password using bcrypt
 */
export const ForgetPasswordController = async (req, res) => {
  try {
    const { email, NewPassword, token } = req.body;

    if (!email || !NewPassword) {
      return res.status(400).json({
        success: false,
        message: "Email and NewPassword are required",
      });
    }

    // If reset token provided, verify it
    if (token) {
      try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        if (decoded.email !== email) {
          return res.status(400).json({
            success: false,
            message: "Invalid reset token for this email",
          });
        }
      } catch (tokenErr) {
        return res.status(400).json({
          success: false,
          message: "Reset token has expired or is invalid. Please request a new one.",
        });
      }
    }

    const user = await Authmodel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    const SetPasword=await Authmodel.findOneAndUpdate({email:email},{
      password:await bcrypt.hash(NewPassword,10)
    },{new:true})
  

    return SendTokenFunction(user, res, "Password updated successfully");
  } catch (error) {
    console.error("ForgetPasswordController Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

/**
 * 7. LoginController
 */
export const LoginController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await Authmodel.findOne(
      {
      $or: [{username }, { email }],
    }).select("+password");
     
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    if (!user.verified) {
      return res.status(403).json({
        message: "Please verify your email before logging in",
        needsVerification: true,
      });
    }

    const validUser = await user.comparePassword(password);
    if (!validUser) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    await  SendTokenFunction(user, res, "User logged in successfully");
  } catch (error) {
    console.error("LoginController Error:", error);
    return res.status(500).json({
      message: `Internal Server error: ${error.message}`,
    });
  }
};

/**
 * 8. getMeController
 */
export const getMeController = async (req, res) => {
  try {
    const user = await Authmodel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return SendTokenFunction(user, res, "User retrieved successfully");
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

/**
 * 9. logoutController
 */
export const logoutController = async (req, res) => {
  try {
    const token = req.cookies?.token;
    res.clearCookie("token");

    if (token) {
      await BlackListModel.create({ token });
    }

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error during logout",
    });
  }
};

// Aliases for seamless route compatibility matching user naming conventions

