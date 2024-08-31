import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  withCredentials: true,
});

export const fetchAuth = async () => {
  return axiosInstance.get('/authorize').then((res) => res.data);
};

export const fetchProfileData = async () => {
  const result = await axiosInstance.get('/profile');

  return result.data;
};

export const fetchMembersIds = async (house, batch) => {
  return axiosInstance.get(`/feed/${house}/${batch}`).then((res) => res.data);
};

export const fetchHouseMembers = async (house, batch) => {
  const result = await axiosInstance.get(`/house/${house}?batch=${batch}`);

  return result.data;
};

export const fetchMemberDataById = async (id) => {
  return axiosInstance.get(`/feed/${id}`).then((res) => res.data);
};

export const fetchJuniorIds = async () => {
  return axiosInstance.get('/hints').then((res) => res.data);
};

export const fetchHintDataById = async (junior_id) => {
  return axiosInstance.get(`/hints/${junior_id}`).then((res) => res.data);
};

export const updateHintData = async (data) => {
  return axiosInstance.put('/hints', { data: data }).then((res) => res.data);
};

export const fetchAllGuessData = async () => {
  return axiosInstance.get('/guess').then((res) => res.data);
};

export const updateGuessData = async (code) => {
  return axiosInstance.put('/guess', { code: code }).then((res) => res.data);
};

export const fetchSeniorData = async () => {
  return axiosInstance.get('/guess/senior').then((res) => res.data);
};

// to update profile data
export const updateProfileData = async (data) => {
  return axiosInstance.putForm('/profile', data).then((res) => res.data);
};
