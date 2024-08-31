import { useEffect, useState } from 'react';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useIsAuthenticated,
  useMsal,
} from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignInButton from '../components/signin/SignInButton';
import SignInBackground from '../components/signin/SignInBackground';
import Loading from '../components/utils/Loading';

const SignInPage = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const getAuthorized = async (accessToken, idToken) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signin`,
        {
          accessToken,
          idToken,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer undefined',
          },
          withCredentials: true,
          timeout: 5000,
        },
      );

      navigate('/', { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    async function handleRedirectPromise() {
      try {
        const redirectResponse = await instance.handleRedirectPromise();
        if (redirectResponse && !isAuthenticated) {
          setLoading(true);
          getAuthorized(redirectResponse.accessToken, redirectResponse.idToken);
        }
      } catch (err) {
        console.log(err);
      }
    }
    handleRedirectPromise();
  }, []);

  return (
    <>
      <UnauthenticatedTemplate>
        <SignInBackground>
          <SignInButton />
        </SignInBackground>
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        {loading ? (
          <Loading message="REDIRECT" />
        ) : (
          <SignInBackground>
            <SignInButton />
          </SignInBackground>
        )}
      </AuthenticatedTemplate>
    </>
  );
};

export default SignInPage;
