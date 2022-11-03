import { useQuery } from "@tanstack/react-query";
import GroupAPI from "api/groups";
import eventAPI from "api/events";
import { GetGroupInfoReturnType } from "@server/controllers/groups/types";

export const useGroups = () => {
  return useQuery(["groups"], GroupAPI.fetchGroups);
};

export const useGroupInfoQuery = (groupId: string) => {
  return useQuery(["groups", { groupId }], () =>
    GroupAPI.fetchGroupInfo(groupId)
  );
};

export const useEventsQuery = () => {
  return useQuery(["events"], eventAPI.fetchEvents);
};
