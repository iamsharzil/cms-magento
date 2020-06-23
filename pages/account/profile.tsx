import { NextPage, GetServerSideProps } from 'next';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';

import Layout from 'components/Layout';

import { initializeApollo } from 'lib/apolloClient';
import { GET_CUSTOMER_INFO_QUERY } from 'lib/graphql/account';
import { useQuery } from '@apollo/react-hooks';

export interface IProfile {
  created_at: String;
  email: String;
  firstname: String;
  id: Number;
  lastname: String;
}

const ProfilePage: NextPage = () => {
  const token = cookie.get('token');

  const { loading, error, data } = useQuery(GET_CUSTOMER_INFO_QUERY, {
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const { email, firstname, lastname }: IProfile = data.customer;

  if (loading) {
    return <h6>Loading.....</h6>;
  }

  if (error) {
    return <h6>{error.graphQLErrors[0].message}</h6>;
  }

  return (
    <Layout title='Profile'>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <h1>Profile</h1>
            <h6> Email: {email}</h6>
            <h6>FirstName: {firstname} </h6>
            <h6>LastName: {lastname} </h6>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo();

  const { token } = nextCookie(context);

  await apolloClient.query({
    query: GET_CUSTOMER_INFO_QUERY,
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default ProfilePage;
