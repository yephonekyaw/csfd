import PropTypes from 'prop-types';

const ProfileInput = ({
  label,
  profile,
  kind,
  handler,
  error,
  placeholder,
}) => {
  return (
    <div className="flex flex-col w-full">
      <h2 className="text-sm sm:text-[1rem] ">{label}</h2>
      <input
        className={`rounded-md w-[100%] h-[3rem] border-[3px] px-4 text-[#6B6B6B] text-sm sm:text-[1rem] outline-none focus:border-[#6B6B6B]/80 transition-colors`}
        type="text"
        placeholder={profile[kind] || placeholder}
        value={profile[kind]}
        onChange={handler}
      />
      {error ? <p className="text-sm text-red-600">{error}</p> : <></>}
    </div>
  );
};

ProfileInput.propTypes = {
  label: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired,
  kind: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default ProfileInput;
