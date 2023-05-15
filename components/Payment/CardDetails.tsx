import * as Yup from 'yup';
import { Form, Formik, FormikProps } from 'formik';

import styles from './Payment.module.css';
import Button from '../ui/Button/Button';
import Input from '../ui/Input/Input';
import Select from '../ui/Select/Select';
import { PaymentLink, CardInformation } from '@/types';
import { exampleCards } from '@/data/mock';
import useCircle from '@/utils/use-circle';
import PaymentCreated from '../ui/Modal/PaymentCreated';
import { useState } from 'react';

interface CardDetailsProps {
  paymentDetails: PaymentLink | null | any;
}

const CardDetails = ({ paymentDetails }: CardDetailsProps) => {
  const { createCardPayment } = useCircle();

  const [openPaymentCreatedModall, setOpenPaymentCreatedModal] =
    useState<boolean>(false);
  const [paymentStatus, setPaymentStatus] = useState<string>('');

  const handleClosePaymentCreatedModal = () => {
    setOpenPaymentCreatedModal(false);
  };

  const submitForm = async (values: CardInformation) => {
    const result = await createCardPayment(values);

    if (result?.error) {
      console.log(result.error);
    } else {
      console.log(result);
      setPaymentStatus(result?.status);
      setOpenPaymentCreatedModal(true);

      // user should be able to see payment status in real time
      // there should also be a button to refresh payment status
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          amount: '',
          name: exampleCards[0].formData.name,
          line1: exampleCards[0].formData.line1,
          line2: '',
          district: exampleCards[0].formData.district,
          country: exampleCards[0].formData.country,
          city: exampleCards[0].formData.city,
          postalCode: exampleCards[0].formData.postalCode,
          expMonth: exampleCards[0].formData.expiry.month,
          expYear: exampleCards[0].formData.expiry.year,
          number: exampleCards[0].formData.cardNumber,
          cvv: exampleCards[0].formData.cvv,
          email: paymentDetails.metadata.user_email,
          phoneNumber: exampleCards[0].formData.phoneNumber,

        }}
        onSubmit={(values: CardInformation, { setSubmitting }) => {
          submitForm(values).then((_) => setSubmitting(false));
        }}
        validationSchema={Yup.object().shape({
            name: Yup.string().required('Please enter your name'),
            line1: Yup.string().required('Please enter an line1'),
            country: Yup.string().required('Please enter an country'),
            city: Yup.string().required('Please enter an city'),
            postalCode: Yup.string().required('Please enter a valid postalCode'),
          expMonth: Yup.string().required('Please enter an expMonth'),
          expYear: Yup.string().required('Please enter an expYear'),
          number: Yup.string().required('Please enter an number'),
            amount:Yup.number().required('Please enter an amount'),


        })}
      >
        {(props: FormikProps<CardInformation>) => {
          const {
            values,
            touched,
            errors,
            handleBlur,
            handleChange,
            isSubmitting
          } = props;
          return (
            <Form className="w-full md:w-1/2 px-6 md:px-12 lg:px-28 py-10 md:pt-20">
              <p className="text-grey text-sm sm:text-base pb-6">
                Enter your payment information to complete the payment of this
                invoice.
              </p>

              {/* <p className="error text-danger mb-4">{ authErr }</p> */}

              <div className="flex flex-col gap-6">
                <Input
                  value={values.amount}
                  id="amount"
                  name="amount"
                  title="Amount"
                  placeholder="$0.00"
                  type="text"
                  optional={false}
                  className="w-1/3"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // disabled={values.amount?.amount ? true : false}
                />
                <Input
                  value={values.number}
                  name="Card Number"
                  title="Card Number"
                  id="card_number"
                  placeholder="1234 5678 7654 3210"
                  type="text"
                  optional={false}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="flex justify-between items-end gap-2">
                  <Input
                    value={values.expMonth}
                    id="expMonth"
                    name="expMonth"
                    title="Exp Month"
                    placeholder="MM"
                    type="text"
                    optional={false}
                    className="w-1/3"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Input
                    value={values.expYear}
                    id="expYear"
                    name="expYear"
                    title="Exp Year"
                    placeholder="YY"
                    type="text"
                    optional={false}
                    className="w-1/3"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                <Input
                  value={values.cvv}
                  id="cvv"
                  name="cvv"
                  title="cvv"
                  placeholder="cvv"
                  optional={false}
                  type="text"
                  className="w-1/3"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <Input
                  value={values.name}
                  id="name"
                  name="Name"
                  title="Name on Card"
                  placeholder="Jonathan Doe"
                  optional={false}
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Input
                  value={values.line1}
                  id="line1"
                  name="line1"
                  title="Address Line"
                  placeholder="Block 12, Angel Avenue"
                  optional={false}
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Select
                  value={values.country}
                  id="country"
                  name="country"
                  title="Country"
                  placeholder="Select your country"
                  optional={false}
                  options={[
                    { item: 'NGN', value: 'Nigeria' },
                    { item: 'US', value: 'United States' }
                  ]}
                  onChange={handleChange}
                  onBlur={handleBlur}

                />
                <div className="flex  justify-between items-end gap-2">
                  <Input
                    value={values.city}
                    id="city"
                    name="city"
                    title="City"
                    placeholder="Texas"
                    optional={false}
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Input
                    value={values.postalCode}
                    id="postalCode"
                    name="postalCode"
                    title="Postal Code"
                    placeholder="123456"
                    optional={false}
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <Button
                  loading={isSubmitting}
                  variant="slim"
                  type="submit"
                  className="w-full"
                >
                  Pay
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
      <PaymentCreated
        open={openPaymentCreatedModall}
        handleClosePaymentCreatedModal={handleClosePaymentCreatedModal}
        status={paymentStatus}
      />
    </>
  );
};
export default CardDetails;
