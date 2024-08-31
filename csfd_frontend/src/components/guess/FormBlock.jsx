import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateGuessData } from '../../services/mutations';
import { useNavigate } from 'react-router-dom';
import GuessPopup from './GuessPopup';
import { helix } from 'ldrs';
helix.register();

const ConfirmPopup = ({ toggleModal, isSubmitting, isPending, onSubmit }) => {
  return (
    <div className="w-[20rem] md:w-[30rem] bg-white flex flex-col items-center justify-center font-onesize px-8 py-6 gap-8">
      {/* Header and Close button */}
      <div className="flex items-center justify-between w-full">
        <span className="text-base md:text-lg flex-1">Confirm Action</span>
        <button
          onClick={(event) => {
            event.stopPropagation();
            toggleModal('close');
          }}
          className="outline-none group"
        >
          <svg
            className="group-hover:rotate-90 transition-transform"
            width="25"
            height="25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M5 5h2v2H5V5zm4 4H7V7h2v2zm2 2H9V9h2v2zm2 0h-2v2H9v2H7v2H5v2h2v-2h2v-2h2v-2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2v-2zm2-2v2h-2V9h2zm2-2v2h-2V7h2zm0 0V5h2v2h-2z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      <p className="text-sm md:text-base text-[#6B6B6B] justify-self-start w-full">
        By submitting, you will lose one heart.
      </p>

      {/* Button */}
      <div className="w-full flex items-center justify-around md:justify-end gap-2 md:gap-6 text-sm sm:text-base">
        <button
          onClick={(event) => {
            event.stopPropagation();
            toggleModal('close');
          }}
          disabled={isSubmitting || isPending}
          className="w-[7rem] h-[3rem] disabled:cursor-not-allowed bg-[#FFDBD6] text-[#A31400] hover:bg-[#FFBFB7] transition-colors rounded-md outline-none"
          type="button"
        >
          Close
        </button>
        <button
          onClick={onSubmit}
          disabled={isSubmitting || isPending}
          className="w-[7rem] h-[3rem] disabled:cursor-not-allowed bg-[#0081FF] text-white hover:bg-[#004EE4] transition-colors rounded-md outline-none flex items-center justify-center"
          type="button"
        >
          {isSubmitting || isPending ? (
            <l-helix size="25" speed="1" color="white"></l-helix>
          ) : (
            'Submit'
          )}
        </button>
      </div>
    </div>
  );
};

const FormBlock = ({ winOrLosePopupToggle }) => {
  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: 'onChange',
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const modalRef = useRef();

  const toggleModal = (state = null) => {
    if (!modalRef.current) return;
    if (state === 'close') {
      modalRef.current.close();
    } else if (state === 'open') {
      modalRef.current.showModal();
    }
  };
  const { mutate, isPending } = useUpdateGuessData(
    queryClient,
    navigate,
    winOrLosePopupToggle,
    toggleModal,
    reset,
  );

  const onSubmit = handleSubmit(async (data) => {
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    mutate(data.guess_code);
  });

  return (
    <form
      method="post"
      autoComplete="off"
      noValidate
      onSubmit={(e) => e.preventDefault()}
      className="w-full flex flex-col mt-[4rem] items-center gap-12 md:flex-row md:justify-center"
    >
      <div
        style={{
          boxShadow:
            '-9px 0 0 #d7aa8c, 0 -9px 0 #d3ac8e, 0 9px 0 #d7aa8c, 9px 0 0 #d5aa89, 0 18px 0 black, 18px 0 0 black',
        }}
        className="px-6 py-4 bg-[#F7E7CD] relative"
      >
        {errors.guess_code && (
          <div className="absolute font-onesize -top-1 right-[2rem] text-base text-[#A31400]">
            {errors.guess_code.message}
          </div>
        )}
        <input
          {...register('guess_code', {
            required: { value: true, message: 'Need five digits' },
            pattern: { value: /^\d{5}$/, message: 'Five digits only' },
          })}
          type="text"
          placeholder="Enter code"
          className={`w-[14rem] h-[3rem] border-2 ${
            errors.guess_code
              ? 'border-[#A31400]'
              : 'border-[#C5C5C5] focus:border-[#6B6B6B]'
          } px-4 text-[#6B6B6B] text-base font-onesize outline-none transition-colors`}
        />
      </div>
      <button
        style={{
          boxShadow:
            '-9px 0 0 #554E6B, 0 -9px 0 #554E6B, 0 9px 0 #554E6B, 9px 0 0 #554E6B, 0 18px 0 black, 18px 0 0 black',
        }}
        onClick={async () => {
          const result = await trigger('guess_code');
          if (result) {
            toggleModal('open');
          }
        }}
        type="button"
        className={`font-onesize outline-none text-base text-black hover:text-white bg-[#C8B8DF] hover:bg-[#6D49A0] px-10 py-3 transition-colors`}
      >
        Enter
      </button>
      {/* Confirm Popup */}
      <GuessPopup ref={modalRef}>
        <ConfirmPopup
          toggleModal={toggleModal}
          isSubmitting={isSubmitting}
          isPending={isPending}
          onSubmit={onSubmit}
        />
      </GuessPopup>
    </form>
  );
};

export default FormBlock;
