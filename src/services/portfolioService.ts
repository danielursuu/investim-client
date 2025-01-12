import axios from 'axios';
import { Account } from './AccountDTO';

// Configure axios defaults
axios.defaults.withCredentials = true;

const API_PREFIX = 'http://localhost:3001/api/v1';

export interface PortfolioPosition {
  symbol: string;
  position: number;
  marketPrice: number;
  marketValue: number;
  unrealizedPnL: number;
  contractDesc?: string;
  averageCost: number;
  currency: string;
}

export interface Ledger {
  cashBalance: number;
  availableFunds: number;
  excessLiquidity: number;
  buyingPower: number;
  leverage: number;
  dayTradesRemaining: number;
}

export const portfolioService = {
  /**
   * Retrieve Account Information
   * @returns Promise of Account[]
   */
  getAccounts: async (): Promise<Account[]> => {
    try {
      const response = await axios.get<Account[]>(`${API_PREFIX}/accounts`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch accounts:", error);
      throw error;
    }
  },

  /**
   * Retrieve Portfolio Positions for a specific account
   * @param accountId The ID of the account to retrieve positions for
   * @returns Promise of PortfolioPosition[]
   */
  getPositions: async (accountId: string): Promise<PortfolioPosition[]> => {
    try {
      const response = await axios.get<PortfolioPosition[]>(`${API_PREFIX}/accounts/${accountId}/positions`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch positions for account ${accountId}:`, error);
      throw error;
    }
  },

  /**
   * Retrieve Account Ledger Information
   * @param accountId The ID of the account to retrieve ledger information for
   * @returns Promise of Ledger
   */
  getLedger: async (accountId: string): Promise<Ledger> => {
    try {
      const response = await axios.get<Ledger>(`${API_PREFIX}/accounts/${accountId}/ledger`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch ledger for account ${accountId}:`, error);
      throw error;
    }
  },
};
