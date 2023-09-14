// src/auth.ts
import jwt from "jsonwebtoken";

const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAr3+h1sv4HP5YGxTs+JM6
h8fmh+nt72pwg8eA7At7Jjw5MVEZe5vyTEr0s6W6C9N7wRcNEZy+YjzN2bIeTAxZ
84nnK21+edqrDLiN8qRl8hCMm8nDQMdsWpRePg3TRdKtYTkP0YpMbvRuapMTWc5C
CBWG0NR9syri2aWWjnY8Dnak3nyyqPpXKjU4a6KBMfij72DhKdKsHROBcUjjtytd
thE3lg2TgGs1MRIjVp0pGhJ/tcOUXibw/S3UQFaTA36v6aO8YVrIZYcvUCj/2UHK
ODLpoWEt0rP8uVixZAX3u73fT/Fv8N/NRGv/jbXCejXVDExv11U+WDCF+8MIkM1z
dgtyrquyKMuQjfWamy9yUG8pQzl4H1MwdOv1MDQ2gOt9V0AlcEGA/0NF+iFYWzGD
eIogR3cQZNZhQtxlR7Q4vYdAC6NSrgECYKilEWaO/Th4gSdLoLWRIqNQ98U+h86f
2NABAKzLc9drEmLve8Wb31NY1l1noiotX0HG5426z4Dl3uRjKPvi3l4EPNkU5kIc
WrsYYhzCEQr/oZqvzG40PQGmnvf+pTxzL5mCOILqlX1T7Z0TUu0ptM0wyi4At9l/
63c/j9QQiXsjAKSVIXvxUzPH3ZyOfvnf9VZz7yRPJYXD0RSwHAWPsjWqKVedBNsu
sG1siVpS7+H2EXGxwn5AS58CAwEAAQ==
-----END PUBLIC KEY-----`;

export const authenticateJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, PUBLIC_KEY);

    if (!(typeof decoded === "object" && "email" in decoded)) {
      throw new Error("Invalid token");
    }

    return decoded;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
