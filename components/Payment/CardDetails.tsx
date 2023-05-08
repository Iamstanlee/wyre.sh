import { useState } from 'react';

import styles from './Payment.module.css';
import Button from '../ui/Button/Button';
import Input from '../ui/Input/Input';
import Select from '../ui/Select/Select';

const CardDetails = () => {
  const [name, setName] = useState<string>('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvc, setCvc] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [loading, setLoading] = useState(true);

  return (
    <form className="w-full md:w-1/2 px-6 md:px-12 lg:px-28 py-10 md:pt-20">
      <p className="text-grey text-sm sm:text-base pb-6">
        Enter your payment information to complete the payment of this invoice.
      </p>

      {/* <p className="error text-danger mb-4">{ authErr }</p> */}

      <div className="flex flex-col gap-6">
        <Input
          value={cardNumber}
          name="Card Number"
          title="Card Number"
          id="card_number"
          placeholder="1234 5678 7654 3210"
          type="text"
          optional={false}
        />
        <div className="flex justify-between items-end gap-2">
          <Input
            value={expiryMonth}
            id="expiryMonth"
            name="expiryMonth"
            title="Exp Month"
            placeholder="MM"
            type="text"
            optional={false}
            className="w-1/3"
          />
          <Input
            value={expiryYear}
            id="expiryYear"
            name="expiryYear"
            title="Exp Year"
            placeholder="YY"
            type="text"
            optional={false}
            className="w-1/3 "
          />
        </div>

        <Input
          value={cvc}
          id="CVC"
          name="cvc"
          title="CVC"
          placeholder="CVC"
          optional={false}
          type="text"
          className="w-1/3 "
        />

        <Input
          value={name}
          id="name"
          name="Name"
          title="Name on Card"
          placeholder="Jonathan Doe"
          optional={false}
          type="text"
        />
        <Input
          value={address}
          id="address"
          name="address"
          title="Address Line"
          placeholder="Block 12, Angel Avenue"
          optional={false}
          type="text"
        />
        <Select
          value={country}
          id="country"
          name="country"
          title="Country"
          placeholder="Select your country"
          optional={false}
          options={[
            { item: 'NGN', value: 'Nigeria' },
            { item: 'US', value: 'United States' }
          ]}
        />
        <div className="flex  justify-between items-end gap-2">
          <Input
            value={city}
            id="city"
            name="city"
            title="City"
            placeholder="Texas"
            optional={false}
            type="text"
          />
          <Input
            value={postalCode}
            id="postalCode"
            name="postalCode"
            title="Postal Code"
            placeholder="123456"
            optional={false}
            type="text"
          />
        </div>
        <Button variant="slim" className="w-full">
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
    </form>
  );
};
export default CardDetails;
