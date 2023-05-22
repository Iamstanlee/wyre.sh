import { createContext, useContext, useEffect, useState } from 'react';
import { Toast } from '@/types';


type ToastContext = {
  isOpen: boolean;
  message?: string;
  variant?: Toast['variant'];
  show: (message: string, type?: Toast['variant']) => void;
};

const Context = createContext<ToastContext | undefined>(undefined);

export interface Props {
  [propName: string]: any;
}

export default function ToastProvider(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<string | undefined>();
  const [variant, setVariant] = useState<Toast['variant'] | undefined>();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    }
  }, [isOpen]);


  const show = (message: string, type: Toast['variant'] = 'info') => {
    if (isOpen) {
      setIsOpen(false);
    }
    setMessage(message);
    setVariant(type);
    setIsOpen(true);
  };


  return <Context.Provider value={{ show, isOpen, message, variant }} {...props} />;
}

export const useToast = () => {
  let context = useContext(Context);

  if (context === undefined) {
    throw new Error('useToast must be used inside ToastProvider');
  }

  return context;
};