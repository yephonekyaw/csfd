import { useSeniorData } from '../../services/queries';
import { Link } from 'react-router-dom';
import { isEmpty, isNotEmpty } from 'ramda';

const Victory = ({ winner }) => {
  const { isLoading, data, isSuccess } = useSeniorData();
  if (isLoading) return null;
  return (
    isSuccess && (
      <div className="flex flex-col items-center justify-center font-onesize mt-[1rem]">
        {winner ? (
          <span className="text-[3.2rem] text-[#FFF671] drop-shadow-[0_4px_0_#B76100] md:text-[4rem]">
            VICTORY
          </span>
        ) : (
          <span className="text-[3.2rem] text-[#E11833] drop-shadow-[0_4px_0_#540016] md:text-[4rem]">
            FAILED
          </span>
        )}
        <div className="flex flex-col w-[20rem] md:w-[28rem] items-center justify-center bg-white gap-2 p-4 rounded-xl">
          <span className="text-sm md:text-base text-black">
            This is your P'code
          </span>
          <div className="flex items-center justify-center gap-4">
            <div className="max-w-[40%] h-full">
              <img
                className="w-full h-full object-cover rounded-xl"
                src={`${
                  data?.data?.profile_pic_name === null
                    ? '/static/profile_pic.png'
                    : data?.data?.profile_pic_name
                }`}
                alt=""
              />
            </div>
            <div className="flex w-[60%] flex-col justify-start gap-1 text-sm md:text-base overflow-auto">
              <p>
                <span className="font-semibold">House: </span>
                {data?.data?.house}
              </p>
              <p>
                <span className="font-semibold">Fullname: </span>
                {data?.data?.fullname}
              </p>
              <p>
                <span className="font-semibold">Nickname: </span>
                {data?.data?.nickname}
              </p>
              <p>
                <span className="font-semibold">IG: </span>
                <Link
                  className="text-blue-400 underline hover:text-blue-500 transition-colors"
                  to={`https://www.instagram.com/${
                    isEmpty(data?.data?.insta_url) ? '' : data?.data?.insta_url
                  }`}
                  target="_blank"
                >
                  {isNotEmpty(data?.data?.insta_url) ? 'To Profile' : 'No Url'}
                </Link>
              </p>
              <p>
                <span className="font-semibold">Nationality: </span>
                {data?.data?.nationality || 'Somewhere'}
              </p>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    )
  );
};

export default Victory;
