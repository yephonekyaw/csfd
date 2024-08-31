import { useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import Cookies from 'js-cookie';

const SignOutPage = () => {
  const { instance } = useMsal();
  useEffect(() => {
    if (instance.getActiveAccount()) {
      const logoutHint = instance.getActiveAccount().idTokenClaims.login_hint;
      Cookies.remove('accessToken');
      instance.logoutRedirect({ logoutHint: logoutHint });
    }
  }, []);
  return <div>Signing out...</div>;
};

export default SignOutPage;
