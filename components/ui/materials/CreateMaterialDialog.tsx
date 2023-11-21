import { Dialog } from "@/components/ui/Dialog";
import { API_ROUTES } from "@/service/apiConfig";
import { User } from "@/types/user";
import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { PrimaryButton } from "@/components/ui/Buttons/PrimaryButton";
import { SecondaryButton } from "@/components/ui/Buttons/SecondaryButton";
import { refetchMaterials } from "@/hooks/useGetMaterials";

interface CreateMaterialDialogProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    user: User;
}

const CreateMaterialDialog = ({ open, setOpen, user }: CreateMaterialDialogProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [materialInformation, setMaterialInformation] = useState({
        name: "",
        quantity: 0,
        email: user.email
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMaterialInformation((prevMaterial) => ({
            ...prevMaterial,
            [name]: value,
        }));
    };

    const createMaterial = async (e: SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);
        if (materialInformation.name === "") {
            toast.error("Name is required");
            setIsLoading(false);
            return;
        }
        try {
            await axios.request({
                method: "POST",
                url: `${API_ROUTES.materials}`,
                data: { ...materialInformation },
            });
            await refetchMaterials();
            toast.success("Successfully created material");
        } catch (error) {
            toast.error("Error creating material");
        }

        setOpen(false);
        setIsLoading(false);
    };


    return (
        <Dialog open={open} onClose={() => setOpen(false)} title={`Create Material`}>
            <form className="flex flex-col gap-3" onSubmit={createMaterial}>
                <label htmlFor="material-name">
                    <span>
                        Name <span className="text-red-500">*</span>
                    </span>
                    <input
                        name='name'
                        type='text'
                        required
                        value={materialInformation.name}
                        onChange={handleInputChange}
                        className=" bg-gray-300"
                    />
                </label>
                <label htmlFor="material-quantity">
                    <span>
                        Quantity <span className="text-red-500">*</span>
                    </span>
                    <input
                        name='quantity'
                        type='number'
                        required
                        value={materialInformation.quantity}
                        onChange={handleInputChange}
                        className=" bg-gray-300"
                    />
                </label>
                <div className="flex gap-3 w-full justify-center">
                    <PrimaryButton
                        loading={isLoading}
                        text="Save"
                        type="submit"
                    />
                    <SecondaryButton
                        onClick={() => setOpen(false)}
                        text="Cancel"
                        loading={isLoading}
                        type="button"
                    />
                </div>
            </form>
        </Dialog>
    );
};

export { CreateMaterialDialog };
