import {
  // apiCallGetChatGptEngineList,
  apiCallGetAnswerFromChatGPTForTestQuestion,
} from "../services/chatGptService.js";

const chatResponse = async (req, res) => {
  console.log("chatResponse endpoint was called");
  const { model, prompt } = req.query;

  if (!prompt) {
    return res.status(200).send({
      data: {
        role: "assistant",
        content:
          "Hi there! Welcome to the application. Please enter a question to get started.",
      },
    });
  }

  try {
    const response = await apiCallGetAnswerFromChatGPTForTestQuestion(
      model,
      prompt
    );
    console.log("chat gpt response in controller");
    console.log(response);
    // {
    //   "role": "assistant",
    //   "content": "Hi there! How can I assist you today?"
    // }

    return res.status(200).send({
      message: response,
    });
  } catch (err) {
    console.log("error happened in chat gpt controller");
    // console.log(err);
    return res.status(500).send({
      // data: err,
      error: "error",
    });
  }
};

const listModels = async (req, res) => {
  console.log("listModels endpoint was called");

  // const engineIdList = await apiCallGetChatGptEngineList();
  // console.log("engineIdList");
  // console.log(JSON.stringify(engineIdList, null, 2));

  const engineIdList = [
    "whisper-1",
    "babbage",
    "davinci",
    "text-davinci-edit-001",
    "babbage-code-search-code",
    "text-similarity-babbage-001",
    "code-davinci-edit-001",
    "text-davinci-001",
    "ada",
    "babbage-code-search-text",
    "babbage-similarity",
    "code-search-babbage-text-001",
    "text-curie-001",
    "code-search-babbage-code-001",
    "text-ada-001",
    "text-similarity-ada-001",
    "curie-instruct-beta",
    "ada-code-search-code",
    "ada-similarity",
    "code-search-ada-text-001",
    "text-search-ada-query-001",
    "davinci-search-document",
    "ada-code-search-text",
    "text-search-ada-doc-001",
    "davinci-instruct-beta",
    "text-similarity-curie-001",
    "code-search-ada-code-001",
    "ada-search-query",
    "text-search-davinci-query-001",
    "curie-search-query",
    "davinci-search-query",
    "babbage-search-document",
    "ada-search-document",
    "text-search-curie-query-001",
    "text-search-babbage-doc-001",
    "curie-search-document",
    "text-search-curie-doc-001",
    "babbage-search-query",
    "text-babbage-001",
    "text-search-davinci-doc-001",
    "text-search-babbage-query-001",
    "curie-similarity",
    "text-embedding-ada-002",
    "gpt-3.5-turbo-0613",
    "curie",
    "gpt-3.5-turbo-16k-0613",
    "text-similarity-davinci-001",
    "text-davinci-002",
    "gpt-3.5-turbo-16k",
    "text-davinci-003",
    "davinci-similarity",
    "gpt-3.5-turbo-0301",
    "gpt-3.5-turbo",
  ];

  return res.status(200).send(engineIdList);
};
export { chatResponse, listModels };
