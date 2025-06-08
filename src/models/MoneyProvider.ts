export interface MoneyProvider {
    id: string;
    name: string;
    amount: number;
    addedDate: string;     // Date string
    providedDate: string;  // Date string
    subAdminId: string;    // UID of sub-admin
    status: "paid" | "unpaid";
  }
  