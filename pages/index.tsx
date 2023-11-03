import SideBar from "@/components/ui/SideBar";

const Home = () => {
  return (<div className="h-auto flex flex-row">
  <SideBar />
  <main className='h-screen w-full flex items-center justify-center '>
    
    <div ></div>
    <section>contenido central</section>
  </main>
  </div>
  );
};

export default Home;
