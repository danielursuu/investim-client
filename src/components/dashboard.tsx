"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Wallet,
  BarChart3,
  PieChart,
  Activity,
  TrendingDown,
  RefreshCw
} from "lucide-react";
import { portfolioService } from "@/services";
import axios from 'axios';
import { cn } from "@/lib/utils";
import { formatNumber } from '@/lib/formatNumber';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Position {
  symbol: string;
  position: number;
  marketPrice: number;
  marketValue: number;
  unrealizedPnL: number;
  contractDesc?: string;
  averageCost: number;
  currency: string;
}

interface Account {
  id: string;
  accountId: string;
  cashBalance: number;
  availableFunds: number;
  excessLiquidity: number;
  buyingPower: number;
  leverage: number;
  dayTradesRemaining: number;
}

interface Ledger {
  cashBalance: number;
  availableFunds: number;
  excessLiquidity: number;
  buyingPower: number;
  leverage: number;
  dayTradesRemaining: number;
}

const Dashboard: React.FC = () => {
  const { toast } = useToast();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [positions, setPositions] = useState<Position[]>([]);
  const [ledger, setLedger] = useState<Ledger | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Calculate derived values
  const totalValue = React.useMemo(() => {
    const positionsValue = positions.reduce((sum, pos) => sum + (pos?.marketValue ?? 0), 0);
    const cashBalance = ledger?.cashBalance ?? 0;
    return positionsValue + cashBalance;
  }, [positions, ledger?.cashBalance]);

  const totalPnL = React.useMemo(() => 
    positions.reduce((sum, pos) => sum + (pos?.unrealizedPnL ?? 0), 0),
    [positions]
  );

  const pnlPercentage = React.useMemo(() => 
    totalValue > 0 ? (totalPnL / totalValue) * 100 : 0,
    [totalValue, totalPnL]
  );

  const fetchData = useCallback(async (accountId: string, showToast = false) => {
    try {
      setIsRefreshing(true);
      setError(null);

      const [fetchedPositions, fetchedLedger] = await Promise.all([
        portfolioService.getPositions(accountId),
        portfolioService.getLedger(accountId)
      ]);
      
      setPositions(fetchedPositions);
      setLedger(fetchedLedger);
      setLastUpdated(new Date());

      if (showToast) {
        toast({
          title: "Data refreshed",
          description: "Portfolio data has been updated successfully.",
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || "Failed to fetch account details"
        : "Failed to fetch account details";
      
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  }, [toast]);

  // Initial data fetch
  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const fetchedAccounts = await portfolioService.getAccounts();
        setAccounts(fetchedAccounts);
        
        if (fetchedAccounts.length > 0) {
          const accountId = fetchedAccounts[0].accountId;
          setSelectedAccount(accountId);
          await fetchData(accountId, false);
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
        const errorMessage = axios.isAxiosError(error)
          ? error.response?.data?.message || "Failed to fetch accounts"
          : "Failed to fetch accounts";
        
        setError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccountData();
  }, [fetchData, toast]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!selectedAccount) return;

    const intervalId = setInterval(() => {
      fetchData(selectedAccount, false);
    }, 30000);

    return () => clearInterval(intervalId);
  }, [selectedAccount, fetchData]);

  const handleRefresh = useCallback(() => {
    if (!selectedAccount || isRefreshing) return;
    fetchData(selectedAccount, true);
  }, [selectedAccount, isRefreshing, fetchData]);

  const handleAccountChange = useCallback(async (accountId: string) => {
    setSelectedAccount(accountId);
    await fetchData(accountId, false);
  }, [fetchData]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-primary"></div>
          <p className="text-muted-foreground">Loading portfolio data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Error Loading Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{error}</p>
          <Button
            onClick={() => selectedAccount && fetchData(selectedAccount, false)}
            variant="outline"
            className="w-full"
          >
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
          <p className="text-sm text-muted-foreground">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <Button
          onClick={handleRefresh}
          variant="outline"
          size="sm"
          disabled={isRefreshing}
        >
          <RefreshCw className={cn(
            "h-4 w-4 mr-2",
            isRefreshing && "animate-spin"
          )} />
          Refresh
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="positions">Positions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total Portfolio Value"
              value={`$${formatNumber(totalValue)}`}
              icon={<DollarSign className="h-4 w-4" />}
              subtext="Including cash balance"
            />
            <MetricCard
              title="Unrealized P&L"
              value={`$${formatNumber(totalPnL)}`}
              trend={pnlPercentage}
              icon={totalPnL >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            />
            <MetricCard
              title="Buying Power"
              value={`$${formatNumber(ledger?.buyingPower ?? 0)}`}
              icon={<Wallet className="h-4 w-4" />}
            />
            <MetricCard
              title="Day Trades Available"
              value={ledger?.dayTradesRemaining ?? 0}
              icon={<Activity className="h-4 w-4" />}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AccountMetrics data={ledger as Ledger} />
            {/* Add more overview components here */}
          </div>
        </TabsContent>

        <TabsContent value="positions">
          <PositionsTable positions={positions} />
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Add analytics components here */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Metric card component
const MetricCard: React.FC<{
  title: string;
  value: string | number;
  subtext?: string;
  icon?: React.ReactNode;
  trend?: number;
}> = React.memo(({ title, value, subtext, icon, trend }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline space-x-2">
              <h2 className="text-2xl font-bold tracking-tight">{value}</h2>
              {trend !== undefined && (
                <span className={cn(
                  "text-sm font-medium",
                  trend > 0 ? "text-green-500" : "text-red-500"
                )}>
                  {trend > 0 ? "+" : ""}{formatNumber(trend)}%
                </span>
              )}
            </div>
            {subtext && <p className="text-xs text-muted-foreground">{subtext}</p>}
          </div>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
      </CardContent>
    </Card>
  );
});

// Account metrics component
const AccountMetrics: React.FC<{ data: Ledger }> = React.memo(({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Account Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Cash Balance</span>
            </div>
            <span className="font-medium">${formatNumber(data?.cashBalance ?? 0)}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Wallet className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Available Funds</span>
            </div>
            <span className="font-medium">${formatNumber(data?.availableFunds ?? 0)}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Excess Liquidity</span>
            </div>
            <span className="font-medium">${formatNumber(data?.excessLiquidity ?? 0)}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Leverage</span>
            </div>
            <span className="font-medium">{formatNumber(data?.leverage ?? 0)}x</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

// Positions table component
const PositionsTable: React.FC<{ positions: Position[] }> = React.memo(({ positions }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Positions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Symbol</th>
                <th className="px-4 py-3">Position</th>
                <th className="px-4 py-3">Market Price</th>
                <th className="px-4 py-3">Market Value</th>
                <th className="px-4 py-3">Unrealized P&L</th>
                <th className="px-4 py-3">Avg Cost</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((position) => (
                <tr key={position.symbol} className="border-t">
                  <td className="px-4 py-3 font-medium">{position.symbol}</td>
                  <td className="px-4 py-3">{formatNumber(position.position)}</td>
                  <td className="px-4 py-3">${formatNumber(position.marketPrice)}</td>
                  <td className="px-4 py-3">${formatNumber(position.marketValue)}</td>
                  <td className={cn(
                    "px-4 py-3",
                    position.unrealizedPnL > 0 ? "text-green-500" : "text-red-500"
                  )}>
                    ${formatNumber(position.unrealizedPnL)}
                  </td>
                  <td className="px-4 py-3">${formatNumber(position.averageCost)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
});

export default Dashboard;
