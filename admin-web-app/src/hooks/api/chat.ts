import { useEffect, useState } from 'react';
import {
  ChannelResponse,
  callApiGetChannels,
  callApiGetMessages,
  callApiSendMessage,
} from '../../api/chat';
import { last, sortBy, uniqBy } from 'lodash-es';
import { useSubscription } from 'react-stomp-hooks';
import dayjs from 'dayjs';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'admin' | string;
  time: string;
};

type Channel = ChannelResponse['channels'][number] & {
  messages: Message[];
};

type UseChatProps = {
  onMessage?: () => void;
};

export function useChat({ onMessage }: UseChatProps = {}) {
  const [channels, setChannels] = useState<Channel[]>();
  const [activeChannelId, setActiveChannelId] = useState<string>();
  const activeChannel = channels?.find((item) => item._id === activeChannelId);

  const [loading, setLoading] = useState(false);

  const fetchChannels = async (offset = 0) => {
    const res = await callApiGetChannels(offset);

    setChannels((prev) => {
      const convertedChannels = uniqBy(
        [
          ...(prev ?? []),
          ...res.channels.map((item, idx) => ({
            ...item,
            messages: [],
            // lastUpdated: msgs[idx]._updatedAt,
            // lastMessage: msgs[idx].msg,
          })),
        ],
        (item) => item._id,
      );

      convertedChannels.sort(
        (a, b) => dayjs(b.ts).valueOf() - dayjs(a.ts).valueOf(),
      );

      if (!activeChannelId) {
        setActiveChannelId(convertedChannels[0]._id);
      }

      return convertedChannels;
    });
  };

  const fetchMessages = async (channelId: string, offset = 0) => {
    setLoading(true);
    const res = await callApiGetMessages(channelId, offset);
    const currentChannel = channels?.find((c) => c._id === channelId);
    if (!currentChannel) return;

    const convertedMessage = res?.messages.map((item) => ({
      id: item._id,
      text: item.msg ?? 'trungluc',
      sender:
        item.alias === 'admin@drm.com' || item.alias === 'AI BOT'
          ? 'admin'
          : 'user',
      time: item._updatedAt,
    }));

    currentChannel.messages = sortBy(
      uniqBy(
        [...currentChannel.messages, ...(convertedMessage ?? [])],
        (item) => item.id,
      ),
      (item) => new Date(item.time).getTime(),
    );

    setChannels([...(channels ?? [])]);
    setLoading(false);
  };

  const sendMessage = async (text: string) => {
    const activeUserId = channels?.find((c) => c._id === activeChannelId)?.name;
    activeUserId && (await callApiSendMessage(activeUserId, text));

    fetchMessages(activeChannelId!, 0).then(onMessage);
    fetchChannels();
  };

  useEffect(() => {
    fetchChannels(0);
  }, []);

  useEffect(() => {
    activeChannelId && fetchMessages(activeChannelId, 0);
  }, [activeChannelId]);

  const changeActiveChannel = (id: string) => {
    setActiveChannelId(id);
    fetchMessages(id);
  };

  const fetchMoreMessages = () =>
    fetchMessages(activeChannelId!, activeChannel?.messages.length ?? 0);

  useSubscription('/chat/topic/public/cms', (msg) => {
    const incomingChannelId = channels?.find((c) => c.name === msg.body)?._id;
    incomingChannelId && fetchMessages(incomingChannelId, 0).then(onMessage);
    fetchChannels(0);
  });

  console.log(
    channels?.map((c) => ({ name: c.u.name, lastUpdate: c._updatedAt })),
  );

  return {
    channels: sortBy(channels, (c) => dayjs(c._updatedAt).valueOf()),
    messages: activeChannel?.messages,
    changeActiveChannel,
    fetchMoreMessages,
    loading,
    sendMessage,
    fetchMoreChannel: () => fetchChannels(channels?.length ?? 0),
    activeUser: {
      fullName: activeChannel?.u.name ?? '-',
      // email: activeChannel?.u.
    },
  };
}
