import { PrimaryButton } from "@/components/ui/Buttons/PrimaryButton";
import SideBar from "@/components/ui/SideBar";
import { useSession, signIn } from "next-auth/react";

const Home = () => {
  const { data, status } = useSession();

  console.log(data?.user.role?.name);

  if (status === "loading") return <div>Loading...</div>;

  if (status === "authenticated")
    return (
      <div className="h-auto flex flex-row">
        <SideBar />
        <main className="h-screen w-full flex items-center justify-center ">
          <div></div>
          <section>contenido central</section>
        </main>
      </div>
    );

  return (
    <main className="flex flex-col h-screen w-full items-center pt-80 gap-32">
      <h1>Sistema de gestión de inventarios</h1>
      <div>
        <PrimaryButton
          text="Iniciar sesión"
          loading={false}
          onClick={() => {
            signIn("auth0");
          }}
        />
      </div>
    </main>
  );
};

export default Home;
