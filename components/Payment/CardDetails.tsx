import * as Yup from 'yup';
import { Form, Formik, FormikProps } from 'formik';

import styles from './Payment.module.css';
import Button from '../ui/Button/Button';
import Input from '../ui/Input/Input';
import Select from '../ui/Select/Select';
import { PaymentLink } from '@/types';

interface SubmitProps {
  name: string;
  expiryMonth: string;
  expiryYear: string;
  cardNumber: string;
  cvc: string;
  address: string;
  country: string;
  city: string;
  postalCode: string;
}

interface CardDetailsProps {
  paymentDetails: PaymentLink | null | any;
}

const CardDetails = ({ paymentDetails }: CardDetailsProps) => {
  const submitForm = async (values: SubmitProps) => {};

  return (
    <Formik
      initialValues={{
        name: '',
        expiryMonth: '',
        expiryYear: '',
        cardNumber: '',
        cvc: '',
        address: '',
        country: '',
        city: '',

        postalCode: ''
      }}
      onSubmit={(values: SubmitProps, { setSubmitting }) => {
        submitForm(values).then((_) => setSubmitting(false));
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required('Please enter your name'),
        expiryMonth: Yup.string().required('Please enter an expiryMonth'),
        expiryYear: Yup.string().required('Please enter an expiryYear'),
        cardNumber: Yup.string().required('Please enter an cardNumber'),
        cvc: Yup.string().required('Please enter an cvc'),
        address: Yup.string().required('Please enter an address'),
        country: Yup.string().required('Please enter an country'),
        city: Yup.string().required('Please enter an city'),

        postalCode: Yup.string().required('Please enter a valid postalCode')
      })}
    >
      {(props: FormikProps<SubmitProps>) => {
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
                value={values.cardNumber}
                name="Card Number"
                title="Card Number"
                id="card_number"
                placeholder="1234 5678 7654 3210"
                type="text"
                optional={false}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!(errors.cardNumber && touched.cardNumber)}
                errors={errors.cardNumber}
              />
              <div className="flex justify-between items-end gap-2">
                <Input
                  value={values.expiryMonth}
                  id="expiryMonth"
                  name="expiryMonth"
                  title="Exp Month"
                  placeholder="MM"
                  type="text"
                  optional={false}
                  className="w-1/3"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!(errors.expiryMonth && touched.expiryMonth)}
                  errors={errors.expiryMonth}
                />
                <Input
                  value={values.expiryYear}
                  id="expiryYear"
                  name="expiryYear"
                  title="Exp Year"
                  placeholder="YY"
                  type="text"
                  optional={false}
                  className="w-1/3"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!(errors.expiryYear && touched.expiryYear)}
                  errors={errors.expiryYear}
                />
              </div>

              <Input
                value={values.cvc}
                id="CVC"
                name="cvc"
                title="CVC"
                placeholder="CVC"
                optional={false}
                type="text"
                className="w-1/3"
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!(errors.cvc && touched.cvc)}
                errors={errors.cvc}
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
                error={!!(errors.name && touched.name)}
                errors={errors.name}
              />
              <Input
                value={values.address}
                id="address"
                name="address"
                title="Address Line"
                placeholder="Block 12, Angel Avenue"
                optional={false}
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!(errors.address && touched.address)}
                errors={errors.address}
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
                error={!!(errors.country && touched.country)}
                errors={errors.country}
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
                  error={!!(errors.city && touched.city)}
                  errors={errors.city}
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
                  error={!!(errors.postalCode && touched.postalCode)}
                  errors={errors.postalCode}
                />
              </div>
              <Button variant="slim" className="w-full" type="submit">
                Pay
              </Button>
            </div>
            {/* <p className="text-grey pb-2">Use this information to test</p>
      <p className="text-grey pb-6">
        <span>Card number: 348593218495 </span>
        <br />
        <span>Expiry month: 04</span> <br />
        <span>Expiry year: 2022</span> <br />
        <span>CVV: 322</span> <br />
      </p> */}
          </Form>
        );
      }}
    </Formik>
  );
};
export default CardDetails;
