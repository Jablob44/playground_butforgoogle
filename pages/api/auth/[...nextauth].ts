// import NextAuth from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';
// const clientId: string = process.env.GOOGLE_CLIENT_ID || '';
// const clientSecret: string = process.env.GOOGLE_CLIENT_SECRET || '';
// export default NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId,
//       clientSecret,
//       authorizationUrl: 'https://accounts.google.com/o/oauth2/auth?prompt=consent&access_type=offline&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.coursework.students',
//     }),
//   ],

//   callbacks: {
//     async jwt(token: any, user: any, account: {accessToken?: string}, profile: any, isNewUser: any) { 
//       if (account?.accessToken) {
//         token.accessToken = account.accessToken;
//       }
//       return token;
//     },
//     async session(session: any, token: {accessToken?: string}) {
//       session.accessToken = token.accessToken;
//       return session;
//     },
//   },

//   secret: process.env.NEXT_PUBLIC_SECRET,
// });









// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// export const authOption = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       // scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.coursework.students',
//     }),
//   ],

//   callbacks: {
//     async jwt(token, user, account, profile, isNewUser) {
//       if (account?.accessToken) {
//         token.accessToken = account.accessToken;
//       }
//       return token;
//     },
//     async session({ session, token, user }) {
//       session.user.username = session?.user?.name
//         .split(" ")
//         .join("")
//         .toLocaleLowerCase();

//       session.user.uid = token.sub;
//       if (token) {
//         session.accessToken = token.accessToken;
//         console.log("access token in auth: ", token.accessToken)
//       }
//       return session;
//     },
//   },

//   secret: process.env.NEXT_PUBLIC_SECRET,
// };

// export default NextAuth(authOption);




// import NextAuth from 'next-auth'
// import Providers from 'next-auth/providers'

// export default NextAuth({
//   providers: [
//     Providers.Google({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   callbacks: {
//     async jwt(token, user, account, profile, isNewUser) {
//       if (account?.accessToken) {
//         token.accessToken = account.accessToken;
//       }
//       return token;
//     },
//     async session(session, token) {
//       session.accessToken = token.accessToken;
//       return session;
//     },
//   },
//   secret: process.env.NEXT_PUBLIC_SECRET,
// })






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
