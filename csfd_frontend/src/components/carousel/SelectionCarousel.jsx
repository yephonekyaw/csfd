import { useSpring, animated, easings } from '@react-spring/web';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SelectionCarousel = () => {
  const [leftMostIndex, setLeftMostIndex] = useState(0);
  const [rightMostIndex, setRightMostIndex] = useState(3);
  const navigate = useNavigate();
  const houses = ['Alpha', 'Epsilon', 'Eta', 'Iota'];

  const [alpha, alphaApi] = useSpring(() => ({
    from: { x: 0 },
  }));

  const [epsilon, epsilonApi] = useSpring(() => ({
    from: { x: 0 },
  }));

  const [eta, etaApi] = useSpring(() => ({
    from: { x: 0 },
  }));

  const [iota, iotaApi] = useSpring(() => ({
    from: { x: 0 },
  }));

  /**
    0 alpha 3: 0 -> 100, 2: 100 -> 200, 1: 200 -> 300, 0: 300 -> 0 
    
    1 epsilon 3: 0 -> 100, 2: 100 -> 200, 1: 200 -> -100, 0: -100 -> 0
    
    2 eta 3: 3: 0 -> 100, 2: 100 -> -200, 1: -200 -> -100, 0: -100 -> 0

    3 iota 3: 0 -> -300, 2: -300 -> -200, 1: -200 -> -100, 0: -100 -> 0
   */

  const initiateLeftMoveAnimation = (api, index) => {
    api.start({
      from: {
        x:
          rightMostIndex < index
            ? `-${100 * (rightMostIndex + 1)}%`
            : rightMostIndex === index
            ? `${300 - 100 * index}%`
            : `${300 - 100 * rightMostIndex}`,
      },
      to: {
        x:
          rightMostIndex < index
            ? `-${100 * rightMostIndex}`
            : rightMostIndex === index
            ? `-${100 * index}%`
            : `${300 - 100 * (rightMostIndex - 1)}%`,
      },
      config: {
        duration: 1000,
        easing: easings.easeInOutSine,
      },
    });
  };

  const initiateRightMoveAnimation = (api, index) => {
    api.start({
      from: {
        x:
          leftMostIndex < index
            ? `${0 - 100 * leftMostIndex}%`
            : leftMostIndex === index
            ? `-${100 * index}%`
            : `${300 - 100 * (leftMostIndex - 1)}%`,
      },
      to: {
        x:
          leftMostIndex < index
            ? `-${100 * (leftMostIndex + 1)}%`
            : leftMostIndex === index
            ? `${300 - 100 * index}%`
            : `${300 - 100 * leftMostIndex}%`,
      },
      config: {
        duration: 1000,
        easing: easings.easeInOutSine,
      },
    });
  };

  const centerIndex = () => (leftMostIndex + 1) % 4;

  const handleLeftMove = () => {
    initiateLeftMoveAnimation(alphaApi, 0);
    initiateLeftMoveAnimation(epsilonApi, 1);
    initiateLeftMoveAnimation(etaApi, 2);
    initiateLeftMoveAnimation(iotaApi, 3);
    setLeftMostIndex((prev) => (((prev - 1) % 4) + 4) % 4);
    setRightMostIndex((prev) => (((prev - 1) % 4) + 4) % 4);
  };

  const handleRightMove = () => {
    initiateRightMoveAnimation(alphaApi, 0);
    initiateRightMoveAnimation(epsilonApi, 1);
    initiateRightMoveAnimation(etaApi, 2);
    initiateRightMoveAnimation(iotaApi, 3);
    setLeftMostIndex((prev) => (prev + 1) % 4);
    setRightMostIndex((prev) => (prev + 1) % 4);
  };

  return (
    <div className="w-full h-screen overflow-hidden relative">
      {/* Title */}
      <div
        id="carousel-title"
        className="absolute left-0 right-0 mx-auto top-[10vh] font-onesize text-white text-[2rem] text-center"
      >
        Select House
      </div>
      {/* Forest Layer */}
      <div className="w-full h-[70vh]">
        <img
          className="w-full h-full object-cover object-center"
          src="/static/carousel/forest.png"
          alt=""
        />
      </div>
      {/* Platform layer */}
      <div className="w-full h-[30vh]">
        <img
          className="w-full h-full object-cover object-[top_center]"
          src="/static/carousel/platform.png"
          alt=""
        />
      </div>
      {/* Left floating platform */}
      <div className="absolute left-0 top-[15vh] w-[7rem] sm:w-[10rem] h-auto">
        <img
          className="w-full h-full object-cover"
          src="/static/carousel/left_float.png"
          alt=""
        />
      </div>
      {/* Right floating platform */}
      <div className="absolute right-0 top-[10vh] w-[7rem] sm:w-[10rem] h-auto">
        <img
          className="w-full h-full object-cover"
          src="/static/carousel/right_float.png"
          alt=""
        />
      </div>
      {/* Sign post */}
      <div className="absolute left-0 bottom-[30vh] w-[4rem] h-auto">
        <img src="/static/carousel/sign_post.png" alt="" />
      </div>
      {/* Right lamp */}
      <div className="absolute right-0 bottom-[30vh] w-[6rem] h-auto">
        <img src="/static/carousel/right_lamp.png" alt="" />
      </div>
      {/* Carousel */}
      <div className="absolute left-0 right-0 bottom-[30vh] mx-auto flex flex-col items-center justify-center gap-2">
        {/* Name tag */}
        <div className='flex items-start justify-center font-onesize text-lg bg-[url("/static/carousel/name_tag.png")] w-[10rem] h-[5rem] bg-center bg-cover landscape:w-[8rem] landscape:h-[4rem]'>
          <span className="mt-3">{houses[(leftMostIndex + 1) % 4]}</span>
        </div>
        {/* House selection */}
        <div className="flex items-end justify-center relative">
          <div className="w-[10rem] h-[10rem] absolute top-0 left-0 right-0 mx-auto rounded-full bg-white blur-xl" />
          <animated.div
            style={alpha}
            className={`w-[10rem] h-[10rem] ml-[10rem] z-[80] flex items-end justify-center`}
          >
            <img
              className={`object-cover transition-all duration-1000 ${
                centerIndex() === 0
                  ? 'w-full h-full'
                  : 'w-[50%] h-[50%] md:w-[55%] md:h-[55%]'
              }`}
              src="/static/carousel/alpha_mascot.png"
              alt=""
            />
          </animated.div>
          <animated.div
            style={epsilon}
            className={`w-[10rem] h-[10rem] z-[80] flex items-end justify-center`}
          >
            <img
              className={`object-cover transition-all duration-1000 ${
                centerIndex() === 1
                  ? 'w-full h-full'
                  : 'w-[50%] h-[50%] md:w-[55%] md:h-[55%]'
              }`}
              src="/static/carousel/epsilon_mascot.png"
              alt=""
            />
          </animated.div>
          <animated.div
            style={eta}
            className={`w-[10rem] h-[10rem] z-[80] flex items-end justify-center`}
          >
            <img
              className={`object-cover transition-all duration-1000 ${
                centerIndex() === 2
                  ? 'w-full h-full'
                  : 'w-[50%] h-[50%] md:w-[55%] md:h-[55%]'
              }`}
              src="/static/carousel/eta_mascot.png"
              alt=""
            />
          </animated.div>
          <animated.div
            style={iota}
            className={`w-[10rem] h-[10rem] z-[80] flex items-end justify-center`}
          >
            <img
              className={`object-cover transition-all duration-1000 ${
                centerIndex() === 3
                  ? 'w-full h-full'
                  : 'w-[50%] h-[50%] md:w-[55%] md:h-[55%]'
              }`}
              src="/static/carousel/iota_mascot.png"
              alt=""
            />
          </animated.div>
        </div>
      </div>
      {/* Button group */}
      <div className="absolute left-0 right-0 bottom-[30vh] translate-y-[6rem] mx-auto flex items-center justify-center gap-6">
        {/* Left button */}
        <button
          onClick={handleLeftMove}
          className="px-2 py-1 font-medium bg-[#EB6965] text-white rounded-md w-fit transition-all shadow-[3px_3px_0px_black] hover:bg-[#C94D43] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
        >
          <svg
            width={30}
            height={30}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M20 11v2H8v2H6v-2H4v-2h2V9h2v2h12zM10 7H8v2h2V7zm0 0h2V5h-2v2zm0 10H8v-2h2v2zm0 0h2v2h-2v-2z"
              fill="currentColor"
            />
          </svg>
        </button>
        {/* Middle button */}
        <button
          onClick={() => {
            const center = centerIndex();
            navigate(
              `/house/${
                center === 0
                  ? 'alpha'
                  : center === 1
                  ? 'epsilon'
                  : center === 2
                  ? 'eta'
                  : 'iota'
              }`,
            );
          }}
          className="font-onesize text-lg px-8 py-2 rounded-xl border-2 border-dashed border-[#F9D0C8] bg-[#EB6965] text-white transition-all duration-300 hover:bg-[#C94D43] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-none hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-xl active:shadow-none"
        >
          VISIT
        </button>
        {/* Right button */}
        <button
          onClick={handleRightMove}
          className="px-2 py-1 font-medium bg-[#EB6965] text-white rounded-md w-fit transition-all shadow-[3px_3px_0px_black] hover:bg-[#C94D43] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
        >
          <svg
            width={30}
            height={30}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M4 11v2h12v2h2v-2h2v-2h-2V9h-2v2H4zm10-4h2v2h-2V7zm0 0h-2V5h2v2zm0 10h2v-2h-2v2zm0 0h-2v2h2v-2z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
      ;
    </div>
  );
};

export default SelectionCarousel;
