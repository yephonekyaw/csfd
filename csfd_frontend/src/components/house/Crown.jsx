const Crown = () => {
  return (
    <div className="absolute -top-[2rem] -left-[0.5rem] w-[2.5rem] h-auto -rotate-[15deg]">
      <svg className="w-full h-full" viewBox="0 0 512 512">
        <polygon
          fill="#FFEA8A"
          points="0,443.733 0,68.267 17.067,68.267 136.533,187.733 256,68.267 375.467,187.733 
	494.933,68.267 512,68.267 512,443.733 "
        />
        <polygon
          fill="#FFDB2D"
          points="494.933,68.267 375.467,187.733 256.002,68.267 256,68.267 256,443.733 512,443.733 
	512,68.267 "
        />
      </svg>
    </div>
  );
};

export default Crown;
