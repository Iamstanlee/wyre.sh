import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { Form, Formik, FormikProps } from 'formik';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useUser } from '@/utils/use-user';
import { useSupabase } from '@/utils/use-supabase';
import { RouteKey } from '@/utils/enum';
import { useToast } from '@/utils/use-toast';

interface ISubmit {
  first_name: string;
  last_name: string;
}

const PersonalInformation = () => {
  const { show } = useToast();
  const { replace } = useRouter();
  const { supabaseUser } = useSupabase();
  const { user } = useUser();

  const submitForm = async (values: ISubmit) => {
    let response = await fetch('/api/account-setup', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        user_id: supabaseUser?.id,
        email_address: supabaseUser?.email,
        first_name: values.first_name,
        last_name: values.last_name
      })
    });
    const data = await response.json();
    if (response.ok) {
      show(data.message, 'success');
      await replace(RouteKey.dashboard);
    } else {
      show(data.message, 'danger');
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          first_name: user?.first_name ?? '',
          last_name: user?.last_name ?? ''
        }}
        onSubmit={(values: ISubmit, { setSubmitting }) => {
          submitForm(values).then((_) => setSubmitting(false));
        }}
        validationSchema={Yup.object().shape({
          first_name: Yup.string().required('Please enter your first name'),
          last_name: Yup.string().required('Please enter your last name')
        })}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {(props: FormikProps<ISubmit>) => {
          const {
            values,
            errors,
            handleBlur,
            handleChange,
            isSubmitting
          } = props;

          return (
            <Form>
              <div className='flex flex-col gap-6'>
                <Input
                  title='First name'
                  type='text'
                  name='first_name'
                  id='first_name'
                  placeholder='Enter your First Name'
                  value={values.first_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.first_name}
                  optional={false}
                />

                <Input
                  title='Last name'
                  type='text'
                  name='last_name'
                  id='last_name'
                  placeholder='Enter your Last Name'
                  value={values.last_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.last_name}
                  optional={false}
                />
                <Input
                  title='Email'
                  type='text'
                  name='email'
                  id='email'
                  placeholder='Enter your Email'
                  value={supabaseUser?.email}
                  optional={true}
                  disabled={true}
                />

                <Button
                  loading={isSubmitting}
                  variant='slim'
                  type='submit'
                  className='w-full'
                >
                  Continue
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
export default PersonalInformation;
