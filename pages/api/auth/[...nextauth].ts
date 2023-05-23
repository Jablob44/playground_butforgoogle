

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOption = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({token, user, account, profile, isNewUser}: any) {
      console.log("JWT callback called");
      console.log("account object: ", account); 
        if (account?.accessToken) {
          token.accessToken = account.accessToken;
        }
          return token;
        },
    async session({ session, token, user }: any) {
      console.log("Session callback called");
      session.user.username = session?.user?.name
        .split(" ")
        .join("")
        .toLocaleLowerCase();

      session.user.uid = token.sub;
      if (token) {
        session.accessToken = token.accessToken;
        console.log("access token in auth: ", token.accessToken)
      }
      // session.accessToken = user.accessToken;
      return session;
    },
  },

  secret: process.env.NEXT_PUBLIC_SECRET,
};

export default NextAuth(authOption);
