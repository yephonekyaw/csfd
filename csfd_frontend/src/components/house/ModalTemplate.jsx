import { dependencies } from './dependencies';
import { Link } from 'react-router-dom';
import Crown from './Crown';
import TinyLoading from '../utils/TinyLoading';
import { isEmpty, isNotEmpty } from 'ramda';

const ModalTemplate = ({ toggleModal, modalContent, house_name, batch }) => {
  if (!modalContent) return <TinyLoading />;
  return (
    <div className="flex flex-col items-center justify-center bg-white w-full min-[430px]:w-[23rem] h-[28rem] md:w-[28rem] md:h-[30rem] border px-4 min-[430px]:px-6 md:px-10 font-onesize gap-4 py-4 md:py-6">
      {/* Close icon */}
      <div className="text-black w-full flex justify-end">
        <button
          onClick={(event) => {
            event.stopPropagation();
            toggleModal('close');
          }}
          className="outline-none group"
        >
          <svg
            className="group-hover:rotate-90 transition-transform"
            width="28"
            height="28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M5 5h2v2H5V5zm4 4H7V7h2v2zm2 2H9V9h2v2zm2 0h-2v2H9v2H7v2H5v2h2v-2h2v-2h2v-2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2v-2zm2-2v2h-2V9h2zm2-2v2h-2V7h2zm0 0V5h2v2h-2z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
      {/* Header */}
      <div
        style={{
          backgroundColor: dependencies[house_name].modal_color,
        }}
        className="w-full rounded-full h-[41px] md:h-[50px] flex items-center justify-center text-xl my-1 relative"
      >
        {dependencies[house_name].leaders.includes(modalContent.id) && (
          <Crown />
        )}
        CS {batch}
        <span className="ml-2 text-base">
          {modalContent.name === 'Hayfa Barron' ? 'Leader' : ''}
        </span>
      </div>
      {/* Information */}
      <div className="w-full flex flex-1 gap-4 items-center overflow-hidden">
        <div className="max-w-[50%] h-full">
          <img
            className="w-full h-full object-cover rounded-xl"
            src={`${
              modalContent.profile_pic_name === null
                ? '/static/profile_pic.png'
                : modalContent.profile_pic_name
            }`}
            alt=""
          />
        </div>
        <div className="flex flex-col text-base md:text-lg gap-2 w-[50%] overflow-auto">
          <p>
            <span className="font-semibold">House: </span>
            {house_name[0].toUpperCase() + house_name.slice(1)}
          </p>
          <p>
            <span className="font-semibold">Fullname: </span>
            {modalContent.fullname}
          </p>
          <p>
            <span className="font-semibold">Nickname: </span>
            {modalContent.nickname}
          </p>

          <p>
            <span className="font-semibold">IG: </span>
            <Link
              className="text-blue-400 underline hover:text-blue-500 transition-colors"
              to={`https://www.instagram.com/${isEmpty(modalContent.insta_url) ? '' : modalContent.insta_url}`}
              target="_blank"
            >
              {isNotEmpty(modalContent.insta_url) ? 'To Profile' : 'No Url'}
            </Link>
          </p>
          <p>
            <span className="font-semibold">Nationality: </span>
            {modalContent.nationality || 'Somewhere'}
          </p>
          <p>
            <span className="font-semibold">Code: </span>
            {modalContent.id.toString().slice(0, 2) +
              modalContent.id.toString().slice(8)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModalTemplate;
