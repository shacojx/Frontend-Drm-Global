import dayjs from 'dayjs';
import { useContext, useEffect, useRef, useState } from 'react';
import { getFile } from 'src/api/upload';
import IMAGES from 'src/assets/images';
import { IconArrowUp, IconSpinner, IconUser } from 'src/components/icons';
import { AuthContext } from 'src/contexts/AuthContextProvider';
import { useChat } from 'src/hooks-api/useChat';

export function SupportContent() {
  const { user } = useContext(AuthContext);

  const [avatarUrl, setAvatarUrl] = useState<string>();

  useEffect(() => {
    if (!user?.avatar) return;

    const fetchAvatar = async () => {
      const blob = await getFile(user?.avatar, { download: false });
      blob && setAvatarUrl(URL.createObjectURL(blob));
    };

    fetchAvatar();
  }, [user?.avatar]);

  const inputRef = useRef<HTMLInputElement>(null);

  const [needScrollBottom, setNeedScrollBottom] = useState(true);

  const { messages, sendMessage, fetchMore, loading } = useChat({
    onMessage: () => setNeedScrollBottom(true),
  });

  const handleSendMessage = async () => {
    const text = inputRef.current?.value;
    if (!text) return;

    inputRef.current.value = '';
    await sendMessage(text);

    setNeedScrollBottom(true);
  };

  return (
    <div className="flex w-full flex-col border-t border-l h-full px-2">
      <div
        className="grow h-[calc(100%-118px)] overflow-y-scroll"
        onScroll={(e) => {
          if (e.currentTarget.scrollTop === 0) {
            fetchMore();
          }
        }}
        ref={(node) => {
          node?.scrollBy({ top: 1 });
        }}
      >
        {!messages?.length && (
          <div className="h-full my-auto flex justify-center items-center flex-col gap-4 min-h-full">
            <img src={IMAGES.support} className="size-[70px]" />
            <div>How can I help you today?</div>
          </div>
        )}

        <div className="w-full max-w-4xl mx-auto overscroll-y-auto py-4 min-h-full">
          {loading && (
            <div className="flex justify-center items-center">
              <IconSpinner /> <span>Loading...</span>
            </div>
          )}
          {messages?.map((message) =>
            message.sender === 'admin' ? (
              <AdminMessage key={message.id} message={message.text} time={message.time} />
            ) : (
              <UserMessage
                key={message.id}
                message={message.text}
                time={message.time}
                fullName={`${user?.firstName} ${user?.lastName}`}
                avatarUrl={avatarUrl}
              />
            )
          )}
          {messages?.length ? (
            <div
              ref={(node) => {
                if (node && needScrollBottom) {
                  console.log('scrollBottom');
                  node.scrollIntoView();
                  setNeedScrollBottom(false);
                }
              }}
            />
          ) : null}
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
  );
}

type AdminMessageProps = {
  message: string;
  time: string;
};

function AdminMessage({ message, time }: AdminMessageProps) {
  return (
    <div className="flex items-start gap-[14px] shrink-0 mt-4">
      <img className="size-[50px]" src={IMAGES.supportLogo} />

      <div className="flex flex-col grow gap-3">
        <div className="flex gap-4 items-center">
          <span className="font-medium">AI assistant</span>
          <span className="text-sm text-surface">{dayjs(time).format('HH:mm A')}</span>
        </div>
        <div className="border border-stroke max-w-[70%] bg-[#fff] px-6 py-4 rounded-[14px] rounded-tl-none w-max">
          {message}
        </div>
      </div>
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
      <div className="flex flex-col grow gap-3 items-end">
        <div className="flex gap-4 items-center">
          <span className="text-sm text-surface">{dayjs(time).format('HH:mm A')}</span>
          <span className="font-medium">{fullName}</span>
        </div>
        <div className="border border-stroke max-w-[70%] bg-[#fff] px-6 py-4 rounded-[14px] rounded-tr-none">
          {message}
        </div>
      </div>

      <div className="bg-slate-500 rounded-full size-[50px] aspect-square overflow-hidden">
        {avatarUrl ? <img className="object-cover w-full h-full" src={avatarUrl} /> : <IconUser />}
      </div>
    </div>
  );
}
