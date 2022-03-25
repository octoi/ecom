/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import moment from 'moment';
import { Paths } from '@/utils/paths';
import { ProductType } from '@/utils/types';
import {
  Card,
  Image,
  Text,
  Badge,
  Group,
  useMantineTheme,
} from '@mantine/core';

interface Props {
  product: ProductType;
}

export const Product: React.FC<Props> = ({ product }) => {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <Link href={Paths.product + `/${product.id}`} passHref>
      <div className='cursor-pointer transition-all hover:opacity-60'>
        <Card shadow='sm' p='lg'>
          <Card.Section>
            <Image src={product.images[0]} height={160} alt={product.title} />
          </Card.Section>

          <Group
            position='apart'
            style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
          >
            <Text weight={500}>{product.title}</Text>
            <Badge color='teal' variant='light'>
              ${product.price}
            </Badge>
          </Group>

          <Group
            position='apart'
            style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
          >
            {product.createdAt && (
              <Text
                size='sm'
                style={{ color: secondaryColor, lineHeight: 1.5 }}
              >
                {moment(parseInt(product.createdAt)).fromNow()}
              </Text>
            )}
            <Text size='sm' style={{ color: secondaryColor, lineHeight: 1.5 }}>
              {product.place}
            </Text>
          </Group>
          <div className='mt-5 flex items-center'>
            <img
              src={product?.owner?.profile}
              alt={product?.owner?.name}
              className='w-5 mr-2'
            />
            <Text size='sm' style={{ color: secondaryColor, lineHeight: 1.5 }}>
              {product?.owner?.name}
            </Text>
          </div>
        </Card>
      </div>
    </Link>
  );
};
