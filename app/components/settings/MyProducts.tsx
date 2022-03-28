import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ProductType } from '@/utils/types';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_PRODUCTS } from './query';
import { getUserData } from '@/state/user.state';
import { Avatar, Button, Table, Text } from '@mantine/core';
import { ExternalLink, Trash } from 'tabler-icons-react';
import { Paths } from '@/utils/paths';
import { DELETE_PRODUCT } from './mutation';
import { useNotifications } from '@mantine/notifications';
import { useModals } from '@mantine/modals';

export const MyProducts: React.FC = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [refetchLoading, setRefetchLoading] = useState(false);

  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  const notifications = useNotifications();
  const modals = useModals();

  const user = getUserData();

  const { loading, data, error, refetch } = useQuery(GET_USER_PRODUCTS, {
    variables: { email: user?.email, page },
  });

  useEffect(() => {
    if (page === 1 && data) {
      setProducts(data.getAllUserProducts);
    }
  }, [data, page]);

  const openDeleteProductConfirmModal = (
    productId: string,
    productTitle: string
  ) =>
    modals.openConfirmModal({
      title: 'Delete Product',
      centered: true,
      children: (
        <Text size='sm'>
          Are you sure you want to delete {productTitle} ?, Recovering after
          deletion is not possible
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Keep' },
      confirmProps: { color: 'red' },
      onConfirm: () => handleDeleteProduct(productId, productTitle),
    });

  const handleDeleteProduct = (productId: string, productTitle: string) => {
    deleteProduct({ variables: { productId } })
      .then((res) => {
        setProducts(products.filter((product) => product.id !== productId));

        notifications.showNotification({
          title: `Say bye to ${productTitle}`,
          message: res?.data?.deleteProduct,
          autoClose: 3000,
          color: 'teal',
        });
      })
      .catch((err) => {
        notifications.showNotification({
          title: 'Failed to delete product',
          message: err?.message,
          autoClose: 3000,
          color: 'red',
        });
      });
  };

  return (
    <div className='mt-5'>
      {loading && <p>Loading...</p>}
      {error && <p className='text-red-400'>{error?.message}</p>}
      {products.length == 0 && (
        <p>
          Seems like you never sold any product{' '}
          <Link href={Paths.newProduct} passHref>
            <span className='cursor-pointer underline font-bold'>
              Sell Product
            </span>
          </Link>
        </p>
      )}
      {products.length > 0 && (
        <Table striped highlightOnHover verticalSpacing='md'>
          <thead>
            <tr>
              <th>Index</th>
              <th>Image</th>
              <th>Title</th>
              <th>View</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: ProductType, idx: number) => (
              <tr key={product.id}>
                <td>{idx + 1}</td>
                <td>
                  <Avatar
                    src={product.images[0]}
                    alt={product.title}
                    className='rounded-full'
                  />
                </td>
                <td>{product.title}</td>
                <td>
                  <Link href={Paths.product + `/${product.id}`} passHref>
                    <ExternalLink size={20} className='cursor-pointer' />
                  </Link>
                </td>
                <td>
                  <Trash
                    onClick={() =>
                      openDeleteProductConfirmModal(product.id, product.title)
                    }
                    size={20}
                    className='cursor-pointer text-red-500'
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {products.length !== 0 && data && data?.getAllUserProducts?.length !== 0 && (
        <Button
          className='mt-5'
          color='gray'
          variant='outline'
          loading={refetchLoading}
          onClick={() => {
            setRefetchLoading(true);
            refetch({ page: page + 1 })
              .then((data: any) => {
                const responseProducts = data.data?.getAllProducts;
                if (responseProducts) {
                  const allProducts = [...products, ...responseProducts];
                  setProducts(allProducts);
                }
              })
              .finally(() => {
                setRefetchLoading(false);
              });
            setPage(page + 1);
          }}
        >
          Load More
        </Button>
      )}
    </div>
  );
};
