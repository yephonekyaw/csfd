const GameOver = () => {
  return (
    <div className="bg-white/80 flex flex-col items-center justify-center font-onesize mt-[3rem] px-4 pt-4 pb-6 rounded-xl">
      <span className="text-[3.2rem] text-[#E11833] drop-shadow-[0_4px_0_#540016] md:text-[4rem]">
        GAME OVER
      </span>
      <span className="text-sm md:text-base">Punishment awaits you!</span>
    </div>
  );
};

export default GameOver;
