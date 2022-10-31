import { NextApiRequest } from "next";
import { DefaultSession } from "next-auth";

export interface NextApiRequestWithUser extends NextApiRequest {
    user?: {
      id: string;
    } & DefaultSession["user"];
  }