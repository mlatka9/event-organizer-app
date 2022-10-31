import { Middleware } from "next-api-middleware";

export const httpMethod = (
  allowedHttpMethod: "GET" | "POST" | "PATCH"
): Middleware => {
  return async function (req, res, next) {
    if (req.method === allowedHttpMethod || req.method == "OPTIONS") {
      await next();
    } else {
      res.status(404);
      res.end();
    }
  };
};


// export const postRequestsOnlyMiddleware = httpMethod("POST");