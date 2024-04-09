import { callApi } from '../services-base/api';

export async function callApiGetCMSToken() {
  const path = `/chat/api/v1/get-cms-token`;
  const rawResult = await callApi('GET', path, {}, true);

  return rawResult;
}

export type ChannelResponse = {
  channels: Array<{
    lastMessage?: {
      msg: string
    },
    _updatedAt: string, 
    name: string;
    msgs: 2;
    u: {
      username: string;
      _updatedAt: null | string;
      name: string;
      _id: string;
    };
    ts: '2024-04-05T11:20:33.780Z';
    _id: '660fde812bd598f46566ecbc';
  }>;
  total: 9;
};

export async function callApiGetChannels(offset = 0) {
  const path = `/chat/api/v1/cms/list-channel?offset=${offset}&count=100`;
  const rawResult = await callApi<ChannelResponse>('GET', path, {}, true);

  return rawResult;
}

export type MessageResponse = {
  messages: Array<{
    _id: string;
    alias: string;
    msg: string;
    ts: string;
    u: {
      username: string;
      name: string;
      _id: string;
    };
    _updatedAt: '2024-04-05T13:04:27.099Z';
  }>;
  count: 10;
  offset: 0;
  total: 24;
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
