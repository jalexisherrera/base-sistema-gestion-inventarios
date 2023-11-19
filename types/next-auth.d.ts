//eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Enum_RoleName } from '@prisma/client';
import 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      image?: string;
      role: Role?;
      name: string;
      createdAt: string;
      roleId: string;
    };
  }
}
