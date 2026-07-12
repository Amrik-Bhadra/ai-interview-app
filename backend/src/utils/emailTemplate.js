// emailTemplates.js

const BASE = {
  bg: "#161616",
  surface: "#1c1a1c",
  border: "#2a262a",
  primary: "#922d50",
  primaryLight: "#b8456e",
  text: "#f5f5f5",
  textMuted: "#a3a0a2",
  textFaint: "#6f6c6e",
  error: "#e2566f",
  success: "#4cc38a",
};

const shell = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
</head>
<body style="margin:0;padding:0;background-color:${BASE.bg};font-family:'Segoe UI',Roboto,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
    style="background-color:${BASE.bg};padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
          style="max-width:520px;width:100%;">

          <!-- Logo / Brand -->
          <tr>
            <td align="center" style="padding-bottom:28px;">
              <table cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="padding-right:8px;vertical-align:middle;">
                    <div style="width:10px;height:10px;border-radius:50%;
                      background-color:${BASE.primaryLight};
                      box-shadow:0 0 10px ${BASE.primaryLight};"></div>
                  </td>
                  <td style="font-size:18px;font-weight:800;color:${BASE.text};
                    letter-spacing:-0.3px;vertical-align:middle;">
                    IntervueAI
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background-color:${BASE.surface};border:1px solid ${BASE.border};
              border-radius:16px;overflow:hidden;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:24px;">
              <p style="margin:0;font-size:12px;color:${BASE.textFaint};line-height:1.6;">
                This is an automated message — please do not reply to this email.<br/>
                &copy; ${new Date().getFullYear()} IntervueAI. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// ─── OTP Template ────────────────────────────────────────────────────────────

export const otpEmailTemplate = (otp) => {
  const content = `
    <!-- Top accent bar -->
    <div style="height:4px;background:linear-gradient(90deg,${BASE.primaryLight},${BASE.primary});"></div>

    <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
      style="padding:36px 40px;">

      <!-- Heading -->
      <tr>
        <td style="padding-bottom:8px;">
          <p style="margin:0;font-size:12px;font-weight:700;text-transform:uppercase;
            letter-spacing:0.08em;color:${BASE.primaryLight};">
            Verification Required
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding-bottom:16px;">
          <h1 style="margin:0;font-size:24px;font-weight:700;color:${BASE.text};
            line-height:1.3;">
            Your one-time password
          </h1>
        </td>
      </tr>

      <!-- Body text -->
      <tr>
        <td style="padding-bottom:28px;">
          <p style="margin:0;font-size:15px;color:${BASE.textMuted};line-height:1.7;">
            Hello,<br/><br/>
            Use the OTP below to verify your identity. It is valid for
            <strong style="color:${BASE.text};">10 minutes</strong> and
            should not be shared with anyone — including IntervueAI support.
          </p>
        </td>
      </tr>

      <!-- OTP Box -->
      <tr>
        <td align="center" style="padding-bottom:28px;">
          <div style="display:inline-block;background-color:#161616;
            border:1px solid ${BASE.border};border-radius:12px;padding:20px 40px;">
            <p style="margin:0;font-size:11px;font-weight:700;text-transform:uppercase;
              letter-spacing:0.1em;color:${BASE.textFaint};margin-bottom:10px;">
              One-Time Password
            </p>
            <p style="margin:0;font-size:40px;font-weight:800;letter-spacing:12px;
              color:${BASE.primaryLight};">
              ${otp}
            </p>
          </div>
        </td>
      </tr>

      <!-- Expiry warning -->
      <tr>
        <td style="padding-bottom:0;">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
            style="background-color:rgba(226,86,111,0.08);border:1px solid rgba(226,86,111,0.2);
              border-radius:10px;padding:14px 18px;">
            <tr>
              <td style="font-size:13px;color:${BASE.textMuted};line-height:1.6;">
                ⚠️&nbsp;
                <strong style="color:${BASE.text};">Expires in 10 minutes.</strong>
                If you didn't request this, you can safely ignore this email.
                Someone else may have typed your address by mistake.
              </td>
            </tr>
          </table>
        </td>
      </tr>

    </table>
  `;
  return shell(content);
};

// ─── Welcome Template ─────────────────────────────────────────────────────────

export const welcomeEmailTemplate = (username) => {
  const content = `
    <!-- Top accent bar -->
    <div style="height:4px;background:linear-gradient(90deg,${BASE.primaryLight},${BASE.primary});"></div>

    <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
      style="padding:36px 40px;">

      <!-- Heading -->
      <tr>
        <td style="padding-bottom:8px;">
          <p style="margin:0;font-size:12px;font-weight:700;text-transform:uppercase;
            letter-spacing:0.08em;color:${BASE.primaryLight};">
            Welcome aboard
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding-bottom:16px;">
          <h1 style="margin:0;font-size:24px;font-weight:700;color:${BASE.text};
            line-height:1.3;">
            You're in, ${username}. 🎉
          </h1>
        </td>
      </tr>

      <!-- Body text -->
      <tr>
        <td style="padding-bottom:28px;">
          <p style="margin:0;font-size:15px;color:${BASE.textMuted};line-height:1.7;">
            We're glad to have you on IntervueAI. Your account is ready — here's
            a quick look at everything waiting for you inside.
          </p>
        </td>
      </tr>

      <!-- Feature list -->
      <tr>
        <td style="padding-bottom:28px;">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">

            ${[
              ["✦", "AI-generated interview questions", "Tailored to the exact role and your background, every time."],
              ["✦", "Match score", "Instantly see how well you align with any job description."],
              ["✦", "Personalised prep plan", "A day-by-day plan to close skill gaps before your interview."],
            ]
              .map(
                ([icon, title, desc]) => `
              <tr>
                <td style="padding-bottom:14px;">
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                    style="background-color:#161616;border:1px solid ${BASE.border};
                      border-radius:12px;padding:16px 18px;">
                    <tr>
                      <td width="28" style="vertical-align:top;padding-top:1px;">
                        <span style="font-size:14px;color:${BASE.primaryLight};">${icon}</span>
                      </td>
                      <td>
                        <p style="margin:0 0 3px;font-size:14px;font-weight:700;color:${BASE.text};">${title}</p>
                        <p style="margin:0;font-size:13px;color:${BASE.textMuted};line-height:1.5;">${desc}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            `
              )
              .join("")}

          </table>
        </td>
      </tr>

      <!-- CTA button -->
      <tr>
        <td align="center" style="padding-bottom:28px;">
          <a href="https://intervueai.com/generate-report"
            style="display:inline-block;background:linear-gradient(135deg,${BASE.primaryLight},${BASE.primary});
              color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;
              padding:14px 36px;border-radius:10px;
              box-shadow:0 4px 18px rgba(146,45,80,0.4);">
            Generate your first report &rarr;
          </a>
        </td>
      </tr>

      <!-- Sign off -->
      <tr>
        <td style="border-top:1px solid ${BASE.border};padding-top:24px;">
          <p style="margin:0;font-size:14px;color:${BASE.textMuted};line-height:1.7;">
            Rooting for you,<br/>
            <strong style="color:${BASE.text};">The IntervueAI team</strong>
          </p>
        </td>
      </tr>

    </table>
  `;
  return shell(content);
};