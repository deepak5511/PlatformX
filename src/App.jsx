import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, createContext, useContext, useEffect } from 'react';
import FacilitatorLogin from './components/Loginpage';
import ParticipantLogin from './components/ParticipantLoginpage';
import FacilitatorDashboard from './components/AnalyticsDashboardCode/AnalyticsDashboard';
import ScenarioCreation from './components/Scenerio Creation Form/ScenarioCreationForm';
import TradingInterface from './components/TradingInterface';
import SimulationResults from './components/SimulationResults';
import SimulationMonitor from './components/SimulationMonitor';
import './App.css';

// Create authentication context
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [userType, setUserType] = useState(() => {
    const storedUserType = localStorage.getItem("userType");
    return storedUserType || null;
  });
  const [currentSimulation, setCurrentSimulation] = useState(null);
  const [simulations, setSimulations] = useState([
    { id: 'SIM001', status: 'Active', participants: '25/30', duration: '2 hours' },
    { id: 'SIM002', status: 'Completed', participants: '30/30', duration: '4 hours' },
    { id: 'SIM003', status: 'Pending', participants: '0/25', duration: 'Not started' }
  ]);

  const login = (userData, type) => {
    setUser(userData);
    setUserType(type);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("userType", type);
    console.log("App.jsx - login: User and userType saved to localStorage");
  };

  const logout = () => {
    setUser(null);
    setUserType(null);
    setCurrentSimulation(null);
    localStorage.removeItem("user");
    localStorage.removeItem("userType");
    console.log("App.jsx - logout: User and userType removed from localStorage");
  };

  const startSimulation = (simulationData) => {
    setCurrentSimulation(simulationData);
    // Update simulation status
    setSimulations(prev => prev.map(sim => 
      sim.id === simulationData.id ? { ...sim, status: 'Active' } : sim
    ));
  };

  const endSimulation = () => {
    if (currentSimulation) {
      setSimulations(prev => prev.map(sim => 
        sim.id === currentSimulation.id ? { ...sim, status: 'Completed' } : sim
      ));
      setCurrentSimulation(null);
    }
  };

  const addSimulation = (newSim) => {
    setSimulations(prev => [...prev, newSim]);
  };

  const authValue = {
    user,
    userType,
    login,
    logout,
    isAuthenticated: !!user,
    currentSimulation,
    simulations,
    startSimulation,
    endSimulation,
    addSimulation
  };

  return (
    <AuthContext.Provider value={authValue}>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            {/* Default route - redirect to facilitator login */}
            <Route path="/" element={<Navigate to="/facilitator/login" replace />} />
            
            {/* Facilitator routes */}
            <Route 
              path="/facilitator/login" 
              element={
                !user ? <FacilitatorLogin /> : 
                userType === 'facilitator' ? <Navigate to="/facilitator/dashboard" replace /> :
                <Navigate to="/participant/trading" replace />
              } 
            />
            <Route 
              path="/facilitator/dashboard" 
              element={
                user && userType === 'facilitator' ? <FacilitatorDashboard /> : 
                <Navigate to="/facilitator/login" replace />
              } 
            />
            <Route 
              path="/facilitator/scenario/create" 
              element={
                user && userType === 'facilitator' ? <ScenarioCreation /> : 
                <Navigate to="/facilitator/login" replace />
              } 
            />
            <Route 
              path="/facilitator/simulation/monitor" 
              element={
                user && userType === 'facilitator' ? <SimulationMonitor /> : 
                <Navigate to="/facilitator/login" replace />
              } 
            />
            
            {/* Participant routes */}
            <Route 
              path="/participant/login" 
              element={
                !user ? <ParticipantLogin /> : 
                userType === 'participant' ? <Navigate to="/participant/trading" replace /> :
                <Navigate to="/facilitator/dashboard" replace />
              } 
            />
            <Route 
              path="/participant/trading" 
              element={
                user && userType === 'participant' ? <TradingInterface /> : 
                <Navigate to="/participant/login" replace />
              } 
            />
            
            {/* Simulation results routes */}
            <Route 
              path="/simulation/results" 
              element={
                user ? <SimulationResults /> : 
                <Navigate to="/" replace />
              } 
            />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

