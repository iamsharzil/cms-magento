import gql from 'graphql-tag';

export const LOGIN_QUERY = gql`
  mutation generateCustomerToken($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`;

export const CREATE_CUSTOMER_QUERY = gql`
  mutation createCustomer(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
  ) {
    createCustomer(
      input: {
        firstname: $firstname
        lastname: $lastname
        email: $email
        password: $password
      }
    ) {
      customer {
        firstname
        lastname
        email
      }
    }
  }
`;

export const GET_CUSTOMER_INFO_QUERY = gql`
  query customer {
    customer {
      created_at
      email
      firstname
      id
      lastname
    }
  }
`;
