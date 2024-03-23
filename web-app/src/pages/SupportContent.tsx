type Props = {}

export function SupportContent(props: Props) {
  return <iframe
    className={"w-full h-full"}
    id="chatbot"
    src="http://222.255.117.238:3000/livechat"
    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
  />
}
