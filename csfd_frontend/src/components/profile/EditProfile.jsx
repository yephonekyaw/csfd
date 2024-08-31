import PropTypes from 'prop-types';
import { compose, isEmpty, not } from 'ramda';
import { helix } from 'ldrs';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useQueryProfile } from '../../services/queries';
import { useState } from 'react';
import { useUpdateProfileData } from '../../services/mutations';

import ProfileInput from './ProfileInput';

helix.register();

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/jpg',
  'image/heic',
  'image/heif',
];

const initProfile = (data) => {
  return {
    fullname: data?.data?.fullname,
    nickname: data?.data?.nickname,
    ig: data?.data?.insta_url ?? '',
    nationality: data?.data?.nationality ?? '',
  };
};

const defaultErrors = {
  avatar: '',
  fullname: '',
  nickname: '',
  ig: '',
  nationality: '',
};

const EditProfile = ({ toggleDialog }) => {
  const { isLoading, data } = useQueryProfile();

  const [errors, setErrors] = useState(defaultErrors);
  const [profile, setProfile] = useState(initProfile(data));

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isPending } = useUpdateProfileData(
    queryClient,
    navigate,
    toggleDialog,
  );

  const [preview, setPreview] = useState(
    () => data?.data?.profile_pic_name || '/static/profile_pic.png',
  );
  const [imgurl, setImgurl] = useState(
    () => data?.data?.profile_pic_name || '/static/profile_pic.png',
  );

  if (isLoading) return null;

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (!ALLOWED_MIME_TYPES.includes(file?.type)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        avatar: 'Incorrect file format',
      }));
    } else if (file?.size > 5242880) {
      setErrors((prevErrors) => ({ ...prevErrors, avatar: 'File too large' }));
    } else {
      setImgurl(file);
      setPreview(URL.createObjectURL(file));
      setErrors((prevErrors) => ({ ...prevErrors, avatar: '' }));
    }
  };

  const handlerFactory = (key) => (event) =>
    setProfile({ ...profile, [key]: event.target.value });

  const handleSubmit = () => {
    const igRegex = /^[\w](?!.*?\.{2})[\w.]{1,28}[\w]$/;
    const validIg = profile.ig.match(igRegex);

    setErrors((prevErrors) => ({
      ...prevErrors,
      fullname: isEmpty(profile.fullname) ? 'Please type your name' : '',
      nickname: isEmpty(profile.nickname) ? 'Please type your nickname' : '',
      nationality: isEmpty(profile.nationality)
        ? 'Please type your nationality'
        : '',
      ig: !validIg ? 'Invalid username' : '',
    }));

    // All passed
    if (
      isEmpty(errors.avatar) &&
      [profile.fullname, profile.nickname, profile.nationality].every(
        compose(not, isEmpty),
      ) &&
      validIg
    ) {
      const form = new FormData();
      form.append('fullname', profile.fullname);
      form.append('nickname', profile.nickname);
      form.append('insta_url', profile.ig);
      form.append('nationality', profile.nationality);
      form.append('avatar', imgurl);
      mutate(form);
    }
  };

  return (
    <>
      <div className=" bg-white flex flex-col text-left items-start font-onesize px-[1.5rem] py-[1.75rem] gap-[1.25rem]">
        <div className="w-full relative">
          <button
            onClick={(event) => {
              event.stopPropagation();
              toggleDialog('close');
            }}
            className="outline-none group absolute top-0 right-0"
          >
            <svg
              className="group-hover:rotate-90 transition-transform w-5 h-5 sm:w-8 sm:h-8 "
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
          <div className="flex flex-row gap-2 justify-start items-center mb-4 mt-4 sm:mt-6 ">
            <h1 className="text-[1.25rem] sm:text-[1.5rem] leading-8 sm:leading-10 ">
              Edit Profile
            </h1>
          </div>
        </div>

        <div>
          <h2 className="text-sm sm:text-[1rem] ">Profile Picture</h2>

          <div className="flex flex-row gap-3 sm:gap-6 mt-[0.3rem]">
            <img
              src={preview}
              alt="profile picture"
              className="w-[6rem] h-[6rem] rounded-lg object-cover "
            />
            <div className="flex flex-col justify-around text-left max-w-[9rem] sm:max-w-[21rem]">
              {errors.avatar.length > 0 ? (
                <p className="text-red-600 text-xs leading-4">
                  {errors.avatar}
                </p>
              ) : (
                <></>
              )}
              <p className="text-[#808080] text-[0.65rem] sm:text-[0.8rem] ">
                Please upload image size less than 5MB
              </p>
              {/* choose file button */}
              <input
                type="file"
                name="photourl"
                id="photourl"
                className="hidden"
                defaultValue=""
                onChange={handlePhotoUpload}
              />
              <label
                htmlFor="photourl"
                className="font-onesize text-[1rem] border-[#0788FE] border px-[1rem] py-[0.6rem] rounded-md text-center hover:bg-[#0788FE] text-[#0788FE] hover:text-white bg-white"
              >
                Upload Pic
              </label>
            </div>
          </div>
        </div>

        <ProfileInput
          label="Full Name"
          profile={profile}
          kind="fullname"
          handler={handlerFactory('fullname')}
          error={errors.fullname}
          placeholder="Enter your name"
        />

        <ProfileInput
          label="Nickname"
          profile={profile}
          kind="nickname"
          handler={handlerFactory('nickname')}
          error={errors.nickname}
          placeholder="Enter your nickname"
        />

        <ProfileInput
          label="Instagram username"
          profile={profile}
          kind="ig"
          handler={handlerFactory('ig')}
          error={errors.ig}
          placeholder="Enter your username"
        />

        <ProfileInput
          label="Nationality"
          profile={profile}
          kind="nationality"
          handler={handlerFactory('nationality')}
          error={errors.nationality}
          placeholder="Enter your nationality"
        />

        {/* two buttons */}
        <div className="flex flex-row justify-between w-full sm:justify-end sm:gap-3 items-center">
          <button
            onClick={(event) => {
              event.stopPropagation();
              toggleDialog('close');
            }}
            disabled={isPending}
            className="w-[7rem] h-[3rem] disabled:cursor-not-allowed bg-[#FFDBD6] text-[#A31400] hover:bg-[#FFBFB7] transition-colors rounded-md outline-none"
            type="button"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="w-[7rem] h-[3rem] disabled:cursor-not-allowed bg-[#0081FF] text-white hover:bg-[#004EE4] transition-colors rounded-md outline-none flex items-center justify-center"
            type="button"
          >
            {isPending ? (
              <l-helix size="25" speed="1" color="white"></l-helix>
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </div>
    </>
  );
};

EditProfile.propTypes = {
  toggleDialog: PropTypes.any,
};

export default EditProfile;
