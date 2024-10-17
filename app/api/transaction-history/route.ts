export interface TransactionHistory  {
    date: Date;
    id: string;
    receiver: string;
    transaction: string;
    amount: number;
  };

  //make sure Promise return a string data
  const mockFetchTransactionHistory = async (): Promise<TransactionHistory[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            date: new Date("2023-08-24"),
            id: "#834343434342",
            receiver: "Bloom Enterprise Sdn Bhd",
            transaction: "DuitNow payment",
            amount: 1200.0,
          },
          {
            date: new Date("2023-07-14"),
            id: "#834343434343",
            receiver: "Muhammad Andy Asmawi",
            transaction: "DuitNow payment",
            amount: 54810.16,
          },
          {
            date: new Date("2023-07-12"),
            id: "#834343434344",
            receiver: "Utilities Company Sdn Bhd",
            transaction: "DuitNow payment",
            amount: 100.0,
          },
        ]);
      }, 500); // Simulate a 500ms delay
    });
  };

  export default mockFetchTransactionHistory