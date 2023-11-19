import { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { User } from "@/types";
import { EditUserDialog } from "@/components/users/EditUserDialog";

interface UserActionsProps {
  user: User;
}

const UserActions = ({ user }: UserActionsProps) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);

  return (
    <div className="text-3xl flex gap-2">
      <button
        type="button"
        onClick={() => {
          setOpenEditDialog(true);
        }}
      >
        <MdModeEditOutline className="text-gray-600 hover:text-yellow-600 hover:cursor-pointer" />
      </button>

      <EditUserDialog
        open={openEditDialog}
        setOpen={setOpenEditDialog}
        user={user}
      />
    </div>
  );
};

export { UserActions };
