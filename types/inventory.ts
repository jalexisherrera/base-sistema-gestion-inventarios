import { Material } from "@/types/material";
import { User } from "@/types/user";

export interface Inventory {
    id: string;
    movementType: string;
    quantity: number;
    material: Material;
    createdBy: User
    createdAt: Date
}



export interface InventoriesQuery {
    inventories: Inventory[];
}

interface BalanceEntry {
    date: string;
    balance: number;
}

export const calculateBalance = (inventoryList: Inventory[]): BalanceEntry[] => {

    let balance = 0;
    const balanceEntries: BalanceEntry[] = [];

    for (const item of inventoryList) {
        if (item.movementType === "ENTRADA") {
            balance += item.quantity;
        } else if (item.movementType === "SALIDA") {
            balance -= item.quantity;
        }


        const fecha = new Date(item.createdAt).toLocaleDateString()
        balanceEntries.push({
            date: fecha,
            balance: balance,
        });
    }

    return balanceEntries;
}