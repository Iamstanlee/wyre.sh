import * as Yup from 'yup';
import { Form, Formik, FormikProps } from 'formik';
import { CardInformation, PaymentLink } from '@/types';
import { exampleCards } from '@/data/mock';
import useCircle from '@/utils/use-circle';
import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import PaymentCreatedModal from '@/components/ui/Modal/PaymentCreatedModal';
import SvgIcon from '@/components/SvgIcon';
import { useToast } from '@/utils/use-toast';

interface Props {
  paymentLink: PaymentLink;
}

const PaymentCardComponent = ({ paymentLink }: Props) => {
  const { createCardPayment } = useCircle();
  const { show } = useToast();

  const [openPaymentCreatedModal, setOpenPaymentCreatedModal] = useState<boolean>(false);

  const handleClosePaymentCreatedModal = () => {
    setOpenPaymentCreatedModal(false);
  };

  const submitForm = async (values: CardInformation) => {
    try {
      await createCardPayment(
        values,
        paymentLink.metadata.user_id,
        paymentLink.slug
      );
      setOpenPaymentCreatedModal(true);
    } catch (e: unknown) {
      if (e instanceof Error) {
        show(e.message, 'danger');
      } else {
        show('An unexpected error occured', 'danger');
      }
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          amount: '',
          email: exampleCards[0].formData.email,
          name: exampleCards[0].formData.name,
          line1: exampleCards[0].formData.line1,
          district: exampleCards[0].formData.district,
          country: exampleCards[0].formData.country,
          city: exampleCards[0].formData.city,
          postalCode: exampleCards[0].formData.postalCode,
          expMonth: exampleCards[0].formData.expiry.month,
          expYear: exampleCards[0].formData.expiry.year,
          number: exampleCards[0].formData.cardNumber,
          cvv: exampleCards[0].formData.cvv,
          phoneNumber: exampleCards[0].formData.phoneNumber
        }}
        onSubmit={(values: CardInformation, { setSubmitting }) => {
          submitForm(values).then((_) => setSubmitting(false));
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Please enter your name'),
          email: Yup.string().required('Please enter your email address'),
          line1: Yup.string().required('Please enter an line1'),
          country: Yup.string().required('Please enter an country'),
          city: Yup.string().required('Please enter an city'),
          postalCode: Yup.string().required('Please enter a valid postalCode'),
          expMonth: Yup.string().required('Please enter an expMonth'),
          expYear: Yup.string().required('Please enter an expYear'),
          number: Yup.string().required('Please enter an number'),
          amount: Yup.number().required('Please enter an amount')
        })}
        validateOnChange={false}
      >
        {(props: FormikProps<CardInformation>) => {
          const {
            values,
            errors,
            handleBlur,
            handleChange,
            isSubmitting
          } = props;
          return (
            <Form className='w-full md:w-1/2 px-6 md:px-12 lg:px-28 py-10 md:pt-20'>
              <p className='text-grey text-sm sm:text-base pb-6'>
                Enter your card information to complete the payment
              </p>
              <div className='flex flex-col gap-6'>
                <Input
                  value={values.email}
                  id='email'
                  name='email'
                  title='Email Address'
                  placeholder='example@domain.com'
                  optional={false}
                  type='email'
                  className='w-1/3'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email}
                />
                <Input
                  value={values.amount}
                  id='amount'
                  name='amount'
                  title='Amount'
                  placeholder='$0.00'
                  type='text'
                  optional={false}
                  className='w-1/3'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.amount}
                />
                <Input
                  value={values.number}
                  id='cardNumber'
                  name='number'
                  title='Card Number'
                  placeholder='1234 5678 7654 3210'
                  type='text'
                  optional={false}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.number}
                />
                <div className='flex justify-between items-end gap-2'>
                  <Input
                    value={values.expMonth}
                    id='expMonth'
                    name='expMonth'
                    title='Exp Month'
                    placeholder='MM'
                    type='text'
                    optional={false}
                    className='w-full'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.expMonth}
                  />
                  <Input
                    value={values.expYear}
                    id='expYear'
                    name='expYear'
                    title='Exp Year'
                    placeholder='YY'
                    type='text'
                    optional={false}
                    className='w-full'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.expYear}
                  />
                </div>

                <Input
                  value={values.cvv}
                  id='cvv'
                  name='cvv'
                  title='cvv'
                  placeholder='cvv'
                  optional={false}
                  type='text'
                  className='w-1/3'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.cvv}
                />

                <Input
                  value={values.name}
                  id='name'
                  name='name'
                  title='Name on Card'
                  placeholder='Jonathan Doe'
                  optional={false}
                  type='text'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.name}
                />
                <Input
                  value={values.line1}
                  id='line1'
                  name='line1'
                  title='Address Line'
                  placeholder='Block 12, Angel Avenue'
                  optional={false}
                  type='text'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.line1}
                />
                <Select
                  value={values.country}
                  id='country'
                  name='country'
                  title='Country'
                  placeholder='Select your country'
                  optional={false}
                  options={[
                    { item: 'NGN', value: 'Nigeria' },
                    { item: 'US', value: 'United States' }
                  ]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.country}
                />
                <div className='flex justify-between items-center gap-2'>
                  <Input
                    value={values.city}
                    id='city'
                    name='city'
                    title='City'
                    placeholder='Texas'
                    optional={false}
                    type='text'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.city}
                  />
                  <Input
                    value={values.postalCode}
                    id='postalCode'
                    name='postalCode'
                    title='Postal Code'
                    placeholder='123456'
                    optional={false}
                    type='text'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.postalCode}
                  />
                </div>
                <Button
                  loading={isSubmitting}
                  variant='slim'
                  type='submit'
                  className='w-full'
                >
                  Pay
                </Button>
              </div>
              <div className='flex mt-5 gap-2 items-center justify-center'>
                <span>Powered by</span>
                <SvgIcon name='circle' size={100} />
              </div>
            </Form>
          );
        }}
      </Formik>
      <PaymentCreatedModal
        isOpen={openPaymentCreatedModal}
        close={handleClosePaymentCreatedModal}
      />
    </>
  );
};
export default PaymentCardComponent;
