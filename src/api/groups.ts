import { GetGroupInfoReturnType, GetGroupsReturnType } from "@server/controllers/groups/types";
import api from "lib/api";
import { CreateGroupInput } from "@server/controllers/groups/types";

export const fetchGroups = (): Promise<GetGroupsReturnType> => {
  return api.get("/groups").then(response => response.data);
};

export const createGroup = async (groupData: CreateGroupInput) => {
  const { data } = await api.post("groups", groupData);
  return data;
};

export const fetchGroupInfo = async (groupId: string): Promise<GetGroupInfoReturnType> => {
  return api.get(`groups/${groupId}`).then(response => response.data)
};


export default {
  fetchGroups,
  createGroup,
  fetchGroupInfo
};