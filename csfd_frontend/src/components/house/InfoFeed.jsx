import { useRef, useState } from 'react';
import { dependencies } from './dependencies';
import PopupModal from './PopupModal';
import ModalTemplate from './ModalTemplate';
import { useMemberIds, useMemberDataById, useHouseMembers } from '../../services/queries';
import { v4 as uuidv4 } from 'uuid';
import { or, isNil, isEmpty } from 'ramda';

const hasNoValue = or(isNil, isEmpty);

const DefaultCard = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-1 w-[8.5rem] h-[10rem] sm:w-[10rem] sm:h-[12rem] bg-white rounded-lg group hover:scale-105 transition-transform">
      <div className="w-[80%] h-[70%]">
        <svg
          className="w-full h-full text-gray-200 animate-pulse"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      <div className="w-[80%] bg-gray-200 h-[10%] rounded-xl animate-pulse"></div>
    </div>
  );
};

const InfoFeed = ({ house_name, batch }) => {
  const [modalContent, setModalContent] = useState(null);
  const modalRef = useRef(null);
  const { isLoading, data, error } = useHouseMembers(house_name, batch);
  // const { isLoading, data, error } = useMemberIds(house_name, batch);
  // if (error) console.log(error.message);
  // const memberDatas = useMemberDataById(data?.data);

  const toggleModal = (state = null) => {
    if (!modalRef.current) return;
    if (state === 'close') {
      modalRef.current.close();
    } else if (state === 'open') {
      modalRef.current.showModal();
    }
  };

  // return <code>{JSON.stringify(data, null, 2)}</code>

  // return <code>{data?.data.map(x => x.id)}</code>

  return (
    <>
      {/* New Feed */}
      <div className="w-[95%] min-[430px]:w-[90%] sm:w-[75%] md:w-[90%] lg:w-[90%] min-[1440px]:w-[72rem] bg-[#EDEDED]/70 rounded-[15px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 place-items-center px-5 py-12">
        {isLoading && Array.from({ length: 20 }).map(() => <DefaultCard key={uuidv4()} />)}
        {isLoading || data?.data.map((x) =>
            <div
              key={x.id}
              onClick={() => {
                setModalContent(x);
                toggleModal('open');
              }}
              className="flex flex-col items-center justify-center gap-1 w-[8.5rem] h-[10rem] sm:w-[10rem] sm:h-[12rem] bg-white rounded-lg group hover:scale-105 transition-transform"
            >
              <div className="max-w-[80%] max-h-[70%]">
                <img
                  className="w-full h-full object-cover"
                  src={`${
                    x.profile_pic_name === null
                      ? '/static/profile_pic.png'
                      : x.profile_pic_name
                  }`}
                  alt=""
                />
              </div>
              <div
                style={{
                  '--hover-text': dependencies[house_name].color_one,
                }}
                className="w-[60%] flex justify-center font-onesize text-base group-hover:text-[var(--hover-text)] transition-colors overflow-hidden"
              >
                <span className="max-w-full">{hasNoValue(x.nickname) ? '『 N/A 』' : x.nickname}</span>
              </div>
            </div>
        )}
      </div>
      {/* Popup Modal Box */}
      <PopupModal ref={modalRef}>
        <ModalTemplate
          toggleModal={toggleModal}
          modalContent={modalContent}
          house_name={house_name}
          batch={batch}
        />
      </PopupModal>
    </>
  );
};

export default InfoFeed;
