import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import useCart from 'hooks/useCart';
import { IProduct } from 'interfaces/product';

import { Message } from './Message';

type Inputs = {
  quantity: Number;
  sku: string;
};

const Card = (product: IProduct) => {
  const imageUrl = product.image.url;
  const price = product.price_range.maximum_price.final_price.value;

  const { register, handleSubmit } = useForm<Inputs>();

  const { addToCart } = useCart();

  const customerId = useSelector(
    (state: { customerId: string }) => state.customerId
  );

  const error = useSelector((state: { error: string }) => state.error);
  const loading = useSelector((state: { loading: boolean }) => state.loading);

  const guestId = useSelector((state: { guestId: string }) => state.guestId);

  const onSubmit = async ({ quantity, sku }: Inputs) => {
    const item = {
      customerId,
      guestId,
      quantity,
      sku,
    };

    await addToCart(item);
  };

  if (product.stock_status === 'OUT_OF_STOCK') {
    return null;
  }

  return (
    <div key={product.id} className='col-3 card mb-3 mx-4'>
      <form className='mt-5' onSubmit={handleSubmit(onSubmit)}>
        <input
          type='hidden'
          name='sku'
          defaultValue={product.sku}
          ref={register}
        />
        <input type='hidden' name='quantity' defaultValue={1} ref={register} />
        <div className='card-body'>
          <h5 className='card-title'>{product.name}</h5>
        </div>
        <img src={imageUrl} className='img-fluid' alt={product.name} />
        <div className='card-body text-center'>
          <p className='card-text'>
            <strong>Rs. {price}</strong>{' '}
          </p>
          <button type='submit' className='btn btn-primary' disabled={loading}>
            Add To Cart
          </button>
        </div>
      </form>
      <Message key={product.id} error={error} />
    </div>
  );
};

export default Card;
