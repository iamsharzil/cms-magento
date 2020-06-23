import gql from 'graphql-tag';

export const EMPTY_GUEST_CART_QUERY = gql`
  mutation customerCart {
    createEmptyCart
  }
`;

export const EMPTY_CUSTOMER_CART_QUERY = gql`
  query customerCart {
    customerCart {
      id
    }
  }
`;

export const GET_CUSTOMER_CART_QUERY = gql`
  query customerCart($cartId: String!) {
    cart(cart_id: $cartId) {
      id
      items {
        id
        product {
          name
        }
        prices {
          row_total_including_tax {
            value
          }
        }
      }
      prices {
        grand_total {
          value
        }
      }
      total_quantity
    }
  }
`;

export const ADD_TO_CART_QUERY = gql`
  mutation addSimpleProductsToCart(
    $cartId: String!
    $quantity: Float!
    $sku: String!
  ) {
    addSimpleProductsToCart(
      input: {
        cart_id: $cartId
        cart_items: [{ data: { quantity: $quantity, sku: $sku } }]
      }
    ) {
      cart {
        items {
          id
          product {
            name
            sku
          }
          quantity
        }
      }
    }
  }
`;
