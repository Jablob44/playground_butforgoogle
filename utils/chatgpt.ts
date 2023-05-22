// queryApi.ts
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const query = async (prompt: string, chatId: string) => {
  const res = await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: prompt}],
    })
    .then((res) => res.data.choices[0].message)
    .catch((err) =>
      console.log(`chatGpt unable to find an answer fot that! ${err.message}`)
    );

  return res;
};

export default query;
