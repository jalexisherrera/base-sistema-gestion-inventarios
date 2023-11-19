import Image from "next/image";
//import { UserActions } from '@/components/users/UserActions';
import { useGetRoles } from "@/hooks/useGetRoles";
import { useGetUsers } from "@/hooks/useGetUsers";
import { useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import SideBar from "@/components/ui/SideBar";
import { UserActions } from "@/components/users/UserActions";

const UsersPageWrapper = () => {
  return (
    <ProtectedRoute roleName="ADMIN">
      <UsersPage />
    </ProtectedRoute>
  );
};

const UsersPage = () => {
  const { roles, rolesLoading } = useGetRoles();
  const { users, usersError, usersLoading } = useGetUsers();

  if (usersLoading || rolesLoading) return <div>Loading...</div>;

  if (usersError) return <div>Error al cargar los datos</div>;
  
  return (
    <ProtectedRoute roleName="ADMIN">
      <div className="flex w-full flex-col items-center gap-3 p-10">
        <div className="flex w-full flex-col items-center gap-5 pb-44">
          <h1>User Management</h1>
        </div>
        <section className="flex justify-center">
          <table cellSpacing="0">
            <thead>
              <tr>
                <th>Identifier</th>
                <th>Creation Date</th>
                <th>Email</th>
                <th>Role</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.emailVerified?.toString()}</td>
                    <td>{user.email}</td>
                    <td>
                      {roles?.find((el) => el.id === user.roleId)?.name ?? ""}
                    </td>
                    <td>
                    <UserActions user={user} />
                  </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </div>
    </ProtectedRoute>
  );
};

export default UsersPageWrapper;
