import React from 'react';
import { useAuth } from "../App";
import { useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button";
import AnalyticsDashboard from "./AnalyticsDashboardCode/AnalyticsDashboard";
import TradingPlatform from "./TradingPlatformUI/TradingPlatform";

export default function SimulationMonitor() {
  const { currentSimulation, endSimulation } = useAuth();
  const navigate = useNavigate();

  const handleEndSimulation = () => {
    endSimulation();
    navigate('/simulation/results');
  };

  if (!currentSimulation) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
        <h1 className="text-3xl font-bold mb-4">No Active Simulation</h1>
        <p className="text-lg">Please start a simulation from the facilitator dashboard.</p>
        <Button onClick={() => navigate('/facilitator/dashboard')} className="mt-6">Go to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Simulation Monitor: {currentSimulation.title}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Live Trades Section */}
        <div className="bg-card text-card-foreground p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Live Trades</h2>
          <TradingPlatform />
        </div>

        {/* Analytics Dashboard Section */}
        <div className="bg-card text-card-foreground p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Analytics Dashboard</h2>
          <AnalyticsDashboard />
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Button onClick={handleEndSimulation} className="bg-red-500 hover:bg-red-600 text-white">
          End Simulation
        </Button>
      </div>
    </div>
  );
}


