import { useTimer } from '../../hooks/useTimer';
import { useQueryClient } from '@tanstack/react-query';

const HintInfo = ({ content, timer, color_from, color_to }) => {
  const queryClient = useQueryClient();
  if (!timer) {
    queryClient.invalidateQueries({
      queryKey: ['guess-all'],
    });
  }
  return (
    <div
      style={{
        boxShadow:
          '-9px 0 0 #312656, 0 -9px 0 #312656, 0 9px 0 #312656, 9px 0 0 #312656',
      }}
      className="w-[7rem] h-[8.5rem] md:w-[8rem] md:h-[10rem] relative bg-white flex items-center justify-center"
    >
      <p className="max-w-full max-h-full font-onesize text-sm p-2 overflow-auto text-center break-all">
        {content.description || 'Undefined'}
      </p>
      {/* Curtain */}
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, ${color_from}, ${color_to})`,
        }}
        className={`w-full h-full absolute top-0 left-0 ${
          timer === null
            ? 'pointer-events-none scale-0'
            : 'pointer-events-auto scale-100'
        } transition-all duration-1000 flex flex-col items-center justify-center`}
      >
        <img
          className="object-cover"
          width={60}
          height={60}
          src="/static/hint_guess/lock_star.png"
          alt=""
        />
        <p className="w-full font-onesize text-sm p-2 text-center">
          {`${timer ? `In ${timer}` : 'Unlocked'}`}
        </p>
      </div>
    </div>
  );
};

const InfoSection = ({ hint_data, server_time }) => {
  const time_one = useTimer(
    new Date('2024-08-09T17:00:00').getTime(),
    new Date(server_time).getTime(),
  );
  const time_two = useTimer(
    new Date('2024-08-11T17:00:00').getTime(),
    new Date(server_time).getTime(),
  );
  const time_three = useTimer(
    new Date('2024-08-13T17:00:00').getTime(),
    new Date(server_time).getTime(),
  );
  const time_four = useTimer(
    new Date('2024-08-15T17:00:00').getTime(),
    new Date(server_time).getTime(),
  );
  return (
    <div
      style={{
        boxShadow:
          '-9px 0 0 #d7aa8c, 0 -9px 0 #d3ac8e, 0 9px 0 #d7aa8c, 9px 0 0 #d5aa89, 0 18px 0 black, 18px 0 0 black',
      }}
      className="relative bg-[#F7E7CD] mt-[4rem] grid grid-cols-2 gap-10 py-12 px-8 md:mt-[1rem] md:gap-14 md:py-14 lg:px-12 lg:py-16 xl:px-8 xl:grid-cols-4"
    >
      {/* Name Tag */}
      <div className="flex items-center justify-center absolute top-0 left-0 right-0 mx-auto -translate-y-[2rem] w-[9rem] h-[4.5rem] bg-[url('/static/house/house_name_tag.png')] bg-[length:100%_100%] bg-no-repeat">
        <span className="font-onesize text-xl -mt-[1.5rem]">Hints</span>
      </div>
      <HintInfo
        content={hint_data[0]}
        timer={time_one}
        color_from="#67CFF5"
        color_to="#0275E0"
      />
      <HintInfo
        content={hint_data[1]}
        timer={time_two}
        color_from="#FC96B2"
        color_to="#FFB982"
      />
      <HintInfo
        content={hint_data[2]}
        timer={time_three}
        color_from="#FFB882"
        color_to="#89AEF4"
      />
      <HintInfo
        content={hint_data[3]}
        timer={time_four}
        color_from="#43DA94"
        color_to="#E6B3FB"
      />
    </div>
  );
};

export default InfoSection;
