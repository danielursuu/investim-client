export interface Account {
  id: string;
  accountId: string;
  accountType: string;
  accountTitle: string;
  accountStatus: string;
  accountAlias: string;
  totalPortfolioValue: number;
  equityWithLoanValue: number;
  cashBalance: number;
  availableFunds: number;
  buyingPower: number;
  unrealizedPnL: number;
  dayTradesAvailable: number;
}
