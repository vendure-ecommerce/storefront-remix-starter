import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ModalProvider, useModal } from './modal-context';
import clsx from 'clsx';
import React, { Fragment, PropsWithChildren } from 'react';

type ModalProps = {
  isOpen: boolean;
  close: () => void;
  size?: 'small' | 'medium' | 'large';
  afterClose?: () => void;
  afterOpen?: () => void;
};

const Modal: React.FC<PropsWithChildren<ModalProps>> & {
  Title: React.FC<PropsWithChildren>;
  Description: React.FC<PropsWithChildren>;
  Body: React.FC<PropsWithChildren>;
  Footer: React.FC<PropsWithChildren>;
} = ({ isOpen, close, size = 'medium', children, afterClose, afterOpen }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[75]" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterEnter={afterOpen}
          afterLeave={afterClose}
        >
          <div className="fixed inset-0 bg-gray-700 bg-opacity-75 backdrop-blur-sm" />
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
                className={clsx(
                  'flex flex-col justify-start w-full h-full overflow-auto transform bg-white p-10 text-left align-middle shadow-xl transition-all',
                  {
                    'max-w-md': size === 'small',
                    'max-w-xl': size === 'medium',
                    'max-w-3xl': size === 'large',
                  },
                )}
              >
                <ModalProvider close={close}>{children}</ModalProvider>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const Title: React.FC<PropsWithChildren> = ({ children }) => {
  const { close } = useModal();

  return (
    <Dialog.Title className="flex items-center justify-between">
      <div className="text-large-semi">{children}</div>
      <div>
        <button onClick={close} type="button">
          {/* <X size={20} /> */}
          <XMarkIcon className="w-6 h-6"></XMarkIcon>
        </button>
      </div>
    </Dialog.Title>
  );
};

const Description: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Dialog.Description className="flex text-small-regular text-gray-700 items-center justify-center pt-2 pb-4 h-full">
      {children}
    </Dialog.Description>
  );
};

const Body: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex-1">{children}</div>;
};

const Footer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex items-center justify-end gap-x-4">{children}</div>
  );
};

Modal.Title = Title;
Modal.Description = Description;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
