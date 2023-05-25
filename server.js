import express from "express";
import pkg from "body-parser";
const { json } = pkg;
import cors from "cors";
import bodyParser from "body-parser";
import chatResponse from "./chatController.js";

const server = express();

server.use(bodyParser.json({ limit: "5mb", type: "application/json" }));
server.use(json());
server.disable("etag");

server.use(
  cors({
    origin: [
      // config.url.client,
      "http://localhost:5173",
    ],
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  })
);

server.get("/hello", (req, res) => {
  console.log("hello endpoint was called");
  return res.status(200).send({
    data: "hello-world",
  });
});

server.get("/chat", chatResponse);

export default server;
