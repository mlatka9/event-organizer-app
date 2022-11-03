import { z } from "zod";
import { GroupVisibility } from "@prisma/client";
import { AsyncReturnType } from "types/lib";
import groupsController from "@server/controllers/groups";

export const createGroupSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(3),
  groupVisibility: z.enum([GroupVisibility.PRIVATE, GroupVisibility.PUBLIC]),
});

export type CreateGroupInput = z.infer<typeof createGroupSchema>

export type GetGroupsReturnType = AsyncReturnType<typeof groupsController.getAllGroups>;
export type GetGroupInfoReturnType = AsyncReturnType<typeof groupsController.getGroupInfo>;

