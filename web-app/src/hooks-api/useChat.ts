import { useContext, useEffect, useRef, useState } from 'react';
import { useSubscription } from 'react-stomp-hooks';
import { callApiGetChannel, callApiGetMessages, callApiSendMessage } from 'src/api/chat';
import { AuthContext } from 'src/contexts/AuthContextProvider';
import { uniqBy } from 'src/utils/base.util';

type Message = {
  id: string;
  text: string;
  isMe: boolean;
  sender?: string | null;
  time: string;
};

type UseChatProps = {
  onMessage?: () => void;
};

export function useChat({ onMessage }: UseChatProps = {}) {
  const { user } = useContext(AuthContext);

  const [userId, setUserId] = useState<string>();
  const [channelId, setChannelId] = useState<string>();
  const [messages, setMessages] = useState<Message[]>();
  const [loading, setLoading] = useState(false);

  const canFetchMsg = useRef(true);

  const fetchChannel = async () => {
    const { _id, name } = (await callApiGetChannel()) ?? {};
    setChannelId(_id);
    setUserId(name);
  };

  const fetch = async (offset = 0) => {
    if (!canFetchMsg.current || loading) return;

    if (!channelId) {
      fetchChannel();
      return;
    }

    setLoading(true);

    const res = await callApiGetMessages({ roomId: channelId, offset, count: 10 });
    const { messages = [] } = res;

    if (res.offset + res.count >= res.total) {
      canFetchMsg.current = false;
    }

    const convertedMessages = messages.map((item) => ({
      id: item._id,
      text: item.msg,
      isMe: item.alias === user?.email,
      sender: item.alias,
      time: item._updatedAt,
    }));

    setMessages((prev) => {
      const uniqMessages = uniqBy([...convertedMessages, ...(prev ?? [])], (item) => item.id);
      uniqMessages.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

      return [...uniqMessages];
    });

    setLoading(false);
  };

  const sendMessage = async (text: string) => {
    await callApiSendMessage(text);
    await fetch(0);
  };

  const fetchMore = () => fetch(messages?.length ?? 0);

  useEffect(() => {
    fetch(0);
  }, [channelId]);

  useSubscription(`/chat/topic/public/${userId}`, () => {
    fetch(0).then(onMessage);
  });

  return { sendMessage, messages, fetchMore, loading };
}
