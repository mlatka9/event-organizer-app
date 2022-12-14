import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // console.log("rzeczy", token, user)
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.uid;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials);
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        console.log("user", user);

        if (!credentials?.email || !credentials.password || !user?.password)
          return null;

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );
        // const user = {
        //   id: "111",
        //   name: "J Smith",
        //   email: "jsmith@example.com",
        //   image: null,
        //   jakies3pole: "asd",
        // };
        if (isPasswordCorrect) {
          const userObject = {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
          // Any object returned will be saved in `user` property of the JWT
          return userObject;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    GoogleProvider({
      clientId: env.NEXTAUTH_GOOGLE_CLIENT_ID,
      clientSecret: env.NEXTAUTH_GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
