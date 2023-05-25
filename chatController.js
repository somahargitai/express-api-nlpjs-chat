import { dockStart } from "@nlpjs/basic";
import fs from "fs";

const modelFile = "trained-model.nlp";

async function getResponse(message) {
  const dock = await dockStart();
  const nlp = dock.get("nlp");

  if (fs.existsSync(modelFile)) {
    console.log("Loading model");
    await nlp.load(modelFile);
  } else {
    console.log("Training model");
    await nlp.train();
    await nlp.save(modelFile);
  }

  const response = await nlp.process("en", message);
  return response.answer;
}

async function chatResponse(req, res) {
  console.log("chat Response was called");
  try {
    let message;
    if (!!req.query && !!req.query.message && req.query.message.length > 0) {
      message = req.query.message;
    } else {
      message = "I should go now";
    }
    console.log(`incoming message is: ${message}`);
    const response = await getResponse(message);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
  }
}

export default chatResponse;
