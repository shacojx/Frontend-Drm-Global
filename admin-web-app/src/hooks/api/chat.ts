import { useQuery } from '@tanstack/react-query';
import { isNil, sortBy, uniqBy } from 'lodash-es';
import { useContext, useEffect, useReducer, useState } from 'react';
import { useSubscription } from 'react-stomp-hooks';
import {
  ChannelResponse,
  callApiGetChannels,
  callApiGetMessages,
  callApiSendMessage,
} from '../../api/chat';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { useApiUserSearchByRole } from "./user";
import dayjs from 'dayjs';

type Message = {
  id: string;
  text: string;
  isMe: boolean;
  sender?: string;
  time: string;
  email: string;
};

type Pagination = {
  total: number;
  count: number;
  offset: number;
};

type Channel = ChannelResponse['channels'][number];

type UseChatProps = {
  onMessage?: () => void;
  onSentMessage?: () => void;
};

export function useChat({ onMessage, onSentMessage }: UseChatProps = {}) {
  const { user } = useContext(AuthContext);
  const bunchOfAdminQuery = useApiUserSearchByRole({role: 'admin'})
  const [lastFetchMessage, refetchMessages] = useReducer(
    () => Date.now(),
    Date.now(),
  );
  const [lastFetchChannel, refetchChannel] = useReducer(
    () => Date.now(),
    Date.now(),
  );

  const [activeChannelId, setActiveChannelId] = useState<string>();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [activeMessages, setActiveMessages] = useState<Message[]>([]);

  const [sendingMessage, setSendingMessage] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const [messagePagination, setMessagePagination] = useState<Pagination>({
    count: 10,
    offset: 0,
    total: NaN,
  });

  const [channelPagination, setChannelPagination] = useState<Pagination>({
    count: 15,
    offset: 0,
    total: NaN,
  });

  const { isLoading: fetchingMessage } = useQuery({
    queryKey: [
      'getMessages',
      activeChannelId,
      messagePagination.offset,
      messagePagination.count,
      lastFetchMessage,
    ],
    queryFn: async () => {
      const { count, offset } = messagePagination;
      const res = await callApiGetMessages(activeChannelId!, offset, count);
      setMessagePagination({
        count: res.count,
        offset: res.offset,
        total: res.total,
      });

      const convertedMessages = res.messages.map<Message>((m) => ({
        email: m.alias,
        id: m._id,
        isMe: m.alias === user?.email,
        text: m.msg,
        time: m._updatedAt,
        sender: m.u.name === 'livechat-agent'
          ? bunchOfAdminQuery.data?.find(account => account.email === m.alias)
            ? 'Admin'
            : 'Staff'
          : m.u.name,
      }));

      setActiveMessages((prev) =>
        sortBy(
          uniqBy([...convertedMessages, ...prev], (m) => m.id),
          (m) => +dayjs(m.time),
        ),
      );

      if (sendingMessage) {
        onSentMessage?.();
        setSendingMessage(false);
      }

      if (hasNewMessage) {
        onMessage?.();
        setHasNewMessage(false)
      }

      return res;
    },
    enabled: !!activeChannelId,
  });

  const { isLoading: fetchingChannel } = useQuery({
    queryKey: [
      'getChannels',
      channelPagination.offset,
      channelPagination.count,
      lastFetchChannel,
    ],
    queryFn: async () => {
      const { offset, count } = channelPagination;
      const res = await callApiGetChannels(offset, count);

      if (isNil(activeChannelId)) {
        setActiveChannelId(res.channels[0]._id);
      }

      setChannelPagination({
        count: res.count,
        offset: res.offset,
        total: res.total,
      });

      setChannels((prev) =>
        uniqBy(
          [...res.channels.map((c) => ({ ...c, messages: [] })), ...prev],
          (c) => c._id,
        ).sort((c) => +dayjs(c._updatedAt)),
      );

      return res;
    },
  });

  useSubscription('/chat/topic/public/cms', (msg) => {
    const incomingChannelId = channels?.find((c) => c.name === msg.body)?._id;
    if (!incomingChannelId) return;

    setChannelPagination((prev) => ({ ...prev, offset: 0 }));
    setMessagePagination((prev) => ({ ...prev, offset: 0 }));
    refetchChannel();
    refetchMessages();
    setHasNewMessage(true);
  });

  const sendMessage = async (msg: string) => {
    const activeUserId = channels.find((c) => c._id === activeChannelId)?.name;
    if (!activeUserId) return;
    setSendingMessage(true);
    await callApiSendMessage(activeUserId, msg);
    setMessagePagination((prev) => ({ ...prev, offset: 0 }));
    refetchChannel();
    refetchMessages();
  };

  const fetchMoreMessages = () => {
    setMessagePagination((prev) => {
      const { count, offset, total } = prev;
      const hasMore = offset + count < total;
      if (!hasMore) return prev;

      return {
        ...prev,
        count: Math.min(count, total - (offset + count)),
        offset: offset + count,
      };
    });
  };

  const fetchMoreChannel = () => {
    setChannelPagination((prev) => {
      const { count, offset, total } = prev;
      const hasMore = offset + count < total;
      if (!hasMore) return prev;

      return {
        ...prev,
        count: Math.min(count, total - (offset + count)),
        offset: offset + count,
      };
    });
  };

  return {
    channels,
    messages: activeMessages,
    changeActiveChannel: async (id: string) => {
      setActiveChannelId(id);
      setMessagePagination((prev) => ({ ...prev, offset: 0 }));
      setActiveMessages([]);
      refetchMessages();
      onMessage?.()
    },
    sendingMessage,
    fetchMoreMessages,
    fetchingMessage,
    sendMessage,
    fetchMoreChannel,
    activeChannelId,
  };
}
