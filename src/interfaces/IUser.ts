export default interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: "admin" | "user";
  apiKey: string;
  balance: number;
  accountNumber: number;
}
