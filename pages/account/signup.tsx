import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';

import Layout from 'components/Layout';
import { FormErrorMessage, Message } from 'components/Message';

import { CREATE_CUSTOMER_QUERY } from 'lib/graphql/account';
import Router from 'next/router';

type Inputs = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

const SignupPage = () => {
  const { register, handleSubmit, errors } = useForm<Inputs>();

  const [createCustomer, { error, loading }] = useMutation(
    CREATE_CUSTOMER_QUERY,
    {
      onCompleted: (data) => {
        Router.push('/account/login');
      },
    }
  );

  const onSubmit = ({ firstname, lastname, email, password }: Inputs) => {
    createCustomer({ variables: { firstname, lastname, email, password } });
  };

  return (
    <Layout title='Login'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-6 col-12'>
            <form className='mt-5' onSubmit={handleSubmit(onSubmit)}>
              <div className='form-row'>
                <div className='form-group col'>
                  <label htmlFor='firstname'>First Name</label>
                  <input
                    type='text'
                    id='firstname'
                    name='firstname'
                    className='form-control'
                    placeholder='First Name'
                    ref={register({
                      required: 'Please enter your firstname',
                    })}
                  />
                  <FormErrorMessage name='firstname' errors={errors} />
                </div>
                <div className='form-group ml-lg-3 col-6'>
                  <label htmlFor='firstname'>Last Name</label>
                  <input
                    type='text'
                    id='lastname'
                    name='lastname'
                    className='form-control'
                    placeholder='Last Name'
                    ref={register({
                      required: 'Please enter your lastname',
                    })}
                  />
                  <FormErrorMessage name='lastname' errors={errors} />
                </div>
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email address</label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  className='form-control'
                  placeholder='Enter email'
                  ref={register({
                    required: 'Please enter your email address',
                    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />
                <FormErrorMessage name='email' errors={errors} />
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  className='form-control'
                  placeholder='Password'
                  ref={register({ required: 'Please enter your password' })}
                />
                <FormErrorMessage name='password' errors={errors} />
              </div>
              <Message error={error?.graphQLErrors[0].message} />
              <button
                type='submit'
                className='btn btn-primary'
                disabled={loading}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignupPage;
