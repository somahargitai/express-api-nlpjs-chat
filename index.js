// const server = require("./server");
import server from "./server.js"; // Add the file extension

const PORT = process.env.PORT || 4003;

const app = server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default app;