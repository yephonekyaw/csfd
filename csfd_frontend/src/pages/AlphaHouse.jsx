import BaseTemplate from '../components/house/BaseTemplate';
import AuthRoute from '../middleware/AuthRoute';

const AlphaHouse = () => {
  return (
    <AuthRoute>
      <BaseTemplate name="alpha" />
    </AuthRoute>
  );
};

export default AlphaHouse;
