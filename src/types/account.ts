export interface Account {
  id: string;
  accountId: string;
  accountType: string;
  accountTitle: string;
  accountStatus: string;
  accountAlias: string;
  cashBalance: number;
  availableFunds: number;
  buyingPower: number;
  equityWithLoanValue: number;
  unrealizedPnL?: number;
  dayTradesAvailable?: number;
  totalPortfolioValue?: number;
}

export interface AccountDetails {
  accountId: string;
  displayName: string;
  accountTitle: string;
  accountAlias: string | null;
  currency: string;
  accountStatus: number;
  type: string;
  tradingType: string;
  businessType: string;
  parent: {
    accountId: string;
    isMParent: boolean;
    isMChild: boolean;
  };
} 