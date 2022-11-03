import eventController from "@server/controllers/events";
import { withUser } from "@server/middleware/with-user";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

// Default Req and Res are IncomingMessage and ServerResponse
// You may want to pass in NextApiRequest and NextApiResponse
const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .get(async (req, res) => {
    const events = await eventController.getAllEvents(req, res);
    res.json(events);
  })
  .use(withUser)
  .post(async (req, res) => {
    await eventController.createEvent(req, res);
    res.status(201).end();
  });

// create a handler from router with custom
// onError and onNoMatch
export default router.handler({
  onError: (err, req, res) => {
    if (err instanceof Error) {
      console.error(err.stack);
    }
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});
