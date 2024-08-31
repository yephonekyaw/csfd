import { useRef } from 'react';
import EditProfile from './EditProfile';
import { useQueryProfile } from '../../services/queries';
import { Link } from 'react-router-dom';
import { isEmpty, isNotEmpty } from 'ramda';

const Heart = ({ heartSrc }) => {
  return (
    <img
      src={heartSrc}
      alt="heart"
      className="w-[1.5rem] sm:w-[2rem] md:w-[2.5rem] h-[1.5rem] sm:h-[2rem] md:h-[2.5rem]"
    />
  );
};

const Hearts = ({ hearts }) => {
  return (
    <>
      {hearts.map((item, index) => (
        <Heart
          key={index}
          heartSrc={`${
            item
              ? '/static/hint_guess/remained_heart.png'
              : '/static/hint_guess/loss_heart.png'
          }`}
        />
      ))}
    </>
  );
};

const ProfilePanel = () => {
  const editProfileRef = useRef(null);
  const { isLoading, data, error, isSuccess } = useQueryProfile();
  if (isLoading || (isSuccess && !data?.data)) return null;
  if (error) console.error(error);
  let hearts =
    isSuccess && data.data.chances.length === 0
      ? [true, true, true]
      : new Array(data?.data?.chances[0]?.lives)
          .fill(true)
          .concat(new Array(3 - data?.data?.chances[0]?.lives).fill(false));

  const toggleDialog = (state = null) => {
    if (!editProfileRef.current) return;
    if (state === 'close') {
      editProfileRef.current.close();
    } else if (state === 'open') {
      editProfileRef.current.showModal();
    }
  };
  return (
    <>
      {/* wholeDiv */}
      <div className={`bg-[#A16A53] w-full h-50vh max-h-fit`}>
        {/* topDiv */}
        <div className="h-[13%] sm:h-[12vh] ">
          <img
            src="/static/profile/bg_one.png"
            alt="bg1"
            className="z-[2] w-full h-full bg-contain"
          />
        </div>
        {/* main Section */}
        <div className="w-full min-h-[75%] sm:min-h-[73vh] bg-[url('/static/profile/bg_two.png')] sm:bg-none md:bg-[url('/static/profile/bg_two.png')] sm:bg-cover md:bg-contain sm:px-8 md:px-12 sm:py-0">
          {/* py-[12vh] */}
          <div className="my-[1rem] md:my-[1.5rem] mx-[1.5rem] sm:mx-[4rem] md:mx-20 flex justify-center items-center flex-col text-center gap-[1rem] sm:gap-[2rem]">
            <h3 className="text-white font-onesize text-[2rem] sm:text-[2.5rem]">
              Player's Profile{' '}
            </h3>
            <div
              className={`shadow-lg bg-white rounded-xl sm:rounded-2xl min-w-[20rem] max-w-[fit-content] sm:min-w-[30rem] md:min-w-[40rem] flex items-center justify-center gap-[1rem] sm:gap-[1.5rem] md:gap-[3rem] py-[1rem] sm:py-[1.75rem] md:py-[2rem] px-[0.75rem] sm:px-[2rem] md:px-[3rem] relative`}
            >
              <div className="p-0 m-0 w-[50%] flex items-center justify-center">
                <img
                  src={`${
                    data.data.profile_pic_name === null
                      ? '/static/profile_pic.png'
                      : data.data.profile_pic_name
                  }`}
                  alt="sample"
                  className="w-[8rem] sm:w-[15rem] md:w-[17rem] h-[8rem] sm:h-[15rem] md:h-[17rem] rounded-xl sm:rounded-2xl md:rounded-3xl object-cover"
                />
              </div>
              <div className="max-w-[50%] overflow-auto flex flex-col text-left gap-[0.75rem] sm:gap-[1rem] font-onesize font-normal text-sm sm:text-base md:text-md lg:font-normal xl:text-xl mr-[0.5rem]">
                {/* hearts go here */}
                <div className="flex flex-row gap-2 sm:gap-4 ">
                  <Hearts hearts={hearts} />
                </div>
                <span>
                  <span className="font-semibold">House: </span>
                  {data?.data?.house || 'Nowhere'}
                </span>
                <span>
                  <span className="font-semibold">Fullname: </span>
                  {data?.data?.fullname || 'Someone'}
                </span>
                <span>
                  <span className="font-semibold">Nickname: </span>
                  {data?.data?.nickname || 'Somebody'}
                </span>
                <span>
                  <span className="font-semibold">IG: </span>
                  <Link
                    className="text-blue-400 underline hover:text-blue-500 transition-colors"
                    to={`https://www.instagram.com/${
                      isEmpty(data?.data?.insta_url)
                        ? ''
                        : data?.data?.insta_url
                    }`}
                    target="_blank"
                  >
                    {isNotEmpty(data?.data?.insta_url)
                      ? 'To Profile'
                      : 'No Url'}
                  </Link>
                </span>
                <span>
                  <span className="font-semibold">Nationality: </span>
                  {data?.data?.nationality || 'Somewhere'}
                </span>
              </div>

              {/* edit button  */}
              <div
                className="absolute top-[1rem] right-[1rem] hover:text-emerald-500 transition-colors"
                onClick={(event) => {
                  event.stopPropagation();
                  toggleDialog('open');
                }}
              >
                <svg
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-[1.5rem] sm:w-[2rem] h-[1.5rem] sm:h-[2rem]"
                >
                  <path
                    d="M18 2h-2v2h2V2zM4 4h6v2H4v14h14v-6h2v8H2V4h2zm4 8H6v6h6v-2h2v-2h-2v2H8v-4zm4-2h-2v2H8v-2h2V8h2V6h2v2h-2v2zm2-6h2v2h-2V4zm4 0h2v2h2v2h-2v2h-2v2h-2v-2h2V8h2V6h-2V4zm-4 8h2v2h-2v-2z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        {/* bottom div */}
        <div className="w-full h-[11%] sm:h-[11vh]">
          <img
            src="/static/profile/bg_three.png"
            alt="bg3"
            className="w-full h-full object-center"
          />
        </div>

        {/* modalPopup */}
        <dialog
          ref={editProfileRef}
          style={{
            scrollbarWidth: 'thin',
          }}
          className={`border-none outline-none rounded-xl sm:rounded-2xl backdrop:bg-[#000000]/30`}
        >
          <EditProfile toggleDialog={toggleDialog} />
        </dialog>
      </div>
    </>
  );
};

export default ProfilePanel;
