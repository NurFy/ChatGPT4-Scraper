import gpt4 from "./lib/function.js";

(async () => {
  const response = await gpt4("kapan indonesia merdeka?");
  console.log(response);
})();
