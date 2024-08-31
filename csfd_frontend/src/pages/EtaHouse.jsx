import BaseTemplate from '../components/house/BaseTemplate';
import AuthRoute from '../middleware/AuthRoute';

const EtaHouse = () => {
  return (
    <AuthRoute>
      <BaseTemplate name="eta" />
    </AuthRoute>
  );
};

export default EtaHouse;
