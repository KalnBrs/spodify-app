import CryptoJS from 'crypto-js';

export async function redirectToAuthCodeFlow(clientId) {
  console.log('hello')
  localStorage.removeItem('access_token');
  localStorage.removeItem('token_expiry');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('code');
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", "https://spodify-app.vercel.app/dashboard");
  params.append("scope", "user-top-read user-read-private user-read-email");
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  // Create a SHA-256 hash of the code verifier
  const hash = CryptoJS.SHA256(codeVerifier);

  // Convert hash to a Base64 URL encoding
  const base64 = hash.toString(CryptoJS.enc.Base64);
  return base64UrlEncode(base64);
}

function base64UrlEncode(base64) {
  return base64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, ''); // Remove padding
}