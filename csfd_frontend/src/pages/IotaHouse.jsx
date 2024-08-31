import BaseTemplate from '../components/house/BaseTemplate';
import AuthRoute from '../middleware/AuthRoute';

const IotaHouse = () => {
  return (
    <AuthRoute>
      <BaseTemplate name="iota" />
    </AuthRoute>
  );
};

export default IotaHouse;
