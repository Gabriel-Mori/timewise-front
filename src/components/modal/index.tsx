import React, { createContext, useCallback, useContext, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import * as uuidv4 from 'uuid';
import useAppData from '~/hooks/useAppData';
import { UtilUID } from '~/web/helpers/util-uuid';

interface ModalProps {
  template: (instance?: ModalInstance) => JSX.Element;
  title?: string;
  uuid?: string;
  hiddenCloseBtn?: boolean;
  titleClassName?: string;
  onClose?: (data?: any) => void;
}

export interface ModalInstance {
  close: (data?: any) => void;
  closeAll: () => void;
}

interface Props {
  open?: (props: ModalProps) => void;
  modals?: any[];
}

const Context = createContext<Props>({});

export const useModal = (): Props => {
  return useContext(Context);
};

const ModalContext: React.FC<Props> = ({ children }) => {
  const [modals, setModals] = useState<{ modal?: ModalProps; instance: ModalInstance }[]>([]);

  const close = (modal: ModalProps, data?: any) => {
    setModals([...modals.filter((m) => m.modal.uuid !== modal.uuid)]);
    if (modal.onClose) {
      modal.onClose(data);
    }
  };

  const closeAll = () => {
    modals.forEach((modal) => {
      modal.instance.close();
    });
  };

  const open = useCallback(
    (props: ModalProps) => {
      const modal = { uuid: UtilUID.generate(), ...props };
      const instance = {
        close: (data: any) => close(modal, data),
        closeAll: () => closeAll(),
      } as ModalInstance;

      setModals([
        ...modals,
        {
          modal,
          instance,
        },
      ]);

      return instance;
    },
    [modals],
  );

  const Modal = ({ modal, instance }: { modal?: ModalProps; instance: ModalInstance }) => {
    const { theme, changeTheme } = useAppData();

    return (
      <div
        className={`h-screen w-full flex items-center ${
          theme == 'dark' ? 'bg-modal-dark' : 'bg-modal-bg'
        }  justify-center fixed z-50 p-4`}
      >
        <div
          onClick={(e) => {
            // setPlugPayModal(false);
            instance.close();
          }}
          className="fixed inset-0 z-10"
        ></div>
        <div
          className={`flex flex-col max-h-full ${
            theme == 'dark' ? 'bg-gray-dark text-gray-ultra-light' : 'bg-gray-ultra-light'
          }  px-8 py-4 inset-0 z-20 rounded-md`}
          style={{ minWidth: 400, maxWidth: '80%' }}
        >
          <div className="flex items-center justify-between mb-4">
            {modal.title && (
              <h1
                className={` mr-3
              ${
                modal.titleClassName?.includes('text-gray')
                  ? ''
                  : ` ${theme == 'dark' ? 'text-gray-ultra-light' : 'text-gray-ultra-dark'}`
              } 
              ${modal.titleClassName?.includes('font-') ? '' : 'font-bold'} 
              ${modal.titleClassName?.includes('text-') ? '' : 'text-2xl'} 
              ${modal.titleClassName}`}
              >
                <span>{modal.title}</span>
              </h1>
            )}
            {!modal.hiddenCloseBtn && (
              <button
                type="button"
                className={`${theme == 'dark' ? 'text-gray-ultra-light' : 'text-gray-ultra-dark'}`}
                onClick={() => close(modal)}
              >
                <FaTimes />
              </button>
            )}
          </div>
          <div className="flex-1 overflow-y-auto overflow-x-hidden">{modal.template(instance)}</div>
        </div>
      </div>
    );
  };

  return (
    <Context.Provider value={{ open, modals }}>
      {modals.map((item) => (
        <Modal {...item} key={item.modal.uuid} />
      ))}
      {children}
    </Context.Provider>
  );
};

export default ModalContext;
