import type { GetServerSideProps, NextPage } from 'next';
import { Layout } from '@/components/Layout';
import { getApolloClient } from '@/utils/apollo';
import { UserType } from '@/utils/types';
import { GET_USER_DETAILS } from '@/components/userDetail/query';
import { UserProfile } from '@/components/userDetail/UserProfile';
import { UserProducts } from '@/components/userDetail/UserProducts';
import { GSSPRedirectData } from '@/utils/constants';

interface Props {
  user: UserType;
}

const UserDetailPage: NextPage<Props> = ({ user }) => {
  return (
    <Layout
      title={user.name}
      image={user.profile}
      description={`view profile of ${user.name}`}
    >
      <UserProfile user={user} />
      <UserProducts email={user.email} />
    </Layout>
  );
};

export default UserDetailPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const userEmail = params?.email;

  const client = getApolloClient();

  const responseData: any = await client
    .query({
      query: GET_USER_DETAILS,
      variables: { email: userEmail },
    })
    .catch(() => {
      return GSSPRedirectData;
    });

  const userData = responseData.data?.getUserDetails;

  if (!userData) return GSSPRedirectData;

  return {
    props: {
      user: userData,
    },
  };
};
