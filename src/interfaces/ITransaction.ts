export default interface ITransaction {
  id: number;
  amount: number;
  type: "deposit" | "withdrawal";
  date: string;
}
