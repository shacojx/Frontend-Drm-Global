import {useEffect, useState} from "react";
import {callApiGetCMSToken} from "../api/chat";

type Props = {};
type Response = {}

export function SupportContent(props: Props) {
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    callApiGetCMSToken().then((response) => {
      // @ts-ignore
      if (response?.success) {
        // @ts-ignore
        setAuthToken(response?.data?.authToken)
      }
    });
  }, []);

  useEffect(() => {
    if (authToken) {
      window.parent.postMessage(
        {
          event: 'login-with-token',
          loginToken: authToken
        },
        'https://chat.drmsglobal.ai'
      );
    }
  }, [authToken]); // Ensure the effect runs whenever the authToken changes


  return <div className={"w-full grow flex flex-col p-3"}>
    <div
      className={"flex flex-col grow overflow-x-hidden overflow-y-scroll bg-white rounded justify-start items-center py-6 px-4 sm:px-8"}>
      {authToken !== "" && <iframe
          className={"w-full h-full"}
          id="chat"
          frameBorder="1"
          src="https://chat.drmsglobal.ai?layout=embedded"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />}

    </div>
  </div>
}
