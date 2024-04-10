import { callApi } from 'src/services-base/api';

type Channel = {
  _id: string;
  name: string;
};

export const callApiGetChannel = async () => {
  const path = '/chat/api/v1/customer/get-channel';
  const channels = await callApi<Channel>('GET', path, {}, true);

  return channels;
};

type Message = {
  alias: null;
  msg: string;
  ts: '2024-04-06T13:01:33.370Z';
  u: {
    username: string;
    name: string;
    _id: string;
  };
  _id: string;
  _updatedAt: string;
};

export const callApiGetMessages = async (body: { roomId: string; offset: number; count: number }) => {
  const path = `/chat/api/v1/customer/get-messages`;
  const messages = await callApi<{ messages: Message[]; total: number; offset: number; count: number }>(
    'GET',
    path,
    body,
    true
  );

  return messages;
};

export const callApiSendMessage = async (msg: string) => {
  const path = '/chat/api/v1/customer/post-message';

  await callApi('POST', path, { message: { msg } }, true);
};
