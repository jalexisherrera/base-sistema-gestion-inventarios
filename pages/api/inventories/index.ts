// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { InventoryMovement } from "@prisma/client";
import prisma from "@/service/prisma";
import { checkPrivateApi } from "@/utils/checkServerSession";

type Data = {
    inventories?: InventoryMovement[];
    message?: string;
    createdInventory?: InventoryMovement;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        await checkPrivateApi(req, res);

        if (req.method === "GET") {
            const { materialId } = req.query;

            if (!materialId) {
                return res.status(400).json({ message: 'Se requiere materialId en la solicitud.' });
            }

            const inventories = await prisma.inventoryMovement.findMany(
                {
                    include: {
                        createdBy: true
                    },
                    where: {
                        material: {
                            id: materialId as string
                        }
                    }
                }
            );
            return res.status(200).json({ inventories });
        } else if (req.method === "POST") {
            const { materialId, quantity, movementType, email } = req.body;
            const material = await prisma.material.findUnique({
                where: {
                    id: materialId
                }
            })
            if (!material) {
                return res.status(400).json({ message: 'Material not found' })
            }
            const createdInventory = await prisma.inventoryMovement.create({
                data: {
                    quantity: parseInt(quantity),
                    movementType,
                    createdBy: {
                        connect: {
                            email: email
                        }
                    },
                    material: {
                        connect: {
                            id: materialId
                        }
                    }
                }
            })

            const quantityMaterial = movementType.toUpperCase() === 'ENTRADA' ? parseInt(quantity) : parseInt(quantity) * -1;
            if (material) {
                await prisma.material.update({
                    where: {
                        id: materialId
                    },
                    data: {
                        quantity: material.quantity + quantityMaterial
                    }
                });
            }
            return res.status(201).json({ createdInventory });
        }


        return res.status(405).json({ message: 'Method not allowed' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
