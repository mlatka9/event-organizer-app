import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const allowedMethods = ['GET'];

type User = { userId: string };

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(4),
    passwordConfirm: z.string().min(4),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
  });

const handler = (req: NextApiRequest, res: NextApiResponse<User>) => {

    // try {
      if (!allowedMethods.includes(req.method!) || req.method == 'OPTIONS') {
        return res.status(405).send({ message: 'Method not allowed.' });
      }
  
      // Validate the incoming data and return 400 if it's not what is expected
      const body = typeof req.body === 'object' ? req.body : JSON.parse(req.body);
      const validation = formSchema.safeParse(body);
  
      if (!validation.success) {
        return res.status(400).send({
          message: validation.error,
        });
      }
  
      return res.status(200).json({ userId: 'abc123' });
    // } catch (error) {
    //   console.error(error);
    //   Sentry.captureException(error);
    //   res.status(500).send({ message: 'Server error!' });
    // }
  };
  
  export default handler;