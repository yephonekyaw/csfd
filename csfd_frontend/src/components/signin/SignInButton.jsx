import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../auth/authConfig';

const SignInButton = () => {
  const { instance } = useMsal();
  const handleLogin = () => {
    instance.loginRedirect(loginRequest).catch((err) => console.log(err));
  };

  return (
    <div
      className="relative group drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      onClick={handleLogin}
    >
      <button className="w-[18rem] h-[3rem] text-base sm:w-[23rem] sm:h-[3.5rem] sm:text-lg lg:w-[26rem] lg:h-[4rem] lg:text-xl bg-[#ffffff]/80 group-hover:-rotate-3 transition-all rounded-[20px] font-onesize font-normal leading-4 tracking-wide text-[#0788FE] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        Sign in with KMUTT account
      </button>
      <img
        width="25"
        height="25"
        className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-200"
        src="/static/signin_assets/signin_heart_small.png"
        alt=""
      />
      <img
        width="30"
        height="30"
        className="absolute -top-5 right-0 opacity-0 group-hover:opacity-100 transition-all duration-200"
        src="/static/signin_assets/signin_heart_big.png"
        alt=""
      />
    </div>
  );
};

export default SignInButton;
