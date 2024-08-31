import { useRef } from 'react';
import { Toaster } from 'sonner';
import HintContent from './HintContent';
import CustomPopup from './CustomPopup';
import PopupFormTemplate from './PopupFormTemplate';

const HintCard = ({ ncode, nickname, status, server_time }) => {
  const modalRef = useRef(null);

  const toggleModal = (state = null) => {
    if (!modalRef.current) return;
    if (state === 'close') {
      modalRef.current.close();
    } else if (state === 'open') {
      modalRef.current.showModal();
    }
  };

  return (
    <>
      <div className="w-full h-fit flex items-center flex-col">
        {/* Hint Name Tag */}
        <div
          style={{
            backgroundImage: 'url(static/hint_guess/hint_tag.png)',
          }}
          className="z-[80] w-[12rem] h-[8rem] font-onesize text-base bg-[length:100%_100%] flex items-center justify-center"
        >
          <span className="-translate-y-1">{nickname}</span>
        </div>
        <div
          style={{
            boxShadow:
              '-9px 0 0 #d7aa8c, 0 -9px 0 #d3ac8e, 0 9px 0 #d7aa8c, 9px 0 0 #d5aa89, 0 18px 0 black, 18px 0 0 black',
          }}
          className="w-[85vw] min-[430px]:w-[23rem] h-[36rem] -translate-y-[3.8rem] bg-[#F7E7CD]"
        >
          <HintContent
            ncode={ncode}
            status={status}
            toggleModal={toggleModal}
            server_time={server_time}
          />
        </div>
      </div>
      <CustomPopup ref={modalRef}>
        <PopupFormTemplate
          ncode={ncode}
          nickname={nickname}
          status={status}
          toggleModal={toggleModal}
          server_time={server_time}
        />
      </CustomPopup>
    </>
  );
};

export default HintCard;
