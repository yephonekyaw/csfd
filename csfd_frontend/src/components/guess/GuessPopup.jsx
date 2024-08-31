import { forwardRef } from 'react';

const GuessPopup = forwardRef(({ children, custom_style }, ref) => {
  return (
    <dialog
      className={` outline-none ${
        custom_style
          ? 'bg-transparent rounded-none backdrop:bg-[#000000]/80'
          : 'backdrop:bg-[#000000]/30 rounded-xl'
      }`}
      ref={ref}
    >
      <div className="m-0 p-0">{children}</div>
    </dialog>
  );
});

export default GuessPopup;
