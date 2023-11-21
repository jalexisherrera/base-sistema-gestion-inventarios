import { PrivateComponent } from '@/components/PrivateComponent';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { PrimaryButton } from '@/components/ui/Buttons';
import { Dropdown } from '@/components/ui/Buttons/Dropdown';
import { InventoryChart } from '@/components/ui/Charts/InventoryChart';
import { CreateInventoryDialog } from '@/components/ui/inventories/CreateInventoryDialog';
import { refetchInventories, useGetInventoryByMaterialId } from '@/hooks/useGetInventories';
import { useGetMaterials } from '@/hooks/useGetMaterials';
import { useSession } from 'next-auth/react';
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
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const { inventories, inventoriesLoading, inventoriesError } = useGetInventoryByMaterialId(materialSelected);
  const user = (useSession()).data?.user

  if (materialsLoading) return <div>Loading...</div>;

  if (materialsError) {
    return <div>Error loading data</div>;
  }

  if (materials?.length === 0 || materials === undefined) return <div>You must create at least one material</div>;

  const materialsOptions: KeyValuePair<string, string>[] = materials.map((material) => {
    return { key: material.id, value: material.name };
  });

  const selectMaterial = async (selectedOption: string) => {
    setMaterialSelected(selectedOption);
    await refetchInventories();
  };

  if (inventoriesLoading) return <div>Loading...</div>;

  if (inventoriesError) return <div>Error loading data</div>;

  return (
    <div className="flex w-full flex-col items-center gap-3 p-10">
      <div className="flex flex-col items-center gap-5">
        <h1>Inventory Management</h1>
        <div className='flex flex-row w-full justify-between'>
          <Dropdown options={materialsOptions} onSelect={selectMaterial}></Dropdown>

          <PrivateComponent roleName="ADMIN">
              <PrimaryButton
                text="Add Inventory"
                loading={false}
                onClick={() => {
                  setOpenCreateDialog(true);
                }}
              />
          </PrivateComponent>
        </div>
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
      <CreateInventoryDialog
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
        user={user}
      />
    </div>
  );
};

export default InventoryPageWrapper;
