import { ApiKey } from "../models/api_key.model.js";

export async function apiKeyAuth(req, res, next) {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey) {
    return res.status(401).json({ message: "API key required" });
  }

  try {
    const keyDoc = await ApiKey.findOne({ key: apiKey, isActive: true });
    if (!keyDoc || (keyDoc.expiresAt && keyDoc.expiresAt < new Date())) {
      return res.status(401).json({ message: "Invalid or expired API key" });
    }
    req.apiKey = keyDoc;
    next();
  } catch (err) {
    return res.status(500).json({ message: "API key authentication failed" });
  }
}