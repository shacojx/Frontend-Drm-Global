
import { Fragment, PropsWithChildren, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

type Props = PropsWithChildren<Partial<{
  isCloseOnClickOverlay: boolean,
  isTransparent: boolean,
  isAutoSize: boolean,
  onClose: (isOpen: boolean) => void,
}>>
export function DialogContainer(props: Props) {
  const [open, setOpen] = useState(true)

  const cancelButtonRef = useRef(null)
  const handleClickOverlay = props.isCloseOnClickOverlay
    ? props.onClose
      ? (isOpen: boolean) => {setOpen(isOpen); props.onClose?.(isOpen);}
      : setOpen
    : () => {}

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={handleClickOverlay}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className={
                (props.isTransparent ? "" : "shadow-xl bg-white ")
                + (props.isAutoSize ? "" : "sm:w-full sm:max-w-lg ")
                + "relative transform overflow-hidden rounded-3xl text-left transition-all sm:my-8"
              }>
                {props.children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

