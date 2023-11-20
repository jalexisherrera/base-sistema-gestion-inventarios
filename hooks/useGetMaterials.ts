import { API_ROUTES, fetcher } from "@/service/apiConfig";
import { MaterialsQuery } from "@/types/material";
import useSWR from "swr";

const useGetMaterials = () => {
    const { data, isLoading, error } = useSWR<MaterialsQuery>(
        API_ROUTES.materials,
        fetcher
    );

    return {
        materials: data?.materials,
        materialsLoading: isLoading,
        materialsError: error,
    };
};

export { useGetMaterials }