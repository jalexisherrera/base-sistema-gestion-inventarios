
import { PrivateRoute } from '@/components/PrivateRoute';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import SideBar from '@/components/ui/SideBar';

const UsersPageWrapper = () => {
  return (
    <ProtectedRoute roleName='ADMIN'>
      <UsersPage />
    </ProtectedRoute>
  );
};

const UsersPage = () => {

 
  return (
    <ProtectedRoute roleName='ADMIN'>
      <div className="h-auto flex flex-row">
        <SideBar />
        <main className="h-screen w-full flex items-center justify-center ">
          <div></div>
          <section>Usuarios</section>
        </main>
      </div>
    </ProtectedRoute>
    
  )
}

export default UsersPageWrapper