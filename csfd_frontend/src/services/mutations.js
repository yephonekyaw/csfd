import { useMutation } from '@tanstack/react-query';
import { updateProfileData, updateHintData, updateGuessData } from './api';
import {
  success_toast,
  error_toast,
  info_toast,
} from '../components/utils/ActivateToast';

const handleSessionError = (error, navigate) => {
  (error.message.includes('401') || error.message.includes('403')) &&
    info_toast('Session expired');
  setInterval(() => {
    (error.message.includes('401') || error.message.includes('403')) &&
      navigate('/signin', { replace: true });
  }, 3000);
};

export const useUpdateProfileData = (queryClient, navigate, toggleDialog) => {
  return useMutation({
    mutationFn: (data) => updateProfileData(data),
    onError: (error) => {
      handleSessionError(error, navigate);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['profile-data'],
      });
      success_toast('Profile updated');
      toggleDialog('close');
    },
  });
};

export const useUpdateHintData = (
  queryClient,
  ncode,
  toggleModal,
  reset,
  navigate,
) => {
  return useMutation({
    mutationFn: (data) => updateHintData(data),
    onError: (error) => {
      handleSessionError(error, navigate);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['hints', ncode],
      });
      success_toast('Hints updated');
      toggleModal('close');
      reset();
    },
  });
};

export const useUpdateGuessData = (
  queryClient,
  navigate,
  winOrLosePopupToggle,
  toggleModal,
  reset,
) => {
  return useMutation({
    mutationFn: (code) => updateGuessData(code),
    onError: (error) => {
      handleSessionError(error, navigate);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['guess-all'],
      });
      queryClient.invalidateQueries({
        queryKey: ['senior-data'],
      });
      info_toast('Code submitted');
      toggleModal('close');
      winOrLosePopupToggle('open');
      reset();
    },
  });
};
