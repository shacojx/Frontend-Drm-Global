import { useRef, useState } from 'react';
import { IconArrowUp, IconSpinner, IconUser } from '../components/icons';
import { useChat } from '../hooks/api/chat';
import dayjs from 'dayjs';

export function SupportContent() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [needScrollBottom, setNeedScrollBottom] = useState(true);

  const {
    channels,
    messages,
    changeActiveChannel,
    fetchMoreMessages,
    loading,
    sendMessage,
    fetchMoreChannel,
    activeUser
  } = useChat({
    onMessage: () => setNeedScrollBottom(true),
  });

  const handleSendMessage = async () => {
    const text = inputRef.current?.value;
    if (!text) return;

    inputRef.current.value = '';
    await sendMessage(text);

    setNeedScrollBottom(true);
  };

  console.log(messages)

  return (
    <>
      <div
        className="w-1/3 shrink-0 overflow-y-auto border-l bg-white"
        onScroll={(e) => {
          const isScrolledToBottom =
            e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
            e.currentTarget.clientHeight;
          if (isScrolledToBottom) {
            fetchMoreChannel();
          }
        }}
      >
        {channels?.map((channel) => (
          <div
            key={channel._id}
            className="bg-white p-4 border-b border-gray-200 cursor-pointer"
            onClick={() => changeActiveChannel(channel._id)}
          >
            <div className="font-semibold mb-2">{channel.u.name}</div>
            <div className="text-sm text-gray-500">
              {dayjs(channel._updatedAt).format('HH:mm A, DD/MM/YYYY')}
            </div>
          </div>
        ))}
      </div>

      <div className="flex w-full flex-col border-t border-l h-full bg-white px-2">
        <div
          className="grow h-[calc(100%-118px)] overflow-y-scroll"
          onScroll={(e) => {
            if (e.currentTarget.scrollTop === 0) {
              fetchMoreMessages();
            }
          }}
          ref={(node) => {
            node?.scrollBy({ top: 1 });
          }}
        >
          <div className="w-full max-w-4xl mx-auto overscroll-y-auto py-4">
            {loading && (
              <div className="flex items-center justify-center gap-4">
                <IconSpinner />
                <span>Loading...</span>
              </div>
            )}
            {messages?.map((message) =>
              message.sender === 'admin' ? (
                <AdminMessage
                  key={message.id}
                  message={message.text}
                  time={message.time}
                />
              ) : (
                <UserMessage
                  key={message.id}
                  message={message.text}
                  time={message.time}
                  fullName={activeUser.fullName}
                  // avatarUrl={}
                />
              ),
            )}
            {messages && (
              <div
                ref={(node) => {
                  if (node && needScrollBottom) {
                    console.log('scrollBottom');
                    node.scrollIntoView();
                    setNeedScrollBottom(false);
                  }
                }}
              />
            )}
          </div>
        </div>

        <div className="flex p-6 justify-center items-center">
          <div className="max-w-4xl flex rounded-2xl border border-stroke w-full p-4 bg-white">
            <input
              ref={inputRef}
              className="grow outline-none bg-transparent"
              placeholder="Type a message"
              onKeyDown={async (e) => {
                if (e.key === 'Enter') {
                  await handleSendMessage();
                }
              }}
            />
            <button
              className="size-9 rounded-lg bg-surface flex justify-center items-center hover:bg-primary"
              onClick={handleSendMessage}
            >
              <IconArrowUp className="size-6" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

type AdminMessageProps = {
  message: string;
  time: string;
};

function AdminMessage({ message, time }: AdminMessageProps) {
  return (
    <div className="flex items-end gap-[14px] shrink-0 mt-4">
      <div className="flex flex-col grow gap-3 items-end">
        <div className="flex gap-4 items-center">
          <span className="text-sm text-surface">
            {dayjs(time).format('HH:mm A')}
          </span>
          <span className="font-medium">AI assistant</span>
        </div>
        <div className="border border-stroke max-w-[70%] bg-[#fff] px-6 py-4 rounded-[14px] rounded-tl-none whitespace-pre-wrap">
          {message}
        </div>
      </div>

      {/* <img className="size-[50px]" src={IMAGES.supportLogo} /> */}
      {/* <div className="size-[50px] shrink-0 bg-rose-200" /> */}
    </div>
  );
}

type UserMessageProps = {
  message: string;
  time: string;
  fullName: string;
  avatarUrl?: string;
};

function UserMessage({ message, time, fullName, avatarUrl }: UserMessageProps) {
  return (
    <div className="flex items-start gap-[14px] shrink-0 mt-4">
      <div className="bg-slate-500 rounded-full size-[50px] aspect-square flex justify-center items-center">
        {avatarUrl ? (
          <img className="object-cover" src={avatarUrl} />
        ) : (
          <IconUser />
        )}
      </div>

      <div className="flex flex-col grow gap-3 items-start">
        <div className="flex gap-4 items-center">
          <span className="font-medium">{fullName}</span>
          <span className="text-sm text-surface">
            {dayjs(time).format('HH:mm A')}
          </span>
        </div>
        <div className="border border-stroke max-w-[70%] bg-[#fff] px-6 py-4 rounded-[14px] rounded-tr-none">
          {message}
        </div>
      </div>
    </div>
  );
}
