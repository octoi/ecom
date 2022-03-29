import type { GetServerSideProps, NextPage } from 'next';
import { Layout } from '@/components/Layout';
import { getApolloClient } from '@/utils/apollo';
import { GET_ONE_PRODUCT } from '@/components/productDetail/query';
import { ProductType } from '@/utils/types';
import { ProductDetail } from '@/components/productDetail';
import { GSSPRedirectData } from '@/utils/constants';

interface Props {
  product: ProductType;
}

const ProductDetailPage: NextPage<Props> = ({ product }) => {
  return (
    <Layout
      title={product.title}
      description={product.description}
      image={product.images[0]}
    >
      <ProductDetail product={product} />
    </Layout>
  );
};

export default ProductDetailPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const productId = params?.productId;

  const client = getApolloClient();

  const responseData: any = await client
    .query({
      query: GET_ONE_PRODUCT,
      variables: { productId },
    })
    .catch(() => {
      return GSSPRedirectData;
    });

  const productData = responseData.data?.getOneProduct;

  if (!productData) return GSSPRedirectData;

  return {
    props: {
      product: productData,
    },
  };
};
