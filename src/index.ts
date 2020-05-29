const URL = 'URL';
const TOKEN = 'TOKEN';

function extractMessageFromEvent(event: any): string {
  return JSON.parse(event.Records[0].Sns.Message).message;
}

async function postToWebhook(message: string): Promise<boolean> {
  const axios = require('axios').default;
  const instance = axios.create({
    baseURL: URL,
    headers: { Authorization: TOKEN },
    timeout: 1000,
  });
  await instance.post(URL, message);
  return true;
}

/**
 * @param {any} event AWS Event
 * @param {any} context AWA Lambda Context
 * @returns {void}
 * @description
 * AWS handler
 */
export async function handler(event: any): Promise<boolean> {
  const message = extractMessageFromEvent(event);
  const posted = await postToWebhook(message);
  if (posted) {
    return true;
  }
  return false;
}
