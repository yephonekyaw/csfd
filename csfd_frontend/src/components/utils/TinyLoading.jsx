import { bouncy } from 'ldrs';
bouncy.register();

const TinyLoading = () => {
  return (
    <div className="font-onesize text-lg flex gap-3 text-[#FCDA4E] mt-12">
      <span>Loading</span>
      <l-bouncy size="40" speed="0.8" color="#FCDA4E"></l-bouncy>
    </div>
  );
};

export default TinyLoading;
