import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import config from "../config";

export const JSONWebToken = {
  /**
   * Sign a JWT token
   * @param payload - payload to be signed
   * @returns - a signed token
   * @example - JSONWebToken.sign({ id: 1, name: "John Doe" }) => "asdasdk1l2k3j123klnlaskndlasndlkansd...""
   */
  sign: (payload: JwtPayload): string | null => {
    const sign = jwt.sign(payload, config.secret as string, {
      expiresIn: 3600 * 6, // 6 hours
    });

    if (sign) {
      return sign;
    }

    return null;
  },

  /**
   * Verify a JWT token
   * @param token - token to be verified
   * @returns - a decoded token
   * @example - JSONWebToken.verify("asdasdk1l2k3j123klnlaskndlasndlkansd...") => { id: 1, name: "John Doe" }
   */
  verify: <T>(token: string): T | null => {
    const verify = jwt.verify(token, config.secret as string);

    if (verify) {
      return verify as unknown as T;
    }

    return null;
  },
};
