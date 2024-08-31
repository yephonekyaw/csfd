import { useMsal } from '@azure/msal-react';
import axios from 'axios';

const SignOutButton = (props) => {
  const { instance } = useMsal();

  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/auth/signout`, {
        withCredentials: true,
      });
      const logoutHint = instance.getActiveAccount().idTokenClaims.login_hint;
      instance.logoutRedirect({ logoutHint: logoutHint });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={`${props.className ? props.className : ''}`}
    >
      {/* Brief header */}
      <div
        className={`${
          props.sideBar ? 'hidden' : 'lg:hidden'
        } text-white hover:text-[#fff671] transition-colors`}
      >
        <svg
          fill="none"
          width="32"
          height="32"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M5 3h16v4h-2V5H5v14h14v-2h2v4H3V3h2zm16 8h-2V9h-2V7h-2v2h2v2H7v2h10v2h-2v2h2v-2h2v-2h2v-2z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Full Header */}
      <div
        className={`${
          props.sideBar ? 'flex' : 'hidden lg:flex'
        } items-center gap-2 font-onesize text-lg text-white hover:text-[#fff671] transition-colors`}
      >
        <span>Logout</span>
        <svg
          fill="none"
          width="32"
          height="32"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M5 3h16v4h-2V5H5v14h14v-2h2v4H3V3h2zm16 8h-2V9h-2V7h-2v2h2v2H7v2h10v2h-2v2h2v-2h2v-2h2v-2z"
            fill="currentColor"
          />
        </svg>
      </div>
    </button>
  );
};

export default SignOutButton;
