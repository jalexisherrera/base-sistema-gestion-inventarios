import { PrimaryButton } from "@/components/ui/Buttons/PrimaryButton";
import { useSession, signIn } from "next-auth/react";

const Home = () => {
  const { status } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  if (status === "authenticated")
    return (
      <main className="h-screen w-full flex items-center justify-center ">
        <div className="flex flex-col gap-7 items-center">
          <h1>Welcome to the Inventory System</h1>
          <h2>Please, select an option from the left bar</h2>
        </div>
        
      </main>
    );

  return (
    <main className="flex flex-col h-screen w-full items-center pt-80 gap-32">
      <h1>Inventory management system</h1>
      <div>
        <PrimaryButton
          text="Log In"
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
