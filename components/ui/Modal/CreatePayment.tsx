import * as Yup from 'yup';
import { useState } from 'react';
import { X } from '@phosphor-icons/react';
import { Form, Formik, FormikProps } from 'formik';

import { CreatePaymentModal } from '@/types';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './Modal.module.css';
import useCircle from '@/utils/use-circle';
import LinkCreatedSuccess from './LinkCreatedSuccess';

interface ISubmit {
  name: string;
  amount: string;
  description: string;
}

const CreatePayment = ({
  open,
  handleCloseCreatePaymentModal
}: CreatePaymentModal) => {
  // const { createPaymentLink } = useCircle();
  const [formError, setFormError] = useState<string | null>();
  const [data, setData] = useState<string | null>('');

  const [openLinkCreatedModall, setOpenLinkCreatedModal] = useState(false);

  const handleCloseLinkCreatedModal = () => {
    setOpenLinkCreatedModal(false);
    handleCloseCreatePaymentModal();
  };

  // const submitForm = async (values: ISubmit) => {
  //   const result = await createPaymentLink(
  //     values.name,
  //     values.amount,
  //     values.description
  //   );
  //
  //   if (result?.error) {
  //     setFormError(result.error);
  //   } else {
  //     setData(result?.data?.link);
  //     setOpenLinkCreatedModal(true);
  //     // show dailogue with payment link and copy button
  //   }
  // };

  return (
    <div
      className={open ? 'min-h-screen visible fixed' : 'hidden'}
      style={{ zIndex: 999 }}
    >
      <div
        className="hidden sm:block fixed inset-0 bg-opacity-40 transition-opacity bg-black"
        onClick={handleCloseCreatePaymentModal}
      />
      <div className="fixed top-0 sm:top-0 inset-y-0 right-0 z-20 w-full sm:w-3/4 md:w-1/2 overflow-y-auto overflow-x-hidden">
        <div className="modal-inner min-h-full bg-white px-4 sm:px-10 py-10 w-full text-darkGrey">
          <div className="flex items-center justify-between text-black">
            <h3 className="text-xl sm:text-2xl font-medium">
              Create a Payment Link
            </h3>
            <Button
              className={styles.close}
              onClick={handleCloseCreatePaymentModal}
            >
              <X weight="bold" />
            </Button>
          </div>
          <p className="pt-9 pb-6">
            To receive payments from your customers, fill form below to create a
            payment link youncan send to your customers
          </p>
          <Formik
            initialValues={{
              name: '',
              amount: '',
              description: ''
            }}
            onSubmit={(values: ISubmit, { setSubmitting }) => {
              // submitForm(values).then((_) => setSubmitting(false));
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required('Please enter your name'),
              amount: Yup.string().required('Please enter an amount'),
              description: Yup.string().required(
                'Please enter a valid description'
              )
            })}
          >
            {(props: FormikProps<ISubmit>) => {
              const {
                values,
                handleBlur,
                handleChange,
                isSubmitting
              } = props;

              return (
                <Form className="flex flex-col gap-8">
                  {formError && <p className="text-red-500">{formError}</p>}

                  <Input
                    title="Recipient Name"
                    id="name"
                    placeholder="John Doe"
                    name="name"
                    type="text"
                    optional={false}
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Input
                    title="Amount"
                    id="amount"
                    placeholder="50.00"
                    name="amount"
                    type="text"
                    optional={false}
                    value={values.amount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Input
                    title="Description"
                    id="description"
                    placeholder="Payment for goods and services"
                    name="description"
                    type="text"
                    optional={false}
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Button
                    loading={isSubmitting}
                    variant="slim"
                    type="submit"
                    className="w-full"
                  >
                    Create Payment Link
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>

      <LinkCreatedSuccess
        link={data}
        open={openLinkCreatedModall}
        handleCloseLinkCreatedModal={handleCloseLinkCreatedModal}
      />
    </div>
  );
};
export default CreatePayment;
