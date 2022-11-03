import { validateRequestBody } from "@server/lib/validate-request-body";
import { NextApiRequest, NextApiResponse } from "next";
import { CreateEventInput, createEventSchema } from "./types";
import { prisma } from "@server/db/client";

const createEvent = async (req: NextApiRequest, res: NextApiResponse) => {
  validateRequestBody(req, res, createEventSchema);
  const body: CreateEventInput = req.body;
  if (!req.user) throw new Error("Bad middleware order");

  console.log(
    "TWORRZZZEEE CREATEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE"
  );
  await prisma.event.create({
    data: {
      name: body.name,
      description: body.description,
      street: body.street,
      city: body.city,
      country: body.country,
      postCode: body.postCode,
      startDate: body.startDate,
      longitude: body.longitude,
      latitude: body.latitude,
      tags: {
        connectOrCreate: body.tags.map((t) => ({
          create: {
            name: t,
          },
          where: {
            name: t,
          },
        })),
      },
    },
  });
};

const getAllEvents = async (req: NextApiRequest, res: NextApiResponse) => {
  return await prisma.event.findMany();
};

const eventController = {
  createEvent,
  getAllEvents,
};

export default eventController;
