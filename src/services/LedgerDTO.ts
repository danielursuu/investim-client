export interface Ledger {
  account: string;
  currency: string;
  realCurrency: string;
  cashBalance: number;
  totalCashValue: number;
  settledCash: number;
  accruedCash: number;
  buyingPower: number;
  equityWithLoanValue: number;
  previousEquityWithLoanValue: number;
  grossPositionValue: number;
  regTEquity: number;
  regTMargin: number;
  sma: number;
  initMarginReq: number;
  maintMarginReq: number;
  availableFunds: number;
  excessLiquidity: number;
  cushion: number;
  dayTradesRemaining: number;
  leverage: number;
}
