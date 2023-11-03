import React from "react";
import Image from "next/image";
const Profile = () => {
    return (
        <div className="">
            <Image
                className="rounded-full"
                src="/img/profile.jpg"
                alt="picture profile"
                width={100}
                height={100}
            />
            <div className="mt-2">
                <span className="text-md">Daniel Loaiza N</span>
            </div>
        </div>
    );
};

export default Profile;
