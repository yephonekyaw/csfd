import { square } from 'ldrs';
square.register();

const Loading = ({ message }) => {
  return (
    <div className="flex gap-4 items-center justify-center min-h-[100vh]">
      <span className="font-onesize text-[2.5rem] md:text-5xl text-[#FCDA4E] stroke-black drop-shadow-[0_4px_0px_rgba(84,0,22,1)]">
        {message}
      </span>

      <l-square
        size="30"
        stroke="5"
        stroke-length="0.3"
        bg-opacity="0.3"
        speed="1"
        color="#FCDA4E"
      ></l-square>
    </div>
  );
};

export default Loading;
