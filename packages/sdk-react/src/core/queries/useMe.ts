import {
  isIndividualEntity,
  isOrganizationEntity,
} from '@/components/counterparts/helpers';
import { useMoniteContext } from '@/core/context/MoniteContext';

export const useMe = () => {
  const { api } = useMoniteContext();

  return api.entityUsers.getEntityUsersMe.useQuery(
    {},
    {
      retry: false,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useMyEntity = () => {
  const { api } = useMoniteContext();

  return api.entityUsers.getEntityUsersMyEntity.useQuery(
    {},
    {
      retry: false,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useMyEntityName = () => {
  const { data: myEntity } = useMyEntity();

  if (isOrganizationEntity(myEntity)) return myEntity.organization.legal_name;
  else if (isIndividualEntity(myEntity))
    return myEntity.individual.first_name + ' ' + myEntity.individual.last_name;
  return '';
};