import { dockStart } from "@nlpjs/basic";
import fs from "fs";

const modelFile = "trained-model.nlp";

(async () => {
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
})();
