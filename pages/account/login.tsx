import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';

import { FormErrorMessage, Message } from 'components/Message';
import Layout from 'components/Layout';
import { LOGIN_QUERY } from 'lib/graphql/account';
import useAuth from 'hooks/useAuth';

type Inputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { register, handleSubmit, errors } = useForm<Inputs>();

  const { login } = useAuth();

  const [generateCustomerToken, { error, loading }] = useMutation(LOGIN_QUERY, {
    update(cache, { data }) {
      let token = data.generateCustomerToken.token;

      if (!!token) {
        login(token);
      }

      cache.writeQuery({
        query: LOGIN_QUERY,
        data,
      });
    },
  });

  const onSubmit = ({ email, password }: Inputs) => {
    generateCustomerToken({
      variables: { email, password },
    });
  };

  return (
    <Layout title='Login'>
      <div className='container'>
        <form className='form-row mt-5' onSubmit={handleSubmit(onSubmit)}>
          <fieldset className='col-lg-6 col-12'>
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
          </fieldset>
        </form>
      </div>
    </Layout>
  );
};

export default LoginPage;
