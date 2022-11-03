import {
  CreateEventInput,
  GetEventsReturnType,
} from "@server/controllers/events/types";
import api from "lib/api";

export const fetchEvents = (): Promise<GetEventsReturnType> => {
  return api.get("/events").then((response) => response.data);
};

export const createEvent = async (groupData: CreateEventInput) => {
  const { data } = await api.post("events", groupData);
  return data;
};

// export const fetchGroupInfo = async (
//   groupId: string
// ): Promise<GetGroupInfoReturnType> => {
//   return api.get(`groups/${groupId}`).then((response) => response.data);
// };

const eventAPI = {
  createEvent,
  fetchEvents,
};

export default eventAPI;
