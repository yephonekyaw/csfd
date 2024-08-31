import Navbar from '../components/navbar/Navbar';
import HealthBar from '../components/guess/HealthBar';
import InfoSection from '../components/guess/InfoSection';
import FormBlock from '../components/guess/FormBlock';
import GameOver from '../components/guess/GameOver';
import Victory from '../components/guess/Victory';
import GuessPopup from '../components/guess/GuessPopup';
import GuessStatus from '../components/guess/GuessStatus';
import AuthRoute from '../middleware/AuthRoute';
import { useRef } from 'react';
import { useAllGuessData } from '../services/queries';

const BaseLayout = () => {
  const modalRef = useRef();
  const { data, error, isSuccess } = useAllGuessData();
  if (error) console.error(error.message);
  const reveal_date = new Date('2024-08-17T17:00:00');
  const current_date = new Date(data?.data?.server_time);

  const toggleModal = (state = null) => {
    if (!modalRef.current) return;
    if (state === 'open') {
      modalRef.current.showModal();
    } else if (state === 'close') {
      modalRef.current.close();
    }
  };

  return isSuccess ? (
    <div className="w-full min-h-[100vh] hint-guess-bg bg-[length:100%_100%] bg-no-repeat flex justify-center">
      <Navbar />
      {/* Main body goes here */}
      <div className="w-full flex flex-col items-center mt-[5rem] mb-12 relative">
        <HealthBar remaining_lives={data.data.chance_data.lives} />
        {/* Provided Hints Information */}
        <InfoSection
          hint_data={data.data.hint_data}
          server_time={data.data.server_time}
        />

        {/* Either FormBlock or GameOver or Victory */}
        {data.data.chance_data.status ? (
          <Victory winner />
        ) : current_date.getTime() - reveal_date.getTime() > 0 ? (
          <Victory />
        ) : data.data.chance_data.lives === 0 ? (
          <GameOver />
        ) : (
          <FormBlock winOrLosePopupToggle={toggleModal} />
        )}
      </div>
      <GuessPopup custom_style ref={modalRef}>
        <GuessStatus toggleModal={toggleModal} />
      </GuessPopup>
    </div>
  ) : null;
};

const GuessPage = () => {
  return (
    <AuthRoute>
      <BaseLayout />
    </AuthRoute>
  );
};

export default GuessPage;
