import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Clock,
  Users,
  Target,
  Trophy,
  Activity
} from "lucide-react";
import ErrorMessageCard from "./ErrorMessageCard"; // Import the ErrorMessageCard

// Mock market data
const mockMarketData = [
  { symbol: "BTC", name: "Bitcoin", price: 67420.50, change: 2.34, changePercent: 3.59 },
  { symbol: "ETH", name: "Ethereum", price: 3245.80, change: -45.20, changePercent: -1.37 },
  { symbol: "ADA", name: "Cardano", price: 0.4567, change: 0.0234, changePercent: 5.41 },
  { symbol: "SOL", name: "Solana", price: 98.76, change: 4.32, changePercent: 4.57 },
  { symbol: "DOT", name: "Polkadot", price: 6.89, change: -0.23, changePercent: -3.23 }
];

// Mock portfolio data
const mockPortfolio = {
  totalValue: 10000,
  cash: 2500,
  pnl: 1250,
  pnlPercent: 12.5,
  positions: [
    { symbol: "BTC", quantity: 0.1, avgPrice: 65000, currentPrice: 67420.50, pnl: 242.05 },
    { symbol: "ETH", quantity: 2, avgPrice: 3300, currentPrice: 3245.80, pnl: -108.40 },
    { symbol: "ADA", quantity: 1000, avgPrice: 0.45, currentPrice: 0.4567, pnl: 6.70 }
  ]
};

// Mock leaderboard data
const mockLeaderboard = [
  { rank: 1, name: "Alice Johnson", pnl: 2450.50, pnlPercent: 24.51 },
  { rank: 2, name: "Bob Smith", pnl: 1890.25, pnlPercent: 18.90 },
  { rank: 3, name: "Charlie Brown", pnl: 1250.00, pnlPercent: 12.50 },
  { rank: 4, name: "You", pnl: 1250.00, pnlPercent: 12.50 },
  { rank: 5, name: "Diana Prince", pnl: 980.75, pnlPercent: 9.81 }
];

