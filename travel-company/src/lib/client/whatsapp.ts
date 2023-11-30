import { WHATSAPP_API_URL } from "$env/static/private";
import * as Sentry from "@sentry/node";

type StandardResponse = Promise<{ status: string; message: string }>;

type Endpoint = "create-group" | "add-guest-to-group" | "send-message-to-group";

async function callWhatsappAPi(endpoint: Endpoint, body: any) {
  try {
    const res = await fetch(WHATSAPP_API_URL + "/" + endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return await res.json();
  } catch (error) {
    Sentry.withScope((scope) => {
      scope.setExtra("Endpoint", endpoint);
      scope.setExtra("Body", body);
      Sentry.captureException(error);
    });

    return error;
  }
}

async function createGroup(
  groupName: string,
  imageUrl: string
): Promise<{
  status: string;
  message: string;
  groupId: string;
  inviteCode: string;
}> {
  return await callWhatsappAPi("create-group", {
    groupName,
    imageUrl,
  });
}

async function addGuestToGroup(
  groupId: string,
  participants: string[]
): StandardResponse {
  return await callWhatsappAPi("add-guest-to-group", {
    groupId,
    participants,
  });
}

async function sendMessageToGroup(
  groupId: string,
  message: string
): StandardResponse {
  return await callWhatsappAPi("send-message-to-group", {
    groupId,
    message,
  });
}

async function alive(): StandardResponse {
  const res = await fetch(WHATSAPP_API_URL + "/alive");
  return await res.json();
}

const whatsapp = {
  createGroup,
  addGuestToGroup,
  sendMessageToGroup,
  alive,
};

export default whatsapp;
