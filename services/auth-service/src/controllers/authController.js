import {
  getGoogleAuthUrl,
  getGoogleUser,
  findOrCreateUser,
  generateToken,
} from "../services/authService.js";

export async function getGooglAuthUrl(req, res) {
  try {
    const url = await getGoogleAuthUrl();
    res.status(200).json(url);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export async function googleAuth(req, res) {
  const { code } = req.query;

  try {
    const profile = await getGoogleUser(code);
    console.log("profile", profile);
    const user = await findOrCreateUser(profile);
    console.log("user", user);
    const token = generateToken(user);
    res.status(200).json({ user: user, token: token });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
