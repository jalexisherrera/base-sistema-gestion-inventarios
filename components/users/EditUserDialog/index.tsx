import { Dialog } from "@/components/ui/Dialog";
import { API_ROUTES } from "@/service/apiConfig";
import { User } from "@/types/user";
import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useGetRoles } from "@/hooks/useGetRoles";
import { refetchUsers } from "@/hooks/useGetUsers";
import { PrimaryButton } from "@/components/ui/Buttons/PrimaryButton";
import { SecondaryButton } from "@/components/ui/Buttons/SecondaryButton";

interface EditUserDialogInterface {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  user: User;
}

const EditUserDialog = ({ open, setOpen, user }: EditUserDialogInterface) => {
  const { roles, rolesLoading } = useGetRoles();
  const [userInformation, setUserInformation] = useState({
    roleId: user.roleId,
    email: user.email,
  });

  const [editLoading, setEditLoading] = useState(false);

  const updateUser = async (e: SyntheticEvent) => {
    e.preventDefault();
    setEditLoading(true);

    if (
      userInformation.roleId !== user.roleId
    ) {
      try {
        await axios.request({
          method: "PUT",
          url: `${API_ROUTES.users}/${user.id}`,
          data: { roleId: userInformation.roleId },
        });
        await refetchUsers();
        toast.success("Successfully updated user");
      } catch (error) {
        toast.error("Error updating user");
      }
    }
    setOpen(false);
    setEditLoading(false);
  };

  if (rolesLoading) return <div>Loading...</div>;

  return (
    <Dialog open={open} onClose={() => setOpen(false)} title={`Edit User ${user.name}`}>
      <form className="flex flex-col gap-3" onSubmit={updateUser}>
        <label htmlFor="user-name">
          <span>Email</span>
          <input
            name='user-name'
            type='email'
            defaultValue={user.email}
            value={userInformation.email}
            className=" bg-gray-300 pointer-events-none"
          />
        </label>
        <label htmlFor="user-role">
          <span>
            Rol <span className="text-red-500">*</span>
          </span>
          <select
            name="user-role"
            required
            defaultValue={user.roleId}
            value={userInformation.roleId}
            onChange={(e) => {
              setUserInformation({
                ...userInformation,
                roleId: e.target.value,
              });
            }}
          >
            <option disabled>Seleccione un rol</option>
            {roles?.map((role) => {
              return (
                <option value={role.id} key={role.id}>
                  {role.name}
                </option>
              );
            })}
          </select>
        </label>

        <div className="flex gap-3 w-full justify-center">
          <PrimaryButton
            loading={editLoading}
            text="Save"
            onClick={() => { }}
            type="submit"
          />
          <SecondaryButton
            onClick={() => setOpen(false)}
            text="Cancel"
            loading={editLoading}
          />
        </div>
      </form>
    </Dialog>
  );
};

export { EditUserDialog };
