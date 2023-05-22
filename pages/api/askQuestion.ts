// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { adminDb } from "@/firebase/firebaseAdmin";
import query from "@/utils/queryApi";
import admin from "firebase-admin";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = req.body;

  if (!prompt) {
    res.status(400).json({ answer: "Please Provide a prompt" });
    return;
  }

  if (!chatId) {
    res.status(400).json({ answer: "Please provide a valid chat Id" });
    return;
  }

  // ChatGpt Query

  const response = await query(prompt, chatId);

  let responseText: string;
  if (response) {
    responseText = typeof response === 'string' ? response : response.content;
  } else {
    responseText = "if/else unable to answer that!";
  }
  
  const message: Message = {
    text: responseText,
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "if/else",
      name: "if/else",
      email: "if/else",
      avatar:
        "https://drive.google.com/uc?export=download&id=1ikaBBU-OsBSHkleHQmf15ww0vgX-A0Kz",
    },
  };

  await adminDb
    .collection("users")
    .doc(session?.user?.uid)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  res.status(200).json({ answer: message.text });
}

// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { adminDb } from "@/firebase/firebaseAdmin";
// import query from "@/utils/queryApi";
// import admin from "firebase-admin";
// import type { NextApiRequest, NextApiResponse } from "next";

// type Data = {
//   answer: string;
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   const { prompt, chatId, model, session } = req.body;

//   if (!prompt) {
//     res.status(400).json({ answer: "Please Provide a prompt" });
//     return;
//   }

//   if (!chatId) {
//     res.status(400).json({ answer: "Please provide a valid chat Id" });
//     return;
//   }

//   // ChatGpt Query

//   const response = await query(prompt, chatId);

//   const message: Message = {
//     text: response || "if/else unable to answer that!",
//     createdAt: admin.firestore.Timestamp.now(),
//     user: {
//       _id: "if/else",
//       name: "if/else",
//       email: "if/else",
//       avatar:
//         "https://drive.google.com/uc?export=download&id=1ikaBBU-OsBSHkleHQmf15ww0vgX-A0Kz",
//     },
//   };

//   await adminDb
//     .collection("users")
//     .doc(session?.user?.uid)
//     .collection("chats")
//     .doc(chatId)
//     .collection("messages")
//     .add(message);

//   res.status(200).json({ answer: message.text });
// }
