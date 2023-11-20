import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
const Profile = () => {
    const { data } = useSession();
    return (
        <div className="flex flex-col text-center">
            <Image
                className="rounded-full"
                src={data?.user.image ?? ''}
                alt="picture profile"
                width={100}
                height={100}
            />
            <div className="mt-2">
                <span className="text-md text-center">{data?.user.name ?? ''}</span>
            </div>
        </div>
    );
};

export { Profile };
