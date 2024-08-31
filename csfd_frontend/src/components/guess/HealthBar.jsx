const HealthBar = ({ remaining_lives }) => {
  const hearts = new Array(remaining_lives)
    .fill(true)
    .concat(new Array(3 - remaining_lives).fill(false));
  return (
    <div
      style={{
        boxShadow:
          '-9px 0 0 #d7aa8c, 0 -9px 0 #d3ac8e, 0 9px 0 #d7aa8c, 9px 0 0 #d5aa89, 0 18px 0 black, 18px 0 0 black',
      }}
      className="bg-[#F7E7CD] flex items-center justify-center gap-1 p-2 md:absolute md:flex-col md:top-[1rem] md:right-[8%] lg:right-[15%] xl:right-[8%]"
    >
      {hearts.map((item, index) => (
        <img
          key={index}
          width={45}
          height={45}
          src={`${
            item
              ? '/static/hint_guess/remained_heart.png'
              : '/static/hint_guess/loss_heart.png'
          }`}
        />
      ))}
    </div>
  );
};

export default HealthBar;
