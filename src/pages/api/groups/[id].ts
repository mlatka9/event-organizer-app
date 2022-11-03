import groupsController from "@server/controllers/groups";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

// Default Req and Res are IncomingMessage and ServerResponse
// You may want to pass in NextApiRequest and NextApiResponse
const router = createRouter<
  NextApiRequest & { isLoggedIn: true },
  NextApiResponse
>();
// const id = req.params.id
router
  .use(async (req, res, next) => {
    const start = Date.now();
    await next(); // call next in chain
    const end = Date.now();
    // console.log(`Request took ${end - start}ms`);
  })
  .get(async (req, res) => {
    const group = await groupsController.getGroupInfo(req, res);
    res.status(200).json(group);
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