const MarketDataCard = ({ data }) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardContent className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{data.symbol}</h3>
          <p className="text-sm text-muted-foreground">{data.name}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg">${data.price.toLocaleString()}</p>
          <div className={`flex items-center gap-1 ${data.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {data.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            <span className="text-sm font-medium">
              {data.change >= 0 ? '+' : ''}{data.changePercent.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const PositionCard = ({ position }) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardContent className="p-4">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-semibold">{position.symbol}</h4>
          <p className="text-sm text-muted-foreground">
            {position.quantity} @ ${position.avgPrice.toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <p className="font-medium">${(position.quantity * position.currentPrice).toLocaleString()}</p>
          <p className={`text-sm font-medium ${position.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {position.pnl >= 0 ? '+' : ''}${position.pnl.toFixed(2)}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const LeaderboardRow = ({ entry, isCurrentUser = false }) => (
  <div className={`flex items-center justify-between p-3 rounded-lg ${isCurrentUser ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'}`}>
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
        entry.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
        entry.rank === 2 ? 'bg-gray-100 text-gray-800' :
        entry.rank === 3 ? 'bg-orange-100 text-orange-800' :
        'bg-blue-100 text-blue-800'
      }`}>
        {entry.rank}
      </div>
      <div>
        <p className="font-medium">{entry.name}</p>
        {isCurrentUser && <Badge variant="secondary" className="text-xs">You</Badge>}
      </div>
    </div>
    <div className="text-right">
      <p className="font-semibold text-green-600">+${entry.pnl.toLocaleString()}</p>
      <p className="text-sm text-muted-foreground">+{entry.pnlPercent}%</p>
    </div>
  </div>
);

export default function TradingInterface() {
  const [selectedAsset, setSelectedAsset] = useState(mockMarketData[0]);
  const [tradeType, setTradeType] = useState('buy');
  const [quantity, setQuantity] = useState('');
  const [timeRemaining, setTimeRemaining] = useState('5d 14h 32m');
  const [error, setError] = useState(null); // State for error message

  const handleTrade = () => {
    setError(null); // Clear previous errors
    if (!quantity || parseFloat(quantity) <= 0) {
      setError({ header: "Invalid Quantity", body: "Please enter a valid quantity greater than zero." });
      return;
    }
    
    const tradeValue = parseFloat(quantity) * selectedAsset.price;
    // In a real application, you would send this trade to a backend API
    // For now, we'll simulate a successful trade or an error based on some condition

    // Simulate an error if quantity is too high (e.g., exceeds mock cash)
    if (tradeValue > mockPortfolio.cash) {
      setError({ header: "Insufficient Funds", body: `You do not have enough cash to ${tradeType} ${quantity} ${selectedAsset.symbol}. Required: $${tradeValue.toLocaleString()}, Available: $${mockPortfolio.cash.toLocaleString()}.` });
      return;
    }

    alert(`${tradeType.toUpperCase()} order placed: ${quantity} ${selectedAsset.symbol} for $${tradeValue.toLocaleString()}`);
    setQuantity('');
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Error Message Card */}
        {error && (
          <div className="fixed top-4 right-4 z-50">
            <ErrorMessageCard
              header={error.header}
              body={error.body}
              onDismiss={() => setError(null)}
            />
          </div>
        )}

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Trading Simulation</h1>
            <p className="text-muted-foreground">Q4 Crypto Bull Market Simulation</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Time Remaining</p>
              <p className="font-bold text-lg flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {timeRemaining}
              </p>
            </div>
            <Badge variant="outline" className="px-3 py-1">
              <Activity className="h-4 w-4 mr-1" />
              Live
            </Badge>
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Portfolio Value</p>
                  <p className="text-xl font-bold">${mockPortfolio.totalValue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">P&L</p>
                  <p className="text-xl font-bold text-green-600">
                    +${mockPortfolio.pnl.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Return</p>
                  <p className="text-xl font-bold text-green-600">
                    +{mockPortfolio.pnlPercent}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Rank</p>
                  <p className="text-xl font-bold">#4</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Market Data & Trading */}
          <div className="lg:col-span-2 space-y-6">
            {/* Market Data */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Market Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockMarketData.map((asset) => (
                    <div 
                      key={asset.symbol}
                      onClick={() => setSelectedAsset(asset)}
                      className={`cursor-pointer ${selectedAsset.symbol === asset.symbol ? 'ring-2 ring-blue-500 rounded-lg' : ''}`}
                    >
                      <MarketDataCard data={asset} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trading Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Trade {selectedAsset.symbol}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Button 
                      variant={tradeType === 'buy' ? 'default' : 'outline'}
                      onClick={() => setTradeType('buy')}
                      className="flex-1"
                    >
                      Buy
                    </Button>
                    <Button 
                      variant={tradeType === 'sell' ? 'default' : 'outline'}
                      onClick={() => setTradeType('sell')}
                      className="flex-1"
                    >
                      Sell
                    </Button>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Quantity</label>
                    <Input 
                      type="number" 
                      placeholder="Enter quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span>Price:</span>
                      <span>${selectedAsset.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total:</span>
                      <span>${(parseFloat(quantity || '0') * selectedAsset.price).toLocaleString()}</span>
                    </div>
                  </div>
                  <Button onClick={handleTrade} className="w-full">
                    Place {tradeType.toUpperCase()} Order
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Positions */}
            <Card>
              <CardHeader>
                <CardTitle>Your Positions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockPortfolio.positions.map((position) => (
                    <PositionCard key={position.symbol} position={position} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Leaderboard */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Live Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockLeaderboard.map((entry) => (
                    <LeaderboardRow 
                      key={entry.rank} 
                      entry={entry} 
                      isCurrentUser={entry.name === "You"}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

