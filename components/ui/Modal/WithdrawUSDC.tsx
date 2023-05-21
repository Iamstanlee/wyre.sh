import * as Yup from 'yup';
import { useState } from 'react';
import { X } from '@phosphor-icons/react';
import { Form, Formik, FormikProps } from 'formik';
import { Chain, MoneyCurrencyEnum } from '@circle-fin/circle-sdk';

import { WithdrawUSDCModal } from '@/types';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './Modal.module.css';
import useCircle from '@/utils/use-circle';
import LinkCreatedSuccess from './LinkCreatedSuccess';
import Select from '../Select/Select';

interface ISubmit {
  address: string;
  amount: string;
  chain: Chain;
}

const WithdrawUSDC = ({
  open,
  handleCloseWithdrawUSDCModal
}: WithdrawUSDCModal) => {
  const { createCryptoPayment } = useCircle();
  //   const [formError, setFormError] = useState<string | null>();
  //   const [data, setData] = useState<string | null>('');

  const submitForm = async (values: ISubmit) => {
    
    createCryptoPayment({
      destination: {
        // address shoulf be in uuid format, i don't think it's the user address
        address: values.address,
        addressTag: '',
        chain: values.chain
      },
      amount: {
        amount: values.amount,
        currency: values.chain
      }
    });
  };

  return (
    <div
      className={open ? 'min-h-screen visible fixed' : 'hidden'}
      style={{ zIndex: 999 }}
    >
      <div
        className="hidden sm:block fixed inset-0 bg-opacity-40 transition-opacity bg-black"
        onClick={handleCloseWithdrawUSDCModal}
      />
      <div className="fixed top-0 sm:top-0 inset-y-0 right-0 z-20 w-full sm:w-3/4 md:w-1/2 overflow-y-auto overflow-x-hidden">
        <div className="modal-inner min-h-full bg-white px-4 sm:px-10 py-10 w-full text-darkGrey">
          <div className="flex items-center justify-between text-black">
            <h3 className="text-xl sm:text-2xl font-medium">
              Withdraw your USDC
            </h3>
            <Button
              className={styles.close}
              onClick={handleCloseWithdrawUSDCModal}
            >
              <X weight="bold" />
            </Button>
          </div>
          <p className="pt-9 pb-6">
            To widthdraw your USDC to your wallte, fill form below. Make sure
            the wallet address is correct.
          </p>
          <Formik
            initialValues={{
              address: '',
              amount: '',
              chain: ''
            }}
            onSubmit={(values: ISubmit, { setSubmitting }) => {
              submitForm(values).then((_) => setSubmitting(false));
            }}
            validationSchema={Yup.object().shape({
              address: Yup.string().required('Please enter a wallet address'),
              amount: Yup.string().required('Please enter an amount'),
              chain: Yup.string().required('Select a chain')
            })}
          >
            {(props: FormikProps<ISubmit>) => {
              const { values, handleBlur, handleChange, isSubmitting } = props;

              return (
                <Form className="flex flex-col gap-8">
                  {/* {formError && <p className="text-red-500">{formError}</p>} */}

                  <Input
                    title="Destination account"
                    id="address"
                    placeholder="0xf1g8nujejb9d7w"
                    name="address"
                    type="text"
                    optional={false}
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Select
                    title="Chain"
                    id="chain"
                    name="chain"
                    options={[
                      { item: 'ETH', value: 'ETH' },
                      { item: 'BTC', value: 'BTC' }
                    ]}
                    optional={false}
                    value={values.chain}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Input
                    title="Amount"
                    id="amount"
                    placeholder="50.00"
                    name="amount"
                    type="text"
                    // user balance shows here
                    note="Balance: 200 USDC"
                    optional={false}
                    value={values.amount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <Button
                    loading={isSubmitting}
                    variant="slim"
                    type="submit"
                    className="w-full"
                  >
                    Send to address
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default WithdrawUSDC;
