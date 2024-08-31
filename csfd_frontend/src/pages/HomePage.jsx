import Navbar from '../components/navbar/Navbar';
import SignInBackground from '../components/signin/SignInBackground';
import ProfilePanel from '../components/profile/ProfilePanel';
import SelectionCarousel from '../components/carousel/SelectionCarousel';
import HomeGuessBlock from '../components/guess/HomeGuessBlock';
import AuthRoute from '../middleware/AuthRoute';
import { Toaster } from 'sonner';

function HomePage() {
  return (
    <AuthRoute>
      <div className="">
        <Navbar />
        <SignInBackground />
        <ProfilePanel />
        <SelectionCarousel />
        <HomeGuessBlock />
        <Toaster richColors />
      </div>
    </AuthRoute>
  );
}

export default HomePage;
