import LLCMyServiceContent from "./LLCMyServiceContent";
import { LLCMyServiceProvider } from "./context/llcMyServiceContext";

export default function LLCMyService() {
  return (
    <>
      <LLCMyServiceProvider>
        <LLCMyServiceContent />
      </LLCMyServiceProvider>
    </>
  );
}
