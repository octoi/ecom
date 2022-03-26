import React from 'react';
import Link from 'next/link';
import { ProductType } from '@/utils/types';
import { ImageSlider } from './ImageSlider';
import { Paths } from '@/utils/paths';
import {
  Badge,
  Container,
  Group,
  Title,
  Text,
  useMantineTheme,
  Avatar,
} from '@mantine/core';

interface Props {
  product: ProductType;
}

export const ProductDetail: React.FC<Props> = ({ product }) => {
  const theme = useMantineTheme();
  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <Container p='lg'>
      <ImageSlider images={product.images} />

      <Group
        position='apart'
        style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
      >
        <div>
          <Title>{product.title}</Title>
          <Text className='mt-2' size='lg' weight={500}>
            {product.place}
          </Text>
        </div>

        <Badge color='teal' size='xl' variant='light'>
          ${product.price}
        </Badge>
      </Group>
      <Text size='lg' className='mt-5'>
        {product.description}
      </Text>
      <Link href={`${Paths.user}/${product.owner?.email}`} passHref>
        <div className='mt-5 flex items-center cursor-pointer rounded transition-all hover:opacity-50'>
          <Avatar
            src={product.owner?.profile}
            alt={product.owner?.name}
            size='lg'
            className='rounded-full'
          />
          <div className='ml-2'>
            <Text size='lg' weight={500}>
              {product.owner?.name}
            </Text>
            <Text size='md' style={{ color: secondaryColor, lineHeight: 1.5 }}>
              {product.owner?.email}
            </Text>
          </div>
        </div>
      </Link>
    </Container>
  );
};
