import { forwardRef } from 'react';

const CustomPopup = forwardRef(({ children }, ref) => {
  return (
    <dialog
      className="backdrop:bg-[#000000]/30 outline-none rounded-xl"
      ref={ref}
    >
      <div className="m-0 p-0">{children}</div>
    </dialog>
  );
});

export default CustomPopup;
