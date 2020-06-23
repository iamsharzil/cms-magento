import { useDispatch } from 'react-redux';
import cookie from 'js-cookie';

import {
  ADD_TO_CART_QUERY,
  EMPTY_CUSTOMER_CART_QUERY,
  GET_CUSTOMER_CART_QUERY,
  EMPTY_GUEST_CART_QUERY,
} from 'lib/graphql/cart';
import { initializeApollo } from 'lib/apolloClient';
import {
  setCartQuantity,
  setCustomercustomerId,
  setGuestcustomerId,
  setError,
  setLoading,
} from 'lib/actions';

interface Props {
  customerId?: string;
  guestId?: string;
  quantity?: Number;
  sku?: string;
  token?: string;
}

const useCart = () => {
  const dispatch = useDispatch();
  const apolloClient = initializeApollo();

  // CUSTOMER EMPTY CART
  const createEmptyCartCustomer = async (token: string) => {
    const { data } = await apolloClient.query({
      query: EMPTY_CUSTOMER_CART_QUERY,
      context: {
        headers: {
          authorization: token ? `Bearer ${token}` : '',
        },
      },
    });

    let customerId = data.customerCart.id;

    /**
     * IF CART ID EXISTS
     * SET CUSTOMER CART ID IN REDUX STATE
     */
    if (!!customerId) dispatch(setCustomercustomerId(customerId));

    getCartInfo({ token, customerId });
  };

  // GUEST EMPTY CART
  const createEmptyCartGuest = async () => {
    const { data } = await apolloClient.mutate({
      mutation: EMPTY_GUEST_CART_QUERY,
    });

    console.log('guest:cart', data.createEmptyCart);

    let guestId = data.createEmptyCart;

    /**
     * IF CART ID EXISTS
     * SET GUEST CART ID IN REDUX STATE
     */
    if (!!guestId) dispatch(setGuestcustomerId(guestId));

    getCartInfo({ guestId });

    return guestId;
  };

  // ADD ITEM TO CART
  const addToCart = async (item: Props) => {
    let token = cookie.get('token');

    /**
     * IF TOKEN
     * ADD CART TO CUSTOMER
     * ELSE
     * ADD CART TO GUEST
     */

    if (!!token) {
      await addToCartCustomer(item, token);
    } else {
      await addToCartGuest(item);
    }
  };

  // PASS TOKEN FOR A LOGGED IN CUSTOMER
  const addToCartCustomer = async (item: Props, token: string) => {
    await mutateAddToCart(item, token);
  };

  const mutateAddToCart = async (item: Props, token?: string) => {
    let { customerId, guestId, quantity, sku } = item;

    let cartId = !!customerId ? customerId : guestId;

    dispatch(setLoading(true));

    try {
      const { data } = await apolloClient.mutate({
        mutation: ADD_TO_CART_QUERY,
        variables: {
          cartId,
          quantity,
          sku,
        },
        context: {
          headers: {
            authorization: token ? `Bearer ${token}` : '',
          },
        },
      });

      if (!!data) {
        let cartQuantity = data.addSimpleProductsToCart.cart.items.reduce(
          (acc: number, next: { quantity: number }) => acc + next.quantity,
          0
        );
        dispatch(setCartQuantity(cartQuantity));
        dispatch(setLoading(false));
      }
    } catch (error) {
      // console.log('error:atc', error.graphQLErrors[0].message);
      dispatch(setError(error.graphQLErrors[0].message));
      dispatch(setLoading(false));
    }
  };

  // USE GUEST ID FOR A GUEST
  const addToCartGuest = async (item: Props) => {
    const { guestId } = item;

    /**
     * IF GUEST ID EXISTS IN STATE
     * DONT'CREATE NEW CART ID AND ADD ITEM TO CART
     * ELSE
     * CREATE CART ID AND ADD ITEM TO CART
     */
    if (!!guestId) {
      await mutateAddToCart(item);
    } else {
      const guestId = await createEmptyCartGuest();
      await mutateAddToCart({ ...item, guestId });
    }
  };

  // GET CART INFO OF USER
  const getCartInfo = async ({ token, customerId, guestId }: Props) => {
    let cartId = !!customerId ? customerId : guestId;

    try {
      const { data } = await apolloClient.query({
        query: GET_CUSTOMER_CART_QUERY,
        variables: {
          cartId,
        },
        context: {
          headers: {
            authorization: token ? `Bearer ${token}` : '',
          },
        },
      });

      console.log('cartInfo:data', data);

      let quantity = data.cart.total_quantity;
      dispatch(setCartQuantity(quantity));
    } catch (error) {
      console.log('cartInfo:error', error);
    }
  };

  return {
    addToCart,
    createEmptyCartCustomer,
    createEmptyCartGuest,
    getCartInfo,
  };
};

export default useCart;
