import { useEffect, useState } from "react";
import { getFile } from "../../api/upload";

export function useGetImage(name: string){
  const [blobUrl, setBlobUrl] = useState<string>()

  useEffect(() => {
    const fn = async () => {
      const blob = await getFile(name, { download: false });
      blob && setBlobUrl(URL.createObjectURL(blob))
    }
  
  }, [])
  

}