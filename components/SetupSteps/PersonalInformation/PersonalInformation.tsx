import * as Yup from 'yup';
import { useState } from 'react';
import { Form, Formik, FormikProps } from 'formik';
import { useSupabase } from '@/utils/use-supabase';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import { useUser } from '@/utils/use-user';
import { DbTable, RouteKey } from '@/utils/enum';
import { useRouter } from 'next/router';

import style from './PersonalInformation.module.css';
import useCircle from '../../../utils/use-circle';

interface ISubmit {
  first_name: string;
  last_name: string;
  username: string;
}

const PersonalInformation = () => {
  const { reload, replace } = useRouter();
  const { supabase, supabaseUser } = useSupabase();
  const { user } = useUser();
  const [formError, setFormError] = useState<string | null>();
  const { initAccount, createXulaWallet } = useCircle();

  const submitForm = async (values: ISubmit) => {
    let { error } = await supabase.from(DbTable.users).insert({
      id: supabaseUser?.id,
      first_name: values.first_name,
      last_name: values.last_name,
      email_address: supabaseUser?.email,
      username: values.username
    });
    if (error) {
      setFormError(error.message);
    } else {
      reload();
      await replace(RouteKey.dashboard);
    }
  };

  return (

    <>
      <Formik
        initialValues={{
          first_name: user?.first_name ?? '',
          last_name: user?.last_name ?? '',
          username: user?.username ?? ''
        }}
        onSubmit={(values: ISubmit, { setSubmitting }) => {
          submitForm(values).then((_) => setSubmitting(false));
        }}
        validationSchema={Yup.object().shape({
          first_name: Yup.string().required('Please enter your first name'),
          last_name: Yup.string().required('Please enter your last name'),
          username: Yup.string().required('Please enter a valid username')
        })}
      >
        {(props: FormikProps<ISubmit>) => {
          const {
            values,
            touched,
            errors,
            handleBlur,
            handleChange,
            isSubmitting
          } = props;

          return (
            <Form>
              <div className="flex flex-col gap-6">
                {formError && <p className="text-red-500">{formError}</p>}

                <Input
                  title="First name"
                  type="text"
                  name="first_name"
                  id="first_name"
                  placeholder="Enter your First Name"
                  value={values.first_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!(errors.first_name && touched.first_name)}
                  errors={errors.first_name}
                  optional={false}
                />

                <Input
                  title="Last name"
                  type="text"
                  name="last_name"
                  id="last_name"
                  placeholder="Enter your Last Name"
                  value={values.last_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!(errors.last_name && touched.last_name)}
                  errors={errors.last_name}
                  optional={false}
                />

                <Input
                  title="Username"
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter your Username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!(errors.username && touched.username)}
                  errors={errors.username}
                  optional={false}
                />

                <Input
                  title="Email"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter your Email"
                  value={supabaseUser?.email}
                  optional={true}
                  disabled={true}
                />

                <Button
                  loading={isSubmitting}
                  variant="slim"
                  type="submit"
                  className="w-full"
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
