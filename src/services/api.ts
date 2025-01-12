import axios, { AxiosError } from "axios";
import { Account } from "./AccountDTO";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
console.log("API Base URL:", API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000, // 5 second timeout
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.code === "ECONNABORTED") {
      throw new Error("Request timeout - Please try again");
    }
    if (!error.response) {
      throw new Error("Network error - Please check your connection or if the server is running");
    }
    throw error;
  }
);

// Mock data for development
const mockAccountData: Account = {
  id: "mock-id-123",
  accountId: "U987654",
  accountType: "Individual Margin",
  accountTitle: "Main Investment Account",
  accountStatus: "Active",
  accountAlias: "Primary Portfolio",
  cashBalance: 25000.82,
  availableFunds: 15000.45,
  buyingPower: 45000.00,
  equityWithLoanValue: 75000.32,
  unrealizedPnL: 2500.75,
  dayTradesAvailable: 3,
  totalPortfolioValue: 100000.57
};

const mockPositions = [
  {
    symbol: "AAPL",
    quantity: 100,
    averageCost: 150.25,
    currentPrice: 175.50,
    marketValue: 17550.00,
    unrealizedPnL: 2525.00,
    unrealizedPnLPercent: 16.81
  },
  {
    symbol: "MSFT",
    quantity: 50,
    averageCost: 280.50,
    currentPrice: 315.75,
    marketValue: 15787.50,
    unrealizedPnL: 1762.50,
    unrealizedPnLPercent: 12.56
  },
  {
    symbol: "GOOGL",
    quantity: 25,
    averageCost: 2750.00,
    currentPrice: 2850.25,
    marketValue: 71256.25,
    unrealizedPnL: 2506.25,
    unrealizedPnLPercent: 3.65
  }
];

const mockAnalytics = {
  totalValue: 100000.57,
  dailyPnL: 1250.75,
  dailyPnLPercent: 1.25,
  weeklyPnL: 3750.25,
  weeklyPnLPercent: 3.75,
  monthlyPnL: 8500.50,
  monthlyPnLPercent: 8.50,
  yearlyPnL: 25000.75,
  yearlyPnLPercent: 25.00,
  sectors: [
    { name: "Technology", allocation: 45.5 },
    { name: "Healthcare", allocation: 25.3 },
    { name: "Finance", allocation: 15.2 },
    { name: "Consumer", allocation: 14.0 }
  ]
};

// Helper to simulate API latency
const simulateLatency = async () => {
  const delay = Math.random() * 500 + 200; // Random delay between 200-700ms
  await new Promise(resolve => setTimeout(resolve, delay));
};

export const getAccountMetrics = async (): Promise<Account> => {
  try {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
      await simulateLatency();
      return mockAccountData;
    }
    const response = await api.get<Account>("/portfolio/account");
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching account metrics:", error.message);
      if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
        console.log("Falling back to mock data");
        return mockAccountData;
      }
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
};

// Function to get either real or mock data based on environment
export const getAccountData = async (): Promise<Account> => {
  return getAccountMetrics();
};

export const getPortfolioPositions = async () => {
  try {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
      await simulateLatency();
      return mockPositions;
    }
    const response = await api.get("/portfolio/positions");
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching portfolio positions:", error.message);
      if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
        return mockPositions;
      }
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getPortfolioAnalytics = async () => {
  try {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
      await simulateLatency();
      return mockAnalytics;
    }
    const response = await api.get("/portfolio/analytics");
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching portfolio analytics:", error.message);
      if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
        return mockAnalytics;
      }
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
};
