import { FC, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import MyButton from "./MyButton";

interface IProps {
  visible: boolean;
  onEnded: (result: boolean | undefined) => void;

  title: string;
  rightButtonText: string;
  leftButtonText: string;
  children: React.ReactNode;
}

const MyModal: FC<IProps> = props => {
  const closeHandler = (result: boolean | undefined) => {
    props.onEnded(result);
  };

  return (
    <Transition appear show={props.visible} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => closeHandler(undefined)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="flex w-full max-w-md transform flex-col gap-5
                           overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  {props.title}
                </Dialog.Title>

                {props.children}

                <div className="mt-4 flex items-center gap-6">
                  <MyButton onClick={() => closeHandler(false)}>{props.leftButtonText}</MyButton>
                  <MyButton onClick={() => closeHandler(true)}>{props.rightButtonText}</MyButton>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MyModal;
