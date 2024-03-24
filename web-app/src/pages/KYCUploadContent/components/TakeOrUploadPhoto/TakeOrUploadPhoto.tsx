import React, { ChangeEvent, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { IconCamera, IconCheck, IconUpload, IconUploadFile } from 'src/components/icons';

type TakeOrUploadPhotoProps = {
    onUpload: (file: File | null) => void;
}

export default function TakeOrUploadPhoto(props: TakeOrUploadPhotoProps) {
    const translation = useTranslation()
    const uploadFileRef = useRef<HTMLInputElement | null>(null)
    const [fileName, setFileName] = useState<string>()

    function handleClickUpload() {
        if (uploadFileRef) {
            uploadFileRef.current?.click()
        }
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setFileName(file.name)
            props.onUpload(file)
        }
    }

    return <div className={"w-full flex flex-col items-center border border-primary_light rounded-xl px-2 py-6"}>
        {!fileName
            ? <div className={"rounded-full bg-primary_light p-4"}>
                <IconUploadFile />
            </div>
            : <div className={"flex flex-row gap-2 items-center"}>
                <IconCheck className={"w-14 h-14 text-success"} />
                <p className={"text-h4"}>{fileName}</p>
            </div>
        }
        <div className={"flex flex-row gap-4 my-4"}>
            <div className={"py-4 px-6 flex flex-row gap-3 border rounded-lg cursor-pointer"}>
             <IconCamera className={"text-gray-400"}/>
             <p className={"font-bold"}>{translation.t('Take a photo')}</p>
            </div>
            <div className={"py-4 px-6 flex flex-row gap-3 bg-primary rounded-lg cursor-pointer"} onClick={handleClickUpload}>
                <IconUpload className={"text-white"} />
                <input ref={uploadFileRef} className={"hidden"} type="file" accept="application/pdf" onChange={handleChange} />
                <p className={"text-white font-bold"}>{translation.t('Upload file')}</p>
            </div>
        </div>
        <ul className={"list-disc flex flex-col items-center"}>
            <li>{translation.t('All corners of the passport are visible against the backdrop')}</li>
            <li>{translation.t('All passport data is legible')}</li>
            <li>{translation.t('The photo is in color and should be a valid file (PDF)')}</li>
            <li>{translation.t('Maximum allowed size is 10MB')}</li>
        </ul>
    </div>
}