import { Dialog } from "@/components/ui/Dialog";
import { API_ROUTES } from "@/service/apiConfig";
import { User } from "@/types/user";
import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { PrimaryButton } from "@/components/ui/Buttons/PrimaryButton";
import { SecondaryButton } from "@/components/ui/Buttons/SecondaryButton";
import { refetchMaterials, useGetMaterials } from "@/hooks/useGetMaterials";
import { MovementType } from "@/types/inventory";

interface CreateInventoryDialogProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    user: User;
}



const CreateInventoryDialog = ({ open, setOpen, user }: CreateInventoryDialogProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const { materials, materialsError, materialsLoading } = useGetMaterials();

    const [inventoryInformation, setInventoryInformation] = useState({
        movementType: "",
        materialId: "",
        email: user.email,
        quantity: 0
    });

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
            await refetchMaterials();
            toast.success("Successfully created inventory");
        } catch (error) {
            toast.error("Error creating inventory");
        }

        setOpen(false);
        setIsLoading(false);
    };

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
                        name="material"
                        required
                        value={inventoryInformation.materialId}
                        onChange={(e) => handleSelectChange(e)
                        }
                    >
                        <option disabled>Select type movement</option>
                        {materials?.map((material) => (
                            <option value={material.id} key={material.id}>
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
                        onClick={() => setOpen(false)}
                        text="Cancel"
                        loading={isLoading}
                    />
                </div>
            </form>
        </Dialog>
    );
};

export { CreateInventoryDialog };
