const SignInBackground = (props) => {
  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center justify-center relative">
      {/* Sky layer */}
      <div className="absolute w-full h-[70vh] top-0 left-0">
        <img
          className="w-full h-full object-fill object-[bottom_center]"
          src="/static/signin_assets/sky.png"
          alt=""
        />
      </div>
      {/* Grass layer */}
      <div className="absolute w-full h-[30vh] bottom-0 left-0">
        <img
          className="w-full h-full object-cover object-[top_center]"
          src="/static/signin_assets/grass.png"
          alt=""
        />
      </div>
      {/* Alpha mascot */}
      <div className="absolute left-[2rem] bottom-[30vh] w-[6rem] lg:w-[8rem] h-auto">
        <img
          className="w-full h-full object-fill"
          src="/static/signin_assets/alpha.png"
          alt=""
        />
      </div>

      {/* Querstion Mark */}
      <div className="absolute left-[8.5rem] lg:left-[12rem] bottom-[30vh] w-[2.5rem] lg:w-[4rem] h-auto">
        <img
          className="w-full h-full object-fill"
          src="/static/signin_assets/question_mark.png"
          alt=""
        />
      </div>

      {/* Iota mascot */}
      <div className="absolute right-[2rem] bottom-[30vh] w-[6.5rem] lg:w-[9rem] h-auto">
        <img
          className="w-full h-full object-fill"
          src="/static/signin_assets/iota.png"
          alt=""
        />
      </div>

      {/* Left platform */}
      <div className="absolute left-0 top-[20vh] w-[8rem] lg:w-[10rem] h-auto">
        <img
          className="w-full h-full object-fill"
          src="/static/signin_assets/left_platform.png"
          alt=""
        />
      </div>

      {/* Epsilon mascot */}
      <div className="absolute left-0 top-[20vh] w-[6rem] lg:w-[8rem] h-auto translate-x-10 -translate-y-16 lg:-translate-y-24">
        <img
          className="w-full h-full object-fill"
          src="/static/signin_assets/epsilon.png"
          alt=""
        />
      </div>

      {/* Two block */}
      <div className="hidden min-[430px]:block absolute left-[10rem] lg:left-[12rem] top-[25vh] w-[6rem] lg:w-[8rem] h-auto">
        <img
          className="w-full h-full object-fill"
          src="/static/signin_assets/two_block.png"
          alt=""
        />
      </div>

      {/* Right platform */}
      <div className="absolute right-0 top-[30vh] w-[8rem] lg:w-[10rem] h-auto">
        <img
          className="w-full h-full object-fill"
          src="/static/signin_assets/right_platform.png"
          alt=""
        />
      </div>

      {/* Eta mascot */}
      <div className="absolute right-0 top-[30vh] w-[6rem] lg:w-[8rem] h-auto -translate-x-14 -translate-y-16 lg:-translate-y-24">
        <img
          className="w-full h-full object-fill"
          src="/static/signin_assets/eta.png"
          alt=""
        />
      </div>

      {/* Coin platform */}
      <div className="hidden min-[430px]:block absolute right-[6rem] md:right-[12rem] top-[15vh] w-[10rem] lg:w-[12rem] h-auto">
        <img
          className="w-full h-full object-fill"
          src="/static/signin_assets/coin_platform.png"
          alt=""
        />
      </div>

      {/* Logo and Button */}
      <div className="w-full h-screen flex flex-col items-center justify-center gap-8">
        <div className="w-[12rem] h-[8rem] sm:w-[14rem] sm:h-[10rem] lg:w-[16rem] lg:h-[12rem] z-[70]">
          <img
            className="w-full h-full object-fill"
            src="/static/signin_assets/signin_logo.png"
            alt=""
          />
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default SignInBackground;
