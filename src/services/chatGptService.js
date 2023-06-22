import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function apiCallGetChatGptEngineList() {
  console.log("apiCallGetChatGptEngineList");
  const configuration = new Configuration({
    organization: "org-XMvfvHG4XVTYWaKX5mUUMPfu",
    apiKey: OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.listModels();
  const engineIdList = response.data.data.map((engine) => engine.id);

  //    [ 'gpt-3.5-turbo', ... ]
  return engineIdList;
}

async function apiCallGetAnswerFromChatGPTForTestQuestion(model, prompt) {
  console.log("chat gpt service called");
  console.log(`model: ${model}`);
  console.log(`prompt: ${prompt}`);

  // get answer for a test question from ChatGPT API
  try {
    // const prompt = "Who are the best five wine influencers?";

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    let textResult = "init value";

    // for gpt-3.5-turbo versions we use createChatCompletion
    if (model.includes("gpt-3.5-turbo")) {
      const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      });

      textResult = chatCompletion.data.choices[0].message.content;
    } else {
      // for all other versions we use createCompletion
      const chatCompletion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
      });

      textResult = chatCompletion.data.choices[0].text;
    }

    return textResult;
  } catch (err) {
    console.log("[Chat]: error happened in services");
    console.log(err);
    throw err;
  }
}

export {
  apiCallGetChatGptEngineList,
  apiCallGetAnswerFromChatGPTForTestQuestion,
};
