import { useCallback, useEffect, useState } from 'react';
import { callApiGetChannel, callApiGetMessages, callApiSendMessage } from 'src/api/chat';
import { uniqBy } from 'src/utils/base.util';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'admin' | string;
  time: string;
};

export function useChat() {
  const [channelId, setChannelId] = useState<string>();
  const [messages, setMessages] = useState<Message[]>();
  const [loading, setLoading] = useState(false);

  const updateChannelId = async () => {
    if (channelId) return;
    const { _id } = await callApiGetChannel();
    setChannelId(_id);
  };

  const fetch = useCallback(
    async (offset = 0) => {
      if (!channelId) {
        return await updateChannelId()
      }
      if (loading) return;

      setLoading(true);
      const { messages = [] } = await callApiGetMessages(channelId!, { roomId: channelId, offset, count: 10 });

      const convertedMessages = messages.map((item) => ({
        id: item._id,
        text: item.msg,
        sender: item.alias === 'admin@drm.com' ? 'admin' : 'user',
        time: item._updatedAt,
      }));

      setMessages((prev) => {
        const uniqMessages = uniqBy([...(prev ?? []), ...convertedMessages], (item) => item.id);
        uniqMessages.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

        return uniqMessages;
      });

      setLoading(false);
    },
    [messages, channelId]
  );

  const sendMessage = async (text: string) => {
    await callApiSendMessage(text);
    await fetch(0);
  };

  const fetchMore = () => fetch(messages?.length);

  useEffect(() => {
    fetch()

    const interval = setInterval(() => {
      fetch();
    }, 1500);

    return () => {
      clearInterval(interval);
    };
  }, [channelId]);

  return { sendMessage, messages, fetchMore, loading: false };
}
