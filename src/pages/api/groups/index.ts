import groupController from "@server/controllers/groups";
import { withUser } from "@server/middleware/with-user";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter, } from "next-connect";
import { validateRequestBody } from "@server/lib/validate-request-body";
import { CreateGroupInput, createGroupSchema } from "@server/controllers/groups/types";

// Default Req and Res are IncomingMessage and ServerResponse
// You may want to pass in NextApiRequest and NextApiResponse
const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .use(async (req, res, next) => {
    const start = Date.now();
    await next(); // call next in chain
    const end = Date.now();
    console.log(`Request took ${end - start}ms`);
  })
  .get(async (req, res) => {
    const groups = await groupController.getAllGroups(req, res);
    res.json(groups)
  })
  .use(withUser)
  .post(async (req, res) => {
    await groupController.createGroup(req, res)
    res.json(201)
  })

// create a handler from router with custom
// onError and onNoMatch
export default router.handler({
  onError: (err, req, res) => {
    if(err instanceof Error) {
      console.error(err.stack);
    }
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});