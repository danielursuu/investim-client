export interface AccountDetailsDTO {
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
