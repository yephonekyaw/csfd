import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center py-8">
      <div className="w-[20rem] h-auto">
        <img
          className="w-full h-full object-fill"
          src="/static/404_mascot.webp"
          alt=""
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="font-onesize text-[2rem] sm:text-[3.5rem] bg-clip-text text-transparent bg-gradient-to-r from-[#870000] to-[#480048]">
          YOU FOUND 404.
        </p>
        <p className="font-onesize text-[2rem] sm:text-[3.5rem] bg-clip-text text-transparent bg-gradient-to-l from-[#870000] to-[#480048]">
          I FOUND YOU!
        </p>
        <button
          onClick={() => {
            navigate('/', { replace: true });
          }}
          className="rounded-2xl border-2 border-dashed border-black px-6 py-3 font-onesize text-lg sm:text-xl text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-none hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-none active:shadow-none"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#870000] to-[#480048]">
            RUN NOW!
          </span>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
