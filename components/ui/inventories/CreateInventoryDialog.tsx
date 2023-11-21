import { Dialog } from "@/components/ui/Dialog";
import { API_ROUTES } from "@/service/apiConfig";
import { User } from "@/types/user";
import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { PrimaryButton } from "@/components/ui/Buttons/PrimaryButton";
import { SecondaryButton } from "@/components/ui/Buttons/SecondaryButton";
import { useGetMaterials } from "@/hooks/useGetMaterials";
import { MovementType } from "@/types/inventory";
import { refetchInventories } from "@/hooks/useGetInventories";

interface CreateInventoryDialogProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    user: User;
}



const CreateInventoryDialog = ({ open, setOpen, user }: CreateInventoryDialogProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const { materials, materialsError, materialsLoading } = useGetMaterials();

    const inicialInventoryInformation = {
        movementType: "Select type movement",
        materialId: "Select type material",
        email: user.email,
        quantity: 0
    }

    const [inventoryInformation, setInventoryInformation] = useState(inicialInventoryInformation);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInventoryInformation((prevMaterial) => ({
            ...prevMaterial,
            [name]: value,
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setInventoryInformation((prevMaterial) => ({
            ...prevMaterial,
            [name]: value,
        }));
    };

    const createInventory = async (e: SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await axios.request({
                method: "POST",
                url: `${API_ROUTES.inventories}`,
                data: { ...inventoryInformation },
            });
            await refetchInventories();
            toast.success("Successfully created inventory");
        } catch (error) {
            toast.error("Error creating inventory");
        }

        setIsLoading(false);
        closeDialog();
    };

    const closeDialog = () => {
        setOpen(false);
        setInventoryInformation(inicialInventoryInformation)
    }

    if (materialsLoading) return <div>Loading...</div>;

    if (materialsError) {
        return <div>Error al cargar los datos</div>;
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)} title={`Create Inventory`}>
            <form className="flex flex-col gap-3" onSubmit={createInventory}>
                <label htmlFor="material">
                    <span>
                        Material <span className="text-red-500">*</span>
                    </span>
                    <select
                        name="materialId"
                        required
                        value={inventoryInformation.materialId}
                        onChange={(e) => handleSelectChange(e)
                        }
                    >
                        <option disabled>Select type material</option>
                        {materials?.map((material, index) => (
                            <option value={material.id} key={index}>
                                {material.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label htmlFor="movement-type">
                    <span>
                        Movement Type <span className="text-red-500">*</span>
                    </span>
                    <select
                        name="movementType"
                        required
                        value={inventoryInformation.movementType}
                        onChange={(e) => handleSelectChange(e)
                        }
                    >
                        <option disabled>Select type movement</option>
                        {Object.values(MovementType).map((movement, index) => (
                            <option value={movement} key={index}>
                                {movement}
                            </option>
                        ))}
                    </select>
                </label>
                <label htmlFor="quantity">
                    <span>
                        Quantity <span className="text-red-500">*</span>
                    </span>
                    <input
                        name='quantity'
                        type='number'
                        required
                        value={inventoryInformation.quantity}
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
                        onClick={() => closeDialog()}
                        text="Cancel"
                        loading={isLoading}
                        type="button"
                    />
                </div>
            </form>
        </Dialog>
    );
};

export { CreateInventoryDialog };
