import { useNavigate } from 'react-router-dom';
import { useQueryProfile } from '../../services/queries';

const HomeGuessBlock = () => {
  const navigate = useNavigate();
  const { isFetching, data, error } = useQueryProfile();
  if (isFetching) return null;
  if (error) console.log(error.message);
  const role = data?.data?.role || 'spectator';
  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center justify-center gap-4 bg-[url('/static/hint_guess/home_guess_bg_mb.png')] md:bg-[url('/static/hint_guess/home_guess_bg_tb.png')] lg:bg-[url('/static/hint_guess/home_guess_bg_desk.png')] bg-no-repeat bg-center bg-[length:100%_100%]">
      <div className="flex flex-col items-center justify-center font-onesize text-[3rem] sm:text-[4rem]">
        <span
          style={{
            WebkitTextStrokeWidth: '1px',
            WebkitTextStrokeColor: 'black',
          }}
          className="text-[#FCDA4E] drop-shadow-[0_4px_0_#540016]"
        >
          {role === 'senior' ? 'MAKE LIFE' : 'GUESS YOUR'}
        </span>
        <span
          style={{
            WebkitTextStrokeWidth: '1px',
            WebkitTextStrokeColor: 'black',
          }}
          className="text-[#F08BBD] drop-shadow-[0_4px_0_#540016]"
        >
          {role === 'senior' ? 'DIFFICULT' : "P'CODE"}
        </span>
      </div>

      <div
        onClick={(e) => {
          e.preventDefault();
          role === 'senior' ? navigate('/hints') : navigate('/guess');
        }}
        className="relative group drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      >
        <button className="w-[18rem] h-[3rem] text-base sm:w-[23rem] sm:h-[3.5rem] sm:text-lg lg:w-[26rem] lg:h-[4rem] lg:text-xl bg-[#ffffff]/80 group-hover:-rotate-3 transition-all rounded-[20px] font-onesize font-normal leading-4 tracking-wide text-[#0788FE] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          {role === 'senior' ? "LET'S GIVE HINTS" : "LET'S FIND OUT"}
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
    </div>
  );
};

export default HomeGuessBlock;
