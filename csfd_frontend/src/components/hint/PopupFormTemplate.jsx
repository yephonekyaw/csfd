import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useHintDataById } from '../../services/queries';
import { useTimer } from '../../hooks/useTimer';
import { useUpdateHintData } from '../../services/mutations';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { info_toast } from '../utils/ActivateToast';
import * as z from 'zod';
import TinyLoading from '../utils/TinyLoading';
import { helix } from 'ldrs';
helix.register();

const schema = z.object({
  hint_one: z
    .string()
    .min(1, { message: 'Short! Too cheap!' })
    .max(30, { message: 'Long! Too generous!' }),
  hint_two: z
    .string()
    .min(1, { message: 'Short! Too cheap!' })
    .max(30, { message: 'Long! Too generous!' }),
  hint_three: z
    .string()
    .min(1, { message: 'Short! Too cheap!' })
    .max(30, { message: 'Long! Too generous!' }),
  hint_four: z
    .string()
    .min(1, { message: 'Short! Too cheap!' })
    .max(30, { message: 'Long! Too generous!' }),
});

const hints = ['hint_one', 'hint_two', 'hint_three', 'hint_four'];

const PopupFormTemplate = ({
  ncode,
  nickname,
  status,
  toggleModal,
  server_time,
}) => {
  const queryClient = useQueryClient();
  const { isLoading, data, error } = useHintDataById(ncode);
  if (error) console.log(error.message);
  // form hook
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, dirtyFields },
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(schema),
  });
  // countdown timers
  const time_one = useTimer(
    new Date('2024-08-09T17:00:00').getTime(),
    new Date(server_time).getTime(),
  );
  const time_two = useTimer(
    new Date('2024-08-11T17:00:00').getTime(),
    new Date(server_time).getTime(),
  );
  const time_three = useTimer(
    new Date('2024-08-13T17:00:00').getTime(),
    new Date(server_time).getTime(),
  );
  const time_four = useTimer(
    new Date('2024-08-15T17:00:00').getTime(),
    new Date(server_time).getTime(),
  );
  // if session expired, use navigate
  const navigate = useNavigate();
  // mutation hook
  const { mutate, isPending } = useUpdateHintData(
    queryClient,
    ncode,
    toggleModal,
    reset,
    navigate,
  );

  const onSubmit = handleSubmit(async (formData) => {
    if (Object.keys(dirtyFields).length === 0) {
      info_toast('No change is made');
      return;
    }
    const refined_data = Object.entries(formData)
      .filter(([key, value]) => dirtyFields[key])
      .map(([key, value]) => {
        const db_index =
          key === 'hint_one'
            ? data.data[0].id
            : key === 'hint_two'
            ? data.data[1].id
            : key === 'hint_three'
            ? data.data[2].id
            : data.data[3].id;
        return { db_index, value };
      });
    mutate(refined_data);
  });

  if (isLoading) {
    return (
      <div className="w-[85vw] min-[430px]:w-[23rem] md:w-[40rem] h-screen bg-white flex flex-col items-center justify-center font-onesize px-8 py-6 gap-4 md:gap-6">
        <TinyLoading />
      </div>
    );
  }

  return (
    <div className="w-[85vw] min-[430px]:w-[23rem] md:w-[40rem] bg-white flex flex-col items-center justify-center font-onesize px-8 py-6 gap-4 md:gap-6">
      {/* Code name and Close button */}
      <div className="flex items-center justify-between w-full">
        <span className="text-2xl flex-1">
          {nickname + ' '}
          <span
            className={`${
              status ? 'text-[#E11833]' : 'text-[#53CC3A]'
            } text-base`}
          >
            {status ? 'Found' : 'Hidden'}
          </span>
        </span>
        <button
          onClick={(event) => {
            event.stopPropagation();
            toggleModal('close');
          }}
          className="outline-none group"
        >
          <svg
            className="group-hover:rotate-90 transition-transform"
            width="28"
            height="28"
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

      {/* Form */}
      <form
        onSubmit={(e) => e.preventDefault()}
        noValidate
        autoComplete="off"
        method="post"
        className="w-full flex flex-col items-center justify-center gap-2"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-8 w-full">
          {data.data.map((item, index) => (
            <div key={index} className="w-full flex flex-col relative">
              {/* Error Messages */}
              {errors[hints[index]] && (
                <div className="absolute top-0 right-0 text-sm text-[#A31400]">
                  {errors[hints[index]].message}
                </div>
              )}
              <label
                className="text-black text-sm md:text-base"
                htmlFor={item.id}
              >
                {`Hint ${index + 1}`}
              </label>
              <input
                {...register(hints[index])}
                className={`w-[100%] h-[3rem] border-2 ${
                  errors[hints[index]]
                    ? 'border-[#A31400]'
                    : 'border-[#C5C5C5] focus:border-[#6B6B6B]'
                } px-4 text-[#6B6B6B] text-base outline-none disabled:bg-[#C5C5C5] disabled:text-white transition-colors`}
                id={item.id}
                type="text"
                disabled={
                  status ||
                  (index === 0
                    ? !time_one
                    : index === 1
                    ? !time_two
                    : index === 2
                    ? !time_three
                    : !time_four)
                }
                defaultValue={data.data[index].description || 'Undefined'}
              />
              <label className="text-[#6B6B6B] text-sm" htmlFor={item.id}>
                {status
                  ? 'Immutable'
                  : index === 0
                  ? `${time_one ? `Immutable in ${time_one}` : 'Immutable'}`
                  : index === 1
                  ? `${time_two ? `Immutable in ${time_two}` : 'Immutable'}`
                  : index === 2
                  ? `${time_three ? `Immutable in ${time_three}` : 'Immutable'}`
                  : `${time_four ? `Immutable in ${time_four}` : 'Immutable'}`}
              </label>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="w-full flex items-center justify-around md:justify-end gap-2 md:gap-6 text-sm md:text-base mt-6">
          <button
            onClick={(event) => {
              event.stopPropagation();
              toggleModal('close');
              reset();
            }}
            disabled={isSubmitting || isPending}
            className="w-[7rem] h-[3rem] disabled:cursor-not-allowed bg-[#FFDBD6] text-[#A31400] hover:bg-[#FFBFB7] transition-colors rounded-md outline-none"
            type="button"
          >
            Close
          </button>
          <button
            onClick={onSubmit}
            disabled={isSubmitting || isPending || status}
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
      </form>
    </div>
  );
};

export default PopupFormTemplate;
