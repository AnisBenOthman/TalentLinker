import jwt from "jsonwebtoken";
import axios from "axios";
import { config } from "dotenv";

config();

export async function getGoogleAuthUrl() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };
  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
}

export async function getGoogleUser(code) {
  const { data } = await axios.post("https://oauth2.googleapis.com/token", {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL,
    grant_type: "authorization_code",
  });
  const { access_token, id_token } = data;
  const { data: profile } = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
    {
      headers: {
        Authorization: `Bearer ${id_token}`,
      },
    }
  );
  return profile;
}

export function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );
}

export async function findOrCreateUser(googleUser) {
  try {
    const response = await axios.get(
      `${process.env.USER_SERVICE_URL}email/${googleUser.email}`
    );

    return response.data;
  } catch (e) {
    // Check if the error is a 404(user not found)
    if (e.response && e.response.status === 404) {
      try {
        const newUser = {
          email: googleUser.email,
          name: googleUser.name,
          pic: googleUser.picture,
          googleId: googleUser.id,
        };
        console.log(newUser);
        const createResponse = await axios.post(
          `${process.env.USER_SERVICE_URL}`,
          newUser
        );

        return createResponse.data;
      } catch (e) {
        console.error(e.message);
      }
    }
  }
}
