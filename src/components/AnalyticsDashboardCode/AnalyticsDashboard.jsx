import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Search, TrendingUp, TrendingDown, Users, DollarSign } from "lucide-react";
import { useAuth } from "../../App";

// Mock Data for simplified dashboard
const metricCardsData = [
  {
    value: "12,450",
    label: "Total Revenue",
    trend: "up",
    status: "success"
  },
  {
    value: "89.2%",
    label: "Conversion Rate", 
    trend: "down",
    status: "warning"
  },
  {
    value: "3,289",
    label: "New Customers",
    trend: "up", 
    status: "success"
  },
  {
    value: "4.1%",
    label: "Churn Rate",
    trend: "up",
    status: "danger"
  }
];

const tableData = [
  {
    id: "SIM001",
    status: "Active",
    participants: "25/30",
    duration: "2 hours"
  },
  {
    id: "SIM002", 
    status: "Completed",
    participants: "30/30",
    duration: "4 hours"
  },
  {
    id: "SIM003",
    status: "Pending",
    participants: "0/25",
    duration: "Not started"
  }
];

const MetricCard = ({ value, label, trend, status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'danger': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card className="rounded-xl shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className={`flex items-center ${getStatusColor(status)}`}>
            {trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function FacilitatorDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { simulations, startSimulation } = useAuth();
  
  const filteredData = simulations.filter(item => 
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateScenario = () => {
    navigate('/facilitator/scenario/create');
  };

  const handleStartSimulation = () => {
    // For demo purposes, start the first pending simulation
    const pendingSimulation = simulations.find(sim => sim.status === 'Pending');
    if (pendingSimulation) {
      startSimulation(pendingSimulation);
      navigate('/facilitator/simulation/monitor');
    } else {
      alert('No pending simulations available. Please create a scenario first.');
    }
  };

  return (
    <div className="bg-muted/40 min-h-screen w-full font-sans">
      <main className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Facilitator Dashboard
            </h1>
            <div className="flex gap-4">
              <Button 
                onClick={handleCreateScenario}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Create Scenario
              </Button>
              <Button 
                variant="outline"
                onClick={handleStartSimulation}
              >
                Start Simulation
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="space-y-8">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metricCardsData.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </div>
          
          {/* Simulations Table */}
          <Card className="rounded-xl shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Simulations</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Filter simulations..." 
                  className="pl-10 w-full md:w-64 rounded-md" 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <Button variant="ghost" className="p-0 hover:bg-transparent">
                          Simulation ID <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button variant="ghost" className="p-0 hover:bg-transparent">
                          Status <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button variant="ghost" className="p-0 hover:bg-transparent">
                          Participants <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead className="text-right">
                        <Button variant="ghost" className="p-0 hover:bg-transparent">
                          Duration <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((simulation) => (
                      <TableRow key={simulation.id} className="font-mono">
                        <TableCell className="font-medium text-foreground">{simulation.id}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            simulation.status === 'Active' ? 'bg-green-100 text-green-800' :
                            simulation.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {simulation.status}
                          </span>
                        </TableCell>
                        <TableCell>{simulation.participants}</TableCell>
                        <TableCell className="text-right">{simulation.duration}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

