import { prisma } from "@server/db/client";
import { validateRequestBody } from "@server/lib/validate-request-body";
import { NextApiRequestWithUser } from "@server/types";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export const createGroup = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  const schema = z.object({
    name: z.string().min(3),
    description: z.string().min(3),
  });

  validateRequestBody(req, res, schema);
  const body: z.infer<typeof schema> = req.body

  if(!req.user) throw new Error('Bad middleware order')

  prisma.group.create({
    data: {
      name: body.name,
      description: body.description,
      UserEvents: {
        create: {
          userId: req.user.id
        }
      }
    },
  });
};
