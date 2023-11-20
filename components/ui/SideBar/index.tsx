import { PrivateComponent } from "@/components/PrivateComponent";
import { PrimaryButton } from "@/components/ui/Buttons/PrimaryButton";
import { Profile } from "@/components/ui/SideBar/Profile";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

const SideBar = () => {
  const router = useRouter();
  type AllowedRoutes = "/inventory" | "/materials" | "/users";

  const handleButtonClick = (destination: AllowedRoutes) => {
    // Redirige a la ruta deseada al presionar el botón
    router.push(destination);
  };
  return (
    <aside className="p-2 flex bg-slate-500 w-64 items-center  flex-col">
      <div className="pt-3">
        <Profile />
      </div>
      <div className="flex flex-col  w-full  gap-3 pt-10">
        <PrimaryButton
          text="Inventory"
          loading={false}
          onClick={() => {
            handleButtonClick("/inventory");
          }}
        />
        <PrimaryButton
          text="Materials"
          loading={false}
          onClick={() => {
            handleButtonClick("/materials");
          }}
        />
        <PrivateComponent roleName="ADMIN">
          <PrimaryButton
            text="Users"
            loading={false}
            onClick={() => {
              handleButtonClick("/users");
            }}
          />
        </PrivateComponent>


      </div>
      <div className="mt-auto self-end">
        <PrimaryButton
          text="Log out"
          loading={false}
          onClick={() => {
            signOut();
          }}
        />
      </div>
    </aside>
  );

};

export { SideBar }