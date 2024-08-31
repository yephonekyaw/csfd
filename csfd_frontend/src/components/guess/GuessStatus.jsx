import { useAllGuessData } from '../../services/queries';
import { useSeniorData } from '../../services/queries';

const GuessStatus = ({ toggleModal }) => {
  const { isLoading, data, error } = useAllGuessData();
  const { data: seniorData, error: seniorErr } = useSeniorData();
  const hearts = new Array(data?.data?.chance_data?.lives)
    .fill(true)
    .concat(new Array(3 - data?.data?.chance_data?.lives).fill(false));

  if (error) console.error(error);
  if (seniorErr) console.error(seniorErr);
  if (isLoading) return null;

  return data.data.chance_data.status ? (
    <button
      onClick={() => toggleModal('close')}
      style={{
        backgroundImage: 'url(/static/hint_guess/confetti.gif)',
        backgroundPosition: '100%',
        backgroundSize: 'cover',
      }}
      className="font-onesize w-[85vw] h-[85vh] border-2 border-black border-dashed flex flex-col items-center justify-center outline-none gap-4"
    >
      <span className="text-[3rem] text-[#FFD600] drop-shadow-[0_4px_0_#B76100] text-center">
        MISSION COMPLETE!
      </span>

      <img
        className="w-[10rem] h-[10rem] border-[0.5rem] border-[#554E6B] object-cover object-center rounded-full"
        src={`${
          seniorData?.data?.profile_pic_name || '/static/profile_pic.png'
        }`}
        alt=""
      />

      <div className="flex flex-col items-center justify-center">
        <span className="text-[2rem] text-[#0788FE]">
          {seniorData?.data?.nickname || 'Someone'}
        </span>
        <span className="text-[1.5rem] text-white">is your P'code!</span>
      </div>

      <div className="flex items-center gap-4 mt-[1rem]">
        <div className="w-[3.5rem] h-[2px] bg-white" />
        <span className="text-sm text-white">TAP HERE TO CLOSE</span>
        <div className="w-[3.5rem] h-[2px] bg-white" />
      </div>
    </button>
  ) : (
    <button
      onClick={() => toggleModal('close')}
      className="font-onesize w-[85vw] h-[85vh] border-2 border-black border-dashed flex flex-col items-center justify-center outline-none gap-4"
    >
      {/* Health Bar */}
      <div className="flex items-center justify-center gap-1">
        {hearts.map((item, index) => (
          <img
            key={index}
            width={50}
            height={50}
            src={`${
              item
                ? '/static/hint_guess/remained_heart.png'
                : '/static/hint_guess/loss_heart.png'
            }`}
          />
        ))}
      </div>
      <span className="text-[4rem] text-[#E11833] drop-shadow-[0_4px_0_#540016] text-center">
        {data.data.chance_data.lives > 0 ? 'MISSION FAILED' : 'GAME OVER'}
      </span>
      <span className="text-xl text-white">
        {data.data.chance_data.lives > 0
          ? 'Try again!'
          : 'Punishment awaits you!'}
      </span>

      <div className="flex items-center gap-4 mt-[1rem]">
        <div className="w-[3.5rem] h-[2px] bg-white" />
        <span className="text-sm text-white">TAP HERE TO CLOSE</span>
        <div className="w-[3.5rem] h-[2px] bg-white" />
      </div>
    </button>
  );
};

export default GuessStatus;
