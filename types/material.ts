import { Inventory } from "./inventory";
import { User } from "./user";

export interface Material {
  id: string;
  name: string;
  quantity: number;
  createdBy?: User;
  userId?: string;
  movements?: Inventory[];
  createdAt?: Date;
}
export interface MaterialsQuery {
  materials: Material[]
}