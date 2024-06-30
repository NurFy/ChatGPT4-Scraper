import axios from "axios";
import { load } from "cheerio";

const baseURL = "https://chatgpt4online.org/";
/**
 * well done!
 * @returns
 */
const getNonce = async () => {
  const { data } = await axios({
    baseURL,
    method: "GET",
    headers: {
      Referer: "https://www.google.com/",
      "Upgrade-Insecure-Requests": 1,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    },
  });
  const $ = load(data);
  const container = $("div.mwai-chatbot-container").attr("data-system");

  return JSON.parse(container);
};
/**
 * make a request, payload schema by https://github.com/Renlikesmoon
 * @param {string} content
 * @returns
 */
export default async (content) => {
  const { restNonce } = await getNonce();
  const { data } = await axios({
    baseURL,
    url: "/wp-json/mwai-ui/v1/chats/submit",
    method: "POST",
    headers: {
      "X-Wp-Nonce": restNonce,
      "content-type": "application/json",
    },
    data: {
      botId: "default",
      messages: [
        {
          role: "assistant",
          content: `Nama kamu adalah Bagas, kamu cerdas.`,
        },
        {
          role: "user",
          content,
        },
      ],
      newMessage: content,
      stream: false,
    },
  });
  if (!data.success) {
    return data.message;
  }

  return data.reply;
};
