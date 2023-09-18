import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { authenticateJWT } from "../../auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token is required" });
  }

  try {
    const decoded = authenticateJWT(token);

    // Check if decoded is an object and has an email property and a sub property
    const isDecodedValid =
      typeof decoded === "object" && "email" in decoded && "sub" in decoded;
    if (!isDecodedValid) {
      return res.status(400).json({ error: "Invalid token" });
    }
    // Make a request to the CoCreate API to create a user
    const options = {
      method: "POST",
      url: "https://api.testcocrt.xyz/alpha/user",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.COCREATE_API_KEY}`,
      },
      data: {
        email: decoded.email,
      },
    };
    // Rest of your code...
    const response = await axios.request(options);

    console.log(
      "Co:Create Create Response",
      JSON.stringify(response.data, null, 2)
    );

    console.log(
      "CoCreate Wallet address and Dynamic User Id",
      response.data.data.cocreate_wallet_address,
      decoded.sub
    );

    const dynamicOptions = {
      method: "POST",
      url: `https://app.dynamicauth.com/api/v0/users/${decoded.sub}/wallets`,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.DYNAMIC_API_KEY}`,
      },
      data: {
        chain: "EVM",
        publicWalletAddress: response.data.data.cocreate_wallet_address,
        walletName: "Co:Create Wallet",
        walletProvider: "custodialService",
      },
    };

    try {
      const dynamicResponse = await axios.request(dynamicOptions);
      console.log(
        `Successfully associated Co:Create wallet with Dynamic user id ${decoded.sub}`,
        JSON.stringify(dynamicResponse.data, null, 2)
      );
    } catch (error) {
      console.error("Error creating wallet on Dynamic");
      console.error(JSON.stringify(error, null, 2));
    }
    return res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
