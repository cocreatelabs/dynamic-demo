import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { authenticateJWT } from "../../auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token is required" });
  }

  try {
    const decoded = authenticateJWT(token);

    // Check if decoded is an object and has an email property
    if (!(typeof decoded === "object" && "email" in decoded)) {
      return res.status(400).json({ error: "Invalid token" });
    }

    // Make a request to the CoCreate API to get a user
    const options = {
      method: "GET",
      url: "https://api.testcocrt.xyz/alpha/user",
      params: { email: decoded.email },
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.COCREATE_API_KEY}`,
      },
    };
    // Rest of your code...
    const response = await axios.request(options);

    return res.status(200).json(response.data);
  } catch (error) {
    // @ts-expect-error error is not typed
    if (error.response.status == 404) {
      return res.status(404).json({ error: "User not found" });
    }

    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
