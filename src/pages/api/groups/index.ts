import { createGroup } from "@server/controllers/groups";
import { withUser } from "@server/middleware/with-user";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter, } from "next-connect";

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
  .get((req, res) => {
    res.send("Hello world")
    res.end()
  })
  .use(withUser)
  .post(async (req, res) => {
    createGroup(req, res)
    // use async/await
    // const user = await insertUser(req.body.user);
    res.json({ postTest: "asd" });
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