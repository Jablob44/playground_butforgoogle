

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";




export const authOption = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // authorizationUrl: 'https://accounts.google.com/o/oauth2/auth?response_type=code&access_type=offline&prompt=consent',

      authorization: {
        params: {
          scope: 'openid profile email https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.rosters https://www.googleapis.com/auth/classroom.coursework.students',
        },
      },
      // clientId: process.env.GOOGLE_CLIENT_ID!,
      // clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // // authorizationUrl: 'https://accounts.google.com/o/oauth2/auth?response_type=code&access_type=offline&prompt=consent',
      // // scope: 'https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.rosters',
    }),
  ],

  callbacks: {
    async signIn({user, account, profile, email, credentials}: any) {
      console.log('signIn callback', user, account, profile, email, credentials);
      return true;
    },
    async jwt({token, user, account, profile, isNewUser}: any) {
      console.log("JWT callback called");
      console.log("account object: ", account); 
      console.log("JWT callback called with token: ", token);
      console.log("JWT callback called with user: ", user);
      console.log("JWT callback called with account: ", account);
      console.log("JWT callback called with profile: ", profile);
      console.log("JWT callback called with isNewUser: ", isNewUser);
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
