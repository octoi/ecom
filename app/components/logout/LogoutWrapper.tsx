import React from 'react';
import { useRouter } from 'next/router';
import { Pane, Dialog } from 'evergreen-ui';
import { logoutUser } from '@/utils/user';
import { Paths } from '@/utils/constants';

export const LogoutWrapper: React.FC = ({ children }) => {
  const router = useRouter();

  const [isShown, setIsShown] = React.useState(false);

  return (
    <Pane>
      <Dialog
        isShown={isShown}
        title='Logout User'
        intent='danger'
        onCloseComplete={() => setIsShown(false)}
        confirmLabel='Logout'
        onConfirm={() => {
          logoutUser();
          router.push(Paths.login);
        }}
      >
        Are you sure you want to logout?
      </Dialog>

      <div onClick={() => setIsShown(true)}>{children}</div>
    </Pane>
  );
};
