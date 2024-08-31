import BaseTemplate from '../components/house/BaseTemplate';
import AuthRoute from '../middleware/AuthRoute';

const EpsilonHouse = () => {
  return (
    <AuthRoute>
      <BaseTemplate name="epsilon" />
    </AuthRoute>
  );
};

export default EpsilonHouse;
