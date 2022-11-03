import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export const validateRequestBody = (
  req: NextApiRequest,
  res: NextApiResponse,
  schema: z.Schema
) => {
  const body = typeof req.body === "object" ? req.body : JSON.parse(req.body);
  const validation = schema.safeParse(body);

  if (!validation.success) {
    throw new Error(validation.error.message);
  }

  // return validation;
};
