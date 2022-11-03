import { prisma } from "@server/db/client";
import { validateRequestBody } from "@server/lib/validate-request-body";
import { NextApiRequest, NextApiResponse } from "next";
import { GroupRole } from "@prisma/client";
import { CreateGroupInput, createGroupSchema } from "./types";

const getAllGroups = async (req: NextApiRequest, res: NextApiResponse) => {
  return await prisma.group.findMany();
};

const getGroupInfo = async (req: NextApiRequest, res: NextApiResponse) => {
  const groupId = req.query.id as string;
  if (!groupId) throw new Error("No query parameter groupId");

  const group = await prisma.group.findUnique({
    where: {
      id: groupId,
    },
  });

  if (!group) throw new Error(`Group with id ${groupId} dose not exists`);

  return group;
};

const createGroup = async (req: NextApiRequest, res: NextApiResponse) => {
  validateRequestBody(req, res, createGroupSchema);
  const body: CreateGroupInput = req.body;
  if (!req.user) throw new Error("Bad middleware order");

  await prisma.group.create({
    data: {
      name: body.name,
      description: body.description,
      groupVisibility: body.groupVisibility,
      groupMember: {
        create: {
          userId: req.user.id,
          role: GroupRole.ADMIN,
        },
      },
    },
  });
};

export default {
  getAllGroups,
  getGroupInfo,
  createGroup,
};
