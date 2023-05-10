import { useState } from 'react';
import { X, Copy, ShareFat, CheckCircle } from '@phosphor-icons/react';

import { LinkCreatedModal } from '@/types';
import { copyToClipboard } from '@/utils/copy-to-clipboard';
import Button from '../Button/Button';
import styles from './Modal.module.css';
import Toasts from '../Toasts/Toasts';

const LinkCreatedSuccess = ({
  open,
  handleCloseLinkCreatedModal,
  link
}: LinkCreatedModal) => {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <div
      className={open ? 'min-h-screen visible fixed' : 'hidden'}
      style={{ zIndex: 999 }}
    >
      <div
        className=" fixed inset-0 bg-opacity-40 transition-opacity bg-black"
        onClick={handleCloseLinkCreatedModal}
      />
      <div className="fixed inset-0 m-auto z-20 w-full max-w-sm h-fit rounded bg-white px-4 sm:px-8 pb-10 w-full text-darkGrey">
        <div className="flex items-center justify-end text-black">
          <Button
            className={`${styles.close} -mr-4 sm:-mr-8`}
            onClick={handleCloseLinkCreatedModal}
          >
            <X weight="bold" />
          </Button>
        </div>
        <CheckCircle size={64} className="mx-auto text-success"  />
        <h3 className="text-xl sm:text-2xl text-center font-medium pt-6 pb-3 text-black">
          Payment Link Created
        </h3>
        <p className="pb-6 text-center text-sm">
          Copy the link and share to your customer
        </p>

        <div className="mt-2 flex flex-col items-center gap-4">
          <p className="mx-auto w-fit px-3 py-1 bg-primary rounded-full text-white text-sm">
            https://xula.com/pay/{link}
          </p>
          <Copy
            size={20}
            weight="bold"
            onClick={async () => {
              setIsCopied(
                await copyToClipboard(`https://xula.com/pay/${link}`)
              );

              setTimeout(() => setIsCopied(false), 3000);
            }}
          />
        </div>
      </div>
      {isCopied && <Toasts variant="info" show={isCopied} message="copied" />}
    </div>
  );
};
export default LinkCreatedSuccess;
