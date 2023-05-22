import * as Yup from 'yup';
import { X } from '@phosphor-icons/react';
import { Form, Formik, FormikProps } from 'formik';
import { Chain } from '@circle-fin/circle-sdk';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './Modal.module.css';
import useCircle from '@/utils/use-circle';
import Select from '../Select/Select';
import { useToast } from '@/utils/use-toast';
import { useUser } from '@/utils/use-user';

interface ISubmit {
  address: string;
  amount: string;
  chain: Chain;
}

interface Props {
  isOpen: boolean;
  close: () => void;
}

const WithdrawUSDCModal = ({ isOpen, close }: Props) => {
  const { createCryptoPayment } = useCircle();
  const { show } = useToast();
  const { strWalletBalance, wallet } = useUser();

  const submitForm = async (values: ISubmit) => {
    try {
      await createCryptoPayment({
        destination: {
          addressTag: '',
          address: values.address,
          chain: values.chain
        },
        amount: {
          amount: values.amount,
          currency: values.chain
        }
      });
    } catch (e) {
      show('An unexpected error occured');
    }
  };

  return (
    <div
      className={isOpen ? 'min-h-screen visible fixed' : 'hidden'}
      style={{ zIndex: 999 }}
    >
      <div
        className='hidden sm:block fixed inset-0 bg-opacity-40 transition-opacity bg-black'
        onClick={close}
      />
      <div
        className='fixed top-0 sm:top-0 inset-y-0 right-0 z-20 w-full sm:w-3/4 md:w-1/2 overflow-y-auto overflow-x-hidden'>
        <div className='modal-inner min-h-full bg-white px-4 sm:px-10 py-10 w-full text-darkGrey'>
          <div className='flex items-center justify-between text-black'>
            <h3 className='text-xl sm:text-2xl font-medium'>
              Withdraw your USDC
            </h3>
            <Button
              className={styles.close}
              onClick={close}
            >
              <X weight='bold' />
            </Button>
          </div>
          <p className='pt-9 pb-6'>
            Fill form below. Make sure
            the wallet address is correct.
          </p>
          <Formik
            initialValues={{
              address: '',
              amount: '',
              chain: Chain.Eth as Chain
            }}
            onSubmit={(values: ISubmit, { setSubmitting }) => {
              submitForm(values).then((_) => setSubmitting(false));
            }}
            validationSchema={Yup.object().shape({
              address: Yup.string().required('Please enter a wallet address'),
              amount: Yup.number().max(wallet?.balance ?? 0).required(),
              chain: Yup.string().required('Select a chain')
            })}
          >
            {(props: FormikProps<ISubmit>) => {
              const { values, handleBlur, handleChange, isSubmitting } = props;

              return (
                <Form className='flex flex-col gap-8'>
                  <Select
                    title='Chain'
                    id='chain'
                    name='chain'
                    options={Object.values(Chain).map((chain) => ({
                      item: chain,
                      value: chain
                    }))}
                    optional={false}
                    value={values.chain}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Input
                    title='Destination account'
                    id='address'
                    placeholder='0x00'
                    name='address'
                    type='text'
                    optional={false}
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Input
                    title='Amount'
                    id='amount'
                    placeholder='0.00'
                    name='amount'
                    type='text'
                    note={`Available balance: ${strWalletBalance} USDC`}
                    optional={false}
                    value={values.amount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <Button
                    loading={isSubmitting}
                    variant='slim'
                    type='submit'
                    className='w-full'
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
export default WithdrawUSDCModal;
