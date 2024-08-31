import { useQuery, useQueries } from '@tanstack/react-query';
import {
  fetchAuth,
  fetchProfileData,
  fetchHouseMembers,
  fetchMembersIds,
  fetchMemberDataById,
  fetchJuniorIds,
  fetchHintDataById,
  fetchAllGuessData,
  fetchSeniorData,
} from './api';

export const useAuth = () => {
  return useQuery({
    queryKey: ['auth'],
    queryFn: fetchAuth,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useQueryProfile = () => {
  return useQuery({
    queryKey: ['profile-data'],
    queryFn: fetchProfileData,
  });
};


export const useMemberIds = (house, batch) => {
  return useQuery({
    queryKey: ['info-feed', house, batch],
    queryFn: () => fetchMembersIds(house, batch),
  });
};

export const useMemberDataById = (ids) => {
  return useQueries({
    queries: ids
      ? ids.map((id) => {
          return {
            queryKey: ['info-feed', id.id],
            queryFn: () => fetchMemberDataById(id.id),
          };
        })
      : [],
  });
};

export const useHouseMembers = (house, batch) => {
  return useQuery({
    queryKey: ['house-members', house, batch],
    queryFn: () => fetchHouseMembers(house, batch),
  })
}

export const useJuniorIds = () => {
  return useQuery({
    queryKey: ['hints', 'all'],
    queryFn: fetchJuniorIds,
  });
};

export const useHintDataById = (junior_id) => {
  return useQuery({
    queryKey: ['hints', junior_id],
    queryFn: () => fetchHintDataById(junior_id),
  });
};

export const useAllGuessData = () => {
  return useQuery({
    queryKey: ['guess-all'],
    queryFn: fetchAllGuessData,
  });
};

export const useSeniorData = () => {
  return useQuery({
    queryKey: ['senior-data'],
    queryFn: fetchSeniorData,
  });
};
