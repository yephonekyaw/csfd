import { useTimer } from '../../hooks/useTimer';
import { useHintDataById } from '../../services/queries';

const HintContent = ({ ncode, status, toggleModal, server_time }) => {
  const { data, error, isSuccess } = useHintDataById(ncode);
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

  if (error) console.log(error.message);

  return isSuccess ? (
    <div className="w-full h-full flex flex-col items-center py-2 px-4 gap-2">
      {/* Edit Button */}
      <div className="w-full flex justify-end">
        <button
          onClick={(event) => {
            event.stopPropagation();
            toggleModal('open');
          }}
          className="group outline-none"
        >
          <svg
            className="group-hover:text-emerald-500 transition-colors"
            width={32}
            height={32}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M18 2h-2v2h2V2zM4 4h6v2H4v14h14v-6h2v8H2V4h2zm4 8H6v6h6v-2h2v-2h-2v2H8v-4zm4-2h-2v2H8v-2h2V8h2V6h2v2h-2v2zm2-6h2v2h-2V4zm4 0h2v2h2v2h-2v2h-2v2h-2v-2h2V8h2V6h-2V4zm-4 8h2v2h-2v-2z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      {/* Hints */}
      <div className="flex flex-col items-center w-full font-onesize text-base gap-4">
        {/* One */}
        <span>{`${time_one ? `Immutable in ${time_one}` : 'Immutable'}`}</span>
        <input
          id="hint-one"
          className="w-[90%] h-[3.5rem] bg-[#D3AC8E] border-4 border-black text-center px-2 disabled:text-black read-only:text-black"
          type="text"
          value={data.data[0].description || 'Undefined'}
          readOnly
          disabled
        />
        {/* Two */}
        <span>{`${time_two ? `Immutable in ${time_two}` : 'Immutable'}`}</span>
        <input
          id="hint-two"
          className="w-[90%] h-[3.5rem] bg-[#D3AC8E] border-4 border-black text-center px-2 disabled:text-black read-only:text-black"
          type="text"
          value={data.data[1].description || 'Undefined'}
          readOnly
          disabled
        />
        {/* Three */}
        <span>{`${
          time_three ? `Immutable in ${time_three}` : 'Immutable'
        }`}</span>
        <input
          id="hint-three"
          className="w-[90%] h-[3.5rem] bg-[#D3AC8E] border-4 border-black text-center px-2 disabled:text-black read-only:text-black"
          type="text"
          value={data.data[2].description || 'Undefined'}
          readOnly
          disabled
        />
        {/* Four */}
        <span>{`${
          time_four ? `Immutable in ${time_four}` : 'Immutable'
        }`}</span>
        <input
          id="hint-four"
          className="w-[90%] h-[3.5rem] bg-[#D3AC8E] border-4 border-black text-center px-2 disabled:text-black read-only:text-black"
          type="text"
          value={data.data[3].description || 'Undefined'}
          readOnly
          disabled
        />
      </div>

      {/* Secret Status */}
      <div className="max-w-fit flex justify-center mt-4">
        {status ? (
          <div
            style={{
              boxShadow:
                '-9px 0 0 #540016, 0 -9px 0 #540016, 0 9px 0 #540016, 9px 0 0 #540016, 0 18px 0 black, 18px 0 0 black',
            }}
            className="bg-[#E11833] flex justify-center items-center py-1 px-5"
          >
            <span className="font-onesize text-lg text-white">Found</span>
          </div>
        ) : (
          <div
            style={{
              boxShadow:
                '-9px 0 0 #2E6E21, 0 -9px 0 #2E6E21, 0 9px 0 #2E6E21, 9px 0 0 #2E6E21, 0 18px 0 black, 18px 0 0 black',
            }}
            className="bg-[#53CC3A] flex justify-center items-center py-1 px-5"
          >
            <span className="font-onesize text-lg text-white">Hidden</span>
          </div>
        )}
      </div>
    </div>
  ) : null;
};

export default HintContent;
