// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { Material } from "@prisma/client";
import prisma from "@/service/prisma";
import { checkPrivateApi } from "@/utils/checkServerSession";

type Data = {
    materials?: Material[];
    message?: string;
    createdMaterial?: Material;
};


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    try {
        await checkPrivateApi(req, res);

        if (req.method === "GET") {
            const materials = await prisma.material.findMany({
                orderBy: {
                    name: 'asc',
                },
                include: {
                    createdBy: true
                }
            }

            );
            res.status(200).json({ materials });
        } else if (req.method === "POST") {
            const { name, quantity, email } = req.body;
            const materialExists = await prisma.material.findUnique({
                where: {
                    name: name
                }
            })
            if (materialExists) {
                return res.status(400).json({ message: 'Material already exists' })
            }
            const material = await prisma.material.create({
                data: {
                    name,
                    quantity: parseInt(quantity),
                    createdBy: {
                        connect: {
                            email: email
                        }
                    },
                    movements: {
                        create: {
                            quantity: parseInt(quantity),
                            movementType: "ENTRADA",
                            createdBy: {
                                connect: {
                                    email: email
                                }
                            }
                        }
                    }
                }
            })
            res.status(201).json({ createdMaterial: material })



        }

        return res.status(405).json({ message: 'Method not allowed' })
    } catch {
        return res.status(500).json({ message: 'Internal server error:' })
    }

}
