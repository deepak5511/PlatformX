import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Medal, 
  Award, 
  Download, 
  BarChart3, 
  TrendingUp, 
  Users,
  Target,
  Star,
  Crown,
  Zap,
  Shield
} from "lucide-react";

// Mock final results data
const finalResults = {
  userRank: 3,
  totalParticipants: 25,
  finalPnL: 1850.75,
  finalPnLPercent: 18.51,
  totalTrades: 47,
  winRate: 68.1,
  bestTrade: 425.30,
  worstTrade: -89.45
};

// Mock final leaderboard
const finalLeaderboard = [
  { 
    rank: 1, 
    name: "Alice Johnson", 
    pnl: 2450.50, 
    pnlPercent: 24.51, 
    trades: 52, 
    winRate: 73.1,
    badges: ["top_trader", "risk_master", "consistency_king"]
  },
  { 
    rank: 2, 
    name: "Bob Smith", 
    pnl: 1890.25, 
    pnlPercent: 18.90, 
    trades: 38, 
    winRate: 71.1,
    badges: ["quick_starter", "momentum_trader"]
  },
  { 
    rank: 3, 
    name: "You", 
    pnl: 1850.75, 
    pnlPercent: 18.51, 
    trades: 47, 
    winRate: 68.1,
    badges: ["steady_climber", "diversification_pro", "late_bloomer"]
  },
  { 
    rank: 4, 
    name: "Charlie Brown", 
    pnl: 1250.00, 
    pnlPercent: 12.50, 
    trades: 29, 
    winRate: 65.5,
    badges: ["conservative_trader"]
  },
  { 
    rank: 5, 
    name: "Diana Prince", 
    pnl: 980.75, 
    pnlPercent: 9.81, 
    trades: 41, 
    winRate: 58.5,
    badges: ["active_trader"]
  }
];

// Badge definitions
const badgeDefinitions = {
  top_trader: { name: "Top Trader", icon: Crown, color: "text-yellow-600", description: "Finished in 1st place" },
  risk_master: { name: "Risk Master", icon: Shield, color: "text-blue-600", description: "Excellent risk management" },
  consistency_king: { name: "Consistency King", icon: Target, color: "text-green-600", description: "Consistent performance" },
  quick_starter: { name: "Quick Starter", icon: Zap, color: "text-orange-600", description: "Strong early performance" },
  momentum_trader: { name: "Momentum Trader", icon: TrendingUp, color: "text-purple-600", description: "Rode market trends well" },
  steady_climber: { name: "Steady Climber", icon: BarChart3, color: "text-indigo-600", description: "Steady upward progress" },
  diversification_pro: { name: "Diversification Pro", icon: Star, color: "text-pink-600", description: "Well-diversified portfolio" },
  late_bloomer: { name: "Late Bloomer", icon: Award, color: "text-teal-600", description: "Strong finish" },
  conservative_trader: { name: "Conservative Trader", icon: Shield, color: "text-gray-600", description: "Risk-averse approach" },
  active_trader: { name: "Active Trader", icon: Users, color: "text-red-600", description: "High trading activity" }
};

const BadgeComponent = ({ badgeKey, size = "md" }) => {
  const badge = badgeDefinitions[badgeKey];
  if (!badge) return null;
  
  const Icon = badge.icon;
  const sizeClasses = size === "sm" ? "h-4 w-4" : "h-6 w-6";
  
  return (
    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
      <Icon className={`${sizeClasses} ${badge.color}`} />
      <div>
        <p className="font-medium text-sm">{badge.name}</p>
        <p className="text-xs text-muted-foreground">{badge.description}</p>
      </div>
    </div>
  );
};

