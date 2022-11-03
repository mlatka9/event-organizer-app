import { isISODate } from "lib/is-iso-date";
import { AsyncReturnType } from "types/lib";
import { number, z } from "zod";
import eventsController from "@server/controllers/events";

export const createEventSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(3),
  street: z.string().min(3),
  city: z.string().min(3),
  country: z.string().min(3),
  postCode: z.string().min(3),
  startDate: z
    .string()
    .refine(isISODate, { message: "Not a valid ISO string date " }),
  latitude: number().min(-90).max(90).optional(),
  longitude: number().min(-180).max(180).optional(),
  tags: z.array(z.string()),
});

export type CreateEventInput = z.infer<typeof createEventSchema>;
export type GetEventsReturnType = AsyncReturnType<
  typeof eventsController.getAllEvents
>;
