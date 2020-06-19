import gql from 'graphql-tag';

export const STORE_CONFIG_QUERY = gql`
  query storeConfig {
    storeConfig {
      store_name
      base_url
    }
  }
`;
