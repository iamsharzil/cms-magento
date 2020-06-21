import { NextPage, GetServerSideProps } from 'next';
import nextCookie from 'next-cookies';

import Layout from 'components/Layout';

import { initializeApollo } from 'lib/apolloClient';
import { GET_CUSTOMER_INFO_QUERY } from 'lib/graphql/account';

export interface IProfile {
  profile: {
    created_at: String;
    email: String;
    firstname: String;
    id: Number;
    lastname: String;
  };
}

const ProfilePage: NextPage<IProfile> = (props) => {
  // const user = props.initialApolloState;

  const { email, firstname, lastname } = props.profile;

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

  const { data } = await apolloClient.query({
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
      profile: data.customer,
    },
  };
};

export default ProfilePage;
