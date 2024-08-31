import Navbar from '../components/navbar/Navbar';
import HintCard from '../components/hint/HintCard';
import AuthRoute from '../middleware/AuthRoute';
import { useJuniorIds } from '../services/queries';
import { Toaster } from 'sonner';

const BaseLayout = () => {
  const { data, error, isSuccess } = useJuniorIds();
  if (error) console.log(error.message);
  return isSuccess ? (
    <div className="w-full min-h-[100vh] hint-guess-bg bg-[length:100%_100%] bg-no-repeat flex justify-center">
      <Navbar />
      <div className="flex flex-col lg:flex-row lg:gap-32 xl:gap-40 mt-[3rem] lg:mt-[6rem] mb-12">
        {data?.data?.map((item) => (
          <HintCard
            key={item.id}
            ncode={item.id}
            nickname={item.nickname}
            status={item.status}
            server_time={data?.server_time}
          />
        ))}
      </div>
      <Toaster richColors />
    </div>
  ) : null;
};

const HintsPage = () => {
  return (
    <AuthRoute>
      <BaseLayout />
    </AuthRoute>
  );
};

export default HintsPage;
