import React, { useState } from 'react';
import { Search as SearchIcon } from 'tabler-icons-react';
import { useLazyQuery } from '@apollo/client';
import { TextInput, Loader, ActionIcon } from '@mantine/core';
import { SEARCH_PRODUCT } from './queries';
import { getProductStoreItems } from '@/state/product.state';
import { ProductType } from '@/utils/types';

interface Props {
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
}

export const Search: React.FC<Props> = ({ setProducts }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const [searchProduct, { loading }] = useLazyQuery(SEARCH_PRODUCT);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();

    searchProduct({ variables: { query: searchQuery } }).then((data) => {
      setProducts(data.data?.searchProduct);
    });
  };

  return (
    <form onSubmit={handleFormSubmit} className='flex w-full items-center mb-5'>
      <TextInput
        placeholder='Search for products...'
        variant='filled'
        icon={
          loading ? <Loader color='gray' size='xs' /> : <SearchIcon size={18} />
        }
        disabled={loading}
        size='md'
        type='text'
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);

          if (e.target.value.trim().length === 0) {
            // if search query is empty
            setProducts(getProductStoreItems());
          }
        }}
        className='w-full mr-2'
      />
      <ActionIcon type='submit'>
        <SearchIcon />
      </ActionIcon>
    </form>
  );
};
