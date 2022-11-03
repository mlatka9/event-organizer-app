import { ValidationError } from "@server/errors/validation-error";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "@server/db/client";
import bcrypt from "bcryptjs";

// const allowedMethods = ["GET"];

// type User = { userId: string };

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
  // passwordConfirm: z.string().min(4),
});
// .refine((data) => data.password === data.passwordConfirm, {
//   message: "Passwords don't match",
// });

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // if (!allowedMethods.includes(req.method!) || req.method == "OPTIONS") {
    //   return res.status(405).send({ message: "Method not allowed." });
    // }

    if (req.method === "POST") {
      const validation = formSchema.safeParse(req.body);
      const body: z.infer<typeof formSchema> = req.body;

      if (!validation.success) {
        throw new ValidationError(validation.error.message);
      }

      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(body.password, salt);

      await prisma.user.create({
        data: {
          email: body.email,
          password: password,
        },
      });

      return res.status(201).end();
    }

    // Validate the incoming data and return 400 if it's not what is expected
    // const body = typeof req.body === 'object' ? req.body : JSON.parse(req.body);
  } catch (error) {
    console.error(error);
    if (error instanceof ValidationError) {
      return res.status(error.statusCode).end();
    }
    res.status(500).end();
  }
};

export default handler;
