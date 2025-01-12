"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RefreshCcw, TrendingUp, DollarSign, Wallet, BarChart2, ArrowUpRight, Loader2 } from "lucide-react";
import { getAccountData } from "@/services/api";
import { Account } from "@/services/AccountDTO";
import { useToast } from "@/hooks/use-toast";

export default function Overview() {
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState<Account | null>(null);
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      setLoading(true);
      const accountData = await getAccountData();
      setAccount(accountData);
      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch account data";
      toast({
        title: "Error fetching data",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Error fetching account data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    fetchData();
  };

  if (loading) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!account) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <p className="text-muted-foreground">No account data available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
          <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
        </div>
        <Button onClick={handleRefresh} variant="outline" size="sm" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCcw className="mr-2 h-4 w-4" />}
          Refresh
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="positions">Positions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${account.totalPortfolioValue?.toLocaleString() ?? account.equityWithLoanValue?.toLocaleString() ?? 0}
                </div>
                <p className="text-xs text-muted-foreground">Including cash balance</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unrealized P&L</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="text-2xl font-bold">${account.unrealizedPnL?.toLocaleString() ?? 0}</div>
                  {account.unrealizedPnL && account.unrealizedPnL > 0 && (
                    <span className="text-sm text-green-500 ml-2 flex items-center">
                      <ArrowUpRight className="h-4 w-4 ml-1" />
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Buying Power</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${account.buyingPower.toLocaleString()}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Day Trades Available</CardTitle>
                <BarChart2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{account.dayTradesAvailable ?? 0}</div>
              </CardContent>
            </Card>
          </div>

          {/* Account Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Account Metrics</CardTitle>
              <CardDescription>Detailed breakdown of your account metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Cash Balance</p>
                  <p className="text-xl font-bold">${account.cashBalance.toLocaleString()}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Available Funds</p>
                  <p className="text-xl font-bold">${account.availableFunds.toLocaleString()}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Equity with Loan Value</p>
                  <p className="text-xl font-bold">${account.equityWithLoanValue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="positions">
          <Card>
            <CardHeader>
              <CardTitle>Positions</CardTitle>
              <CardDescription>Your current portfolio positions</CardDescription>
            </CardHeader>
            <CardContent>
              {/* TODO: Add positions table */}
              <p className="text-sm text-muted-foreground">No positions to display</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Portfolio performance analytics</CardDescription>
            </CardHeader>
            <CardContent>
              {/* TODO: Add analytics charts */}
              <p className="text-sm text-muted-foreground">Analytics coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
