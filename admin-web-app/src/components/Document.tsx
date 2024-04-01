import { useTranslation } from 'react-i18next';
import { IconUpload } from './icons';
import { useState } from 'react';

export function Document() {
  const transition = useTranslation();

  const [files, setFiles] = useState([
    {
      fileName: 'abc.xyz',
    },
    {
      fileName: 'aaaa.xyz',
    },
  ]);

  return (
    <div className={'p-6 rounded-xl border border-gray-200'}>
      <div
        className={
          'flex justify-center rounded-lg border border-primary p-4 items-center cursor-pointer mb-4'
        }
      >
        <input
          accept="*"
          id="icon-button-file"
          type="file"
          style={{ display: 'none' }}
        />
        <label htmlFor="icon-button-file" className={'flex gap-4 items-center'}>
          <IconUpload />
          <span className={'text-primary font-bold'}>
            {transition.t('Upload')}
          </span>
        </label>
      </div>
      <div className={'flex flex-col gap-4'}>
        {files.map((file) => (
          <div
            className={
              'flex justify-between rounded-lg border border-gray-300 px-4 py-2 items-center cursor-pointer'
            }
          >
            <span className={'font-bold'}>{file.fileName}</span>
            <button
              className="w-[100px] h-[50px] flex justify-center items-center gap-2 bg-primary text-white font-semibold rounded-lg py-2"
              onClick={() => {}}
            >
              {transition.t('Download')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
