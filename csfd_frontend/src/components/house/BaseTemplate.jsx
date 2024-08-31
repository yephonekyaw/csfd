import { useState } from 'react';
import { dependencies } from './dependencies';
import InfoFeed from './InfoFeed';
import Navbar from '../navbar/Navbar';

const BaseTemplate = (props) => {
  const house_name = props.name;
  const [nextBatch, setNextBatch] = useState(false);
  return (
    <div
      id={`${house_name}-base-template`}
      className="w-full min-h-[100vh] flex flex-col items-center bg-no-repeat bg-[length:100%_100%]"
    >
      <Navbar />
      {/* Main body goes here */}
      <div className="flex flex-col items-center mt-[5.5rem] sm:mt-[6rem] mb-12 w-full">
        {/* House Detail Card */}
        <div
          style={{
            boxShadow:
              '-9px 0 0 #d7aa8c, 0 -9px 0 #d3ac8e, 0 9px 0 #d7aa8c, 9px 0 0 #d5aa89, 0 18px 0 black, 18px 0 0 black',
          }}
          className="relative w-[90%] min-[430px]:w-[23rem] h-[12.5rem] sm:w-[30rem] sm:h-[15rem] lg:w-[32rem] bg-[#F7E7CD] flex items-center justify-center gap-2 lg:gap-4"
        >
          {/* Mascot */}
          <div className="flex w-[6rem] h-[6rem] sm:w-[8rem] sm:h-[8rem] relative">
            <img
              style={{ zIndex: 80 }}
              src={`/static/house/${house_name}/mascot.png`}
              alt=""
            />
            <div className="w-[100%] h-[100%] absolute top-0 left-0 rounded-full bg-white blur-md" />
          </div>

          {/* Description */}
          <div className="flex flex-col w-[65%] font-onesize text-xs sm:text-sm gap-1">
            <div className="flex text-white gap-1">
              <span
                style={{
                  padding: '0.25rem',
                  backgroundColor: dependencies[house_name].color_one,
                }}
              >
                {dependencies[house_name].tag_one}
              </span>
              <span
                style={{
                  padding: '0.25rem',
                  backgroundColor: dependencies[house_name].color_two,
                }}
              >
                {dependencies[house_name].tag_two}
              </span>
              <span
                style={{
                  padding: '0.25rem',
                  backgroundColor: dependencies[house_name].color_three,
                }}
              >
                {dependencies[house_name].tag_three}
              </span>
            </div>
            <div className="text-black">
              <p>
                <span
                  style={{
                    color: dependencies[house_name].color_one,
                  }}
                >
                  {dependencies[house_name].start_with}
                </span>
                {dependencies[house_name].description}
              </p>
            </div>
          </div>

          {/* Name Tag */}
          <div className="flex items-center justify-center absolute top-0 left-0 right-0 mx-auto -translate-y-[2rem] w-[6.5rem] h-[3.5rem] sm:w-[9rem] sm:h-[4.5rem] bg-[url('/static/house/house_name_tag.png')] bg-[length:100%_100%] bg-no-repeat">
            <span className="font-onesize text-base sm:text-xl -mt-[1.3rem] lg:-mt-[1.5rem]">
              {house_name.charAt(0).toUpperCase() + house_name.slice(1)}
            </span>
          </div>
        </div>

        {/* All Member Cards */}
        <div className="w-full relative mt-[4.5rem]">
          {/* Batch Name Tag */}
          <div className="w-[15rem] absolute left-0 right-0 mx-auto flex items-center justify-center -translate-y-[2.5rem]">
            <div onClick={() => setNextBatch(false)}>
              <img
                width={45}
                height={45}
                className={`hover:scale-[1.15] transition-all ${
                  nextBatch
                    ? 'pointer-events-auto opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-[2rem] pointer-events-none'
                }`}
                src="/static/house/left_play_btn.png"
                alt=""
              />
            </div>
            <div className="relative w-[9rem] h-[4.5rem] font-onesize text-base sm:text-xl bg-[url('/static/house/batch_name_tag.png')] bg-no-repeat bg-cover -translate-y-2">
              <span
                className={`mt-3 sm:mt-2 absolute w-full h-full flex items-center justify-center pb-3 sm:pb-1 transition-all ${
                  nextBatch
                    ? 'opacity-0 -translate-x-[2rem] pointer-events-none'
                    : 'opacity-100 translate-x-0 pointer-events-auto'
                }`}
              >
                CS 24
              </span>
              <span
                className={`mt-3 sm:mt-2 absolute w-full h-full flex items-center justify-center pb-3 sm:pb-1 transition-all ${
                  nextBatch
                    ? 'opacity-100 translate-x-0 pointer-events-auto'
                    : 'opacity-0 translate-x-[2rem] pointer-events-none'
                }`}
              >
                CS 25
              </span>
            </div>
            <div onClick={() => setNextBatch(true)}>
              <img
                width={45}
                height={45}
                className={`hover:scale-[1.15] transition-all ${
                  nextBatch
                    ? 'opacity-0 -translate-x-[2rem] pointer-events-none'
                    : 'pointer-events-auto opacity-100 translate-x-0'
                }`}
                src="/static/house/right_play_btn.png"
                alt=""
              />
            </div>
          </div>

          {/* Cards */}
          {/* CS 24 */}
          <div
            className={`${nextBatch ? 'hidden' : 'w-full flex justify-center'}`}
          >
            <InfoFeed batch={24} house_name={house_name} />
          </div>

          {/* CS 25 */}
          <div
            className={`${nextBatch ? 'w-full flex justify-center' : 'hidden'}`}
          >
            <InfoFeed batch={25} house_name={house_name} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseTemplate;
