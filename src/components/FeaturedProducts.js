import React from 'react';
import { useProductsContext } from '../context/products_context';
import styled from 'styled-components';
import Error from './Error';
import Loading from './Loading';
import Product from './Product';

const FeaturedProducts = () => {
  const {
    products_loading: isLoading,
    featured_products: featured,
    products_error: error,
  } = useProductsContext();

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <Wrapper className="section">
      <div className="title">
        <h2>featured products</h2>
        <div className="underline"></div>
      </div>
      <div className="section-center featured">
        {featured.map((feature_item) => {
          return <Product key={feature_item.id} {...feature_item} />;
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`;

export default FeaturedProducts;
