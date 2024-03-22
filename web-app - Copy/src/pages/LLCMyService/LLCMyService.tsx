import LLCMyServiceContent from "./LLCMyServiceContent";
import { LLCMyServiceProvider } from "./context/llcMyServiceContext";

export default function LLCMyService() {
  return (
    <>
    ok
      <LLCMyServiceProvider>
        <LLCMyServiceContent />
      </LLCMyServiceProvider>
    </>
  );
}
