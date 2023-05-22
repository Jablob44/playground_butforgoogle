interface ChatCompletionResponseMessage {
  role: string;
  content: string;
}

interface Message {
  text: string;

  createdAt: admin.firestore.Timestamp;
  user: {
    _id: string;
    name: string;
    email: string;
    avatar: string;
  };
}

// interface Message {
//   text: string;

//   createdAt: admin.firestore.Timestamp;
//   user: {
//     _id: string;
//     name: string;
//     email: string;
//     avatar: string;
//   };
// }
