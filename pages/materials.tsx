import { PrivateComponent } from '@/components/PrivateComponent';
import { PrimaryButton } from '@/components/ui/Buttons';
import { CreateMaterialDialog } from '@/components/ui/materials/CreateMaterialDialog';
import { useGetMaterials } from '@/hooks/useGetMaterials';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'

const MaterialsPage = () => {

  const { materials, materialsError, materialsLoading } = useGetMaterials();
  const user = (useSession()).data?.user
  const [openEditDialog, setOpenEditDialog] = useState(false);
  if (materialsLoading) return <div>Loading...</div>;

  if (materialsError) {
    return <div>Error al cargar los datos</div>;
  }

  return (
    <div className="flex w-full flex-col items-center gap-3 p-10">
      <div className="flex flex-col items-center gap-5">
        <h1>Material Management</h1>
        <PrivateComponent roleName="ADMIN">

          <div className='flex flex-col w-full items-end'>
            <PrimaryButton
              text="Add Material"
              loading={false}
              onClick={() => {
                setOpenEditDialog(true);
              }}
            />
          </div>
        </PrivateComponent>
        <section className="flex justify-center">
          <table cellSpacing="0">
            <thead>
              <tr>
                <th>Identifier</th>
                <th>Date</th>
                <th>Name</th>
                <th>Balance</th>
                <th>Responsible</th>
              </tr>
            </thead>
            <tbody>
              {materials?.map((material) => {
                return (
                  <tr key={material.id}>
                    <td>{material.id}</td>
                    <td>{material.createdAt?.toLocaleString()}</td>
                    <td>{material.name}</td>
                    <td>{material.quantity}</td>
                    <td>{material.createdBy?.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </div>
      <CreateMaterialDialog
        open={openEditDialog}
        setOpen={setOpenEditDialog}
        user={user}
      />
    </div>
  );
}

export default MaterialsPage