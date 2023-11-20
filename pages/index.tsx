import { PrimaryButton } from "@/components/ui/Buttons/PrimaryButton";
import { useSession, signIn } from "next-auth/react";

const Home = () => {
  const { status } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  if (status === "authenticated")
    return (
      <main className="h-screen w-full flex items-center justify-center ">
        <div></div>
        <section>contenido central</section>
      </main>
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
