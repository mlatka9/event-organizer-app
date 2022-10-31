import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import { getServerAuthSession } from "../lib/get-server-auth-session";

export const withUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  const session = await getServerAuthSession({ req, res });

  if (!session || !session.user) {
    res.status(404);
    res.statusMessage = 'You must be anthe'
    res.end();
  } else {
    req.user = session.user;
    await next();
  }
};