const LeaderboardRow = ({ entry, isCurrentUser = false }) => (
  <Card className={`${isCurrentUser ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}>
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
            entry.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
            entry.rank === 2 ? 'bg-gray-100 text-gray-800' :
            entry.rank === 3 ? 'bg-orange-100 text-orange-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {entry.rank === 1 ? <Crown className="h-6 w-6" /> :
             entry.rank === 2 ? <Medal className="h-6 w-6" /> :
             entry.rank === 3 ? <Award className="h-6 w-6" /> :
             entry.rank}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold">{entry.name}</p>
              {isCurrentUser && <Badge variant="secondary">You</Badge>}
            </div>
            <p className="text-sm text-muted-foreground">
              {entry.trades} trades • {entry.winRate}% win rate
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg text-green-600">+${entry.pnl.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">+{entry.pnlPercent}%</p>
        </div>
      </div>
      {entry.badges && entry.badges.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {entry.badges.map((badgeKey) => (
            <div key={badgeKey} className="flex items-center gap-1 px-2 py-1 bg-white rounded-md border">
              {badgeDefinitions[badgeKey] && (
                <>
                  {React.createElement(badgeDefinitions[badgeKey].icon, { 
                    className: `h-3 w-3 ${badgeDefinitions[badgeKey].color}` 
                  })}
                  <span className="text-xs font-medium">{badgeDefinitions[badgeKey].name}</span>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </CardContent>
  </Card>
);

export default function SimulationResults() {
  const [activeTab, setActiveTab] = useState("overview");
  const userResult = finalLeaderboard.find(entry => entry.name === "You");

  const handleExportData = () => {
    // Create CSV data
    const csvData = [
      ["Rank", "Name", "P&L", "P&L %", "Trades", "Win Rate", "Badges"],
      ...finalLeaderboard.map(entry => [
        entry.rank,
        entry.name,
        entry.pnl,
        entry.pnlPercent,
        entry.trades,
        entry.winRate,
        entry.badges ? entry.badges.join("; ") : ""
      ])
    ];
    
    const csvContent = csvData.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "simulation_results.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold ${
              finalResults.userRank === 1 ? 'bg-yellow-100 text-yellow-800' :
              finalResults.userRank === 2 ? 'bg-gray-100 text-gray-800' :
              finalResults.userRank === 3 ? 'bg-orange-100 text-orange-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {finalResults.userRank === 1 ? <Crown className="h-10 w-10" /> :
               finalResults.userRank === 2 ? <Medal className="h-10 w-10" /> :
               finalResults.userRank === 3 ? <Award className="h-10 w-10" /> :
               `#${finalResults.userRank}`}
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2">Simulation Complete!</h1>
          <p className="text-xl text-muted-foreground">Q4 Crypto Bull Market Simulation</p>
          <p className="text-lg mt-2">
            You finished <span className="font-bold text-blue-600">#{finalResults.userRank}</span> out of {finalResults.totalParticipants} participants
          </p>
        </div>

        {/* Performance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Final P&L</p>
              <p className="text-2xl font-bold text-green-600">+${finalResults.finalPnL.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Return</p>
              <p className="text-2xl font-bold text-blue-600">+{finalResults.finalPnLPercent}%</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Total Trades</p>
              <p className="text-2xl font-bold">{finalResults.totalTrades}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Win Rate</p>
              <p className="text-2xl font-bold">{finalResults.winRate}%</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="leaderboard">Final Rankings</TabsTrigger>
            <TabsTrigger value="badges">Your Badges</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Highlights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Best Single Trade:</span>
                    <span className="font-bold text-green-600">+${finalResults.bestTrade}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Worst Single Trade:</span>
                    <span className="font-bold text-red-600">${finalResults.worstTrade}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Trades:</span>
                    <span className="font-bold">{finalResults.totalTrades}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Win Rate:</span>
                    <span className="font-bold">{finalResults.winRate}%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Export Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Download your complete trading history and performance analytics.
                  </p>
                  <Button onClick={handleExportData} className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Export Trade Data (CSV)
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Final Rankings</h2>
              <Badge variant="outline">{finalResults.totalParticipants} Participants</Badge>
            </div>
            {finalLeaderboard.map((entry) => (
              <LeaderboardRow 
                key={entry.rank} 
                entry={entry} 
                isCurrentUser={entry.name === "You"}
              />
            ))}
          </TabsContent>

          <TabsContent value="badges" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Your Earned Badges</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userResult?.badges?.map((badgeKey) => (
                  <BadgeComponent key={badgeKey} badgeKey={badgeKey} />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button variant="outline" onClick={() => window.location.href = '/participant/login'}>
            Join Another Simulation
          </Button>
          <Button onClick={() => window.location.href = '/'}>
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
}

