import { SideBar } from '@/components/ui/SideBar';
import { useSession } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { status } = useSession();

  if (status === 'loading') return <div>Loading...</div>;

  if (status === 'authenticated')
    return (
      <main className='h-screen flex flex-row'>
        <SideBar />
        {children}   
        <ToastContainer/>    
      </main>
    );

  return <PublicLayout>{children}</PublicLayout>;
};

const PublicLayout = ({ children }: LayoutProps) => {
  return <main>{children}</main>;
};

export { Layout };
