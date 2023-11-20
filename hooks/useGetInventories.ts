import { API_ROUTES, fetcher } from '@/service/apiConfig';
import { InventoriesQuery } from '@/types/inventory';
import useSWR, { mutate } from 'swr';

const refetchInventories = async () => {
  await mutate(API_ROUTES.users);
};

const useGetInventoryByMaterialId = (materialId?: string) => {
  const apiURL = `${API_ROUTES.inventories}?materialId=${materialId}`
  const { data, isLoading, error } = useSWR<InventoriesQuery>(
    apiURL,
    fetcher
  );

  return {
    inventories: data?.inventories,
    inventoriesLoading: isLoading,
    inventoriesError: error
  };
};

export { useGetInventoryByMaterialId, refetchInventories };
