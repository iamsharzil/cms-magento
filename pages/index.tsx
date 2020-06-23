import Layout from 'components/Layout';
import { initializeApollo } from 'lib/apolloClient';
import { CATEGORY_LIST_QUERY } from 'lib/graphql/category';
import { useQuery } from '@apollo/react-hooks';
import Card from 'components/Card';
import { IProduct } from 'interfaces/product';

const IndexPage = () => {
  const { loading, error, data } = useQuery(CATEGORY_LIST_QUERY, {
    variables: { eq: 'face-care' },
    // Setting this value to true will make the component rerender when
    // the "networkStatus" changes, so we are able to know if it is fetching
    // more data
    notifyOnNetworkStatusChange: true,
  });

  let products = data.categoryList[0].products.items;

  if (loading) {
    return <h6>Loading.....</h6>;
  }

  if (error) {
    return <h6>{error.graphQLErrors[0].message}</h6>;
  }

  return (
    <Layout title='Home'>
      <div className='container'>
        <div className='row'>
          {products.map((product: IProduct) => (
            <Card key={product.id} {...product} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: CATEGORY_LIST_QUERY,
    // URL OF THE CATEGORY
    variables: { eq: 'face-care' },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    unstable_revalidate: 1,
  };
}

export default IndexPage;
