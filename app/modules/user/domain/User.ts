import { LastOrder } from "../../orders/domain/Order";

export interface UserRepository {
  getLastOrder(userEmail: string): Promise<LastOrder | null>;
}
