// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { Material } from "@prisma/client";
import prisma from "@/service/prisma";
import { checkPrivateApi } from "@/utils/checkServerSession";

type Data = {
    materials?: Material[];
    message?: string;
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
        }

        return res.status(405).json({ message: 'Method not allowed' })
    } catch {
        return res.status(500).json({ message: 'Internal server error' })
    }

}
