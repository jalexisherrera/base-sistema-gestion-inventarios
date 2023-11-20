import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Dropdown } from '@/components/ui/Buttons/Dropdown';
import { InventoryChart } from '@/components/ui/Charts/InventoryChart';
import { refetchInventories, useGetInventoryByMaterialId } from '@/hooks/useGetInventories';
import { useGetMaterials } from '@/hooks/useGetMaterials';
import React, { useState } from 'react';
import { KeyValuePair } from 'tailwindcss/types/config';

const InventoryPageWrapper = () => {
  return (
    <ProtectedRoute roleName="ADMIN">
      <InventoryPage />
    </ProtectedRoute>
  );
};

const InventoryPage = () => {
  const { materials, materialsError, materialsLoading } = useGetMaterials();
  const [materialSelected, setMaterialSelected] = useState<string | undefined>(materials?.at(0)?.id);
  const { inventories, inventoriesLoading, inventoriesError } = useGetInventoryByMaterialId(materialSelected);

  if (materialsLoading) return <div>Loading...</div>;

  if (materialsError) {
    return <div>Error al cargar los datos</div>;
  }

  if (materials?.length === 0 || materials === undefined) return <div>Debe crear al menos un material</div>;

  const materialsOptions: KeyValuePair<string, string>[] = materials.map((material) => {
    return { key: material.id, value: material.name };
  });

  const selectMaterial = async (selectedOption: string) => {
    setMaterialSelected(selectedOption);
    await refetchInventories();
  };

  if (inventoriesLoading) return <div>Loading...</div>;

  if (inventoriesError) return <div>Error al cargar los datos</div>;

  return (
    <div className="flex w-full flex-col items-center gap-3 p-10">
      <div className="flex w-full flex-col items-center gap-5">
        <h1>Inventory Management</h1>
        <Dropdown options={materialsOptions} onSelect={selectMaterial}></Dropdown>
        <section className="flex justify-center">
          <table cellSpacing="0">
            <thead>
              <tr>
                <th>Identifier</th>
                <th>Date</th>
                <th>Income</th>
                <th>Outcome</th>
                <th>Responsible</th>
              </tr>
            </thead>
            <tbody>
              {inventories?.map((inventory) => {
                return (
                  <tr key={inventory.id}>
                    <td>{inventory.id}</td>
                    <td>{inventory.createdAt.toLocaleString()}</td>
                    <td>{inventory.movementType === "ENTRADA" ? inventory.quantity : ''}</td>
                    <td>{inventory.movementType === "SALIDA" ? inventory.quantity : ''}</td>
                    <td>{inventory.createdBy.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
        <section className="flex justify-center">
          <InventoryChart inventories={inventories} />
        </section>
      </div>
    </div>
  );
};

export default InventoryPageWrapper;
