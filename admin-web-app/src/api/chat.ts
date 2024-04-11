import { callApi } from '../services-base/api';

export async function callApiGetCMSToken() {
  const path = `/chat/api/v1/get-cms-token`;
  const rawResult = await callApi('GET', path, {}, true);

  return rawResult;
}

export type ChannelResponse = {
  channels: Array<{
    lastMessage?: {
      msg: string;
      alias: string;
      u: {
        name: string;
        username: string;
      };
    };
    _updatedAt: string;
    name: string;
    msgs: 2;
    u: {
      username: string;
      _updatedAt: null | string;
      name: string;
      _id: string;
      email?: string | null;
    };
    ts: '2024-04-05T11:20:33.780Z';
    _id: '660fde812bd598f46566ecbc';
  }>;
  total: number;
  offset: number;
  count: number;
};

export async function callApiGetChannels(offset = 0, limit = 10) {
  const path = `/chat/api/v1/cms/list-channel?offset=${offset}&count=${limit}`;
  const rawResult = await callApi<ChannelResponse>('GET', path, {}, true);

  return rawResult;
}

export type MessageResponse = {
  messages: Array<{
    alias: string;
    msg: string;
    parseUrls: boolean;
    groupable: boolean;
    ts: string;
    u: {
      username: boolean;
      createdAt: string | null;
      email: string | null;
      status: string | null;
      type: string | null;
      active: boolean;
      _updatedAt: string | null;
      name: string;
      _id: string;
    };
    rid: string;
    _id: string;
    _updatedAt: string;
  }>;
  count: number;
  offset: number;
  total: number;
  success: true;
};

export async function callApiGetMessages(
  roomId: string,
  offset: number,
  limit = 10,
) {
  const path = `/chat/api/v1/cms/get-messages?roomId=${roomId}&offset=${offset}&count=${limit}`;

  const rawResult = await callApi<MessageResponse>('GET', path, {}, true);
  return rawResult;
}

export async function callApiSendMessage(userId: string, text: string) {
  const path = `/chat/api/v1/cms/post-message`;

  await callApi(
    'POST',
    path,
    {
      to: userId,
      message: {
        msg: text,
      },
    },
    true,
  );
}
