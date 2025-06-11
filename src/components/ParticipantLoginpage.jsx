import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { useAuth } from "../App";

const BackgroundGraph = () => (
  <div className="absolute inset-0 w-full h-full overflow-hidden" aria-hidden="true">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
      <defs>
        <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(229, 231, 235, 0.2)" strokeWidth="1" />
        </pattern>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "rgba(243, 244, 246, 0.1)" }} />
          <stop offset="100%" style={{ stopColor: "rgba(229, 231, 235, 0.1)" }} />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#gradient)" />
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
    <motion.svg 
      className="absolute bottom-0 left-0 w-full" 
      viewBox="0 0 1440 320" 
      xmlns="http://www.w3.org/2000/svg" 
      preserveAspectRatio="none"
    >
      <motion.path 
        fill="rgba(239, 246, 255, 0.5)" 
        d="M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,208C672,224,768,224,864,202.7C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
        initial={{ pathLength: 0, pathOffset: 1 }} 
        animate={{ pathLength: 1, pathOffset: 0 }} 
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </motion.svg>
  </div>
);

export default function ParticipantLogin({ activeSessions = 12 }) {
  const [participantId, setParticipantId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!participantId) {
      newErrors.participantId = "Participant ID is required.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setIsSubmitting(true);
    
    if (Object.keys(validationErrors).length === 0) {
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        
        // Mock successful login
        const userData = {
          id: participantId,
          participantId: participantId,
          name: `Participant ${participantId}`,
          role: "participant"
        };
        
        login(userData, 'participant');
        navigate('/participant/dashboard');
      }, 2000);
    } else {
      setIsSubmitting(false);
    }
  };

  const errorShake = {
    initial: { x: 0 },
    animate: { x: [-10, 10, -10, 10, 0] },
    transition: { duration: 0.5 }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gray-50 p-4 font-['Inter']" style={{ fontFamily: "'Inter', sans-serif" }}>
      <BackgroundGraph />
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} 
        className="relative w-full max-w-md"
      >
        <Card className="w-full max-w-md rounded-2xl shadow-lg border-gray-200/80 overflow-hidden bg-white/80 backdrop-blur-sm">
          <AnimatePresence>
            {activeSessions > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }} 
                className="absolute top-6 right-6"
              >
                <div className="flex items-center justify-center bg-emerald-500/10 text-emerald-600 rounded-full px-3 py-1 text-xs font-medium" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Active: {activeSessions}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <CardHeader className="text-center pt-12 pb-8 px-8">
            <div className="flex justify-center items-center mb-4">
              <BarChart2 className="h-10 w-10 text-blue-600" />
              <h1 className="text-3xl font-bold tracking-tighter ml-2 text-gray-800">PlatformX</h1>
            </div>
            <p className="font-bold text-gray-500" style={{ color: "#6B7280" }}>
              Trading Simulation
            </p>
          </CardHeader>

          <CardContent className="px-8">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="relative">
                <Input 
                  id="participantId" 
                  name="participantId" 
                  type="text" 
                  value={participantId} 
                  onChange={(e) => setParticipantId(e.target.value)} 
                  className={cn("peer h-12 w-full rounded-md px-4 text-base transition-colors focus:border-blue-500", errors.participantId ? "border-red-500" : "border-gray-300")} 
                  placeholder=" " 
                />
                <Label htmlFor="participantId" className="absolute left-4 top-3 text-gray-500 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs">
                  Participant ID / Username
                </Label>
                <AnimatePresence>
                  {errors.participantId && (
                    <motion.p {...errorShake} className="mt-2 text-xs text-red-500" style={{ color: "#EF4444" }}>
                      {errors.participantId}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative">
                <Input 
                  id="password" 
                  name="password" 
                  type={showPassword ? "text" : "password"} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className={cn("peer h-12 w-full rounded-md px-4 pr-12 text-base transition-colors focus:border-blue-500", errors.password ? "border-red-500" : "border-gray-300")} 
                  placeholder=" " 
                />
                <Label htmlFor="password" className="absolute left-4 top-3 text-gray-500 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs">
                  Password
                </Label>
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 hover:text-gray-700" 
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                <AnimatePresence>
                  {errors.password && (
                    <motion.p {...errorShake} className="mt-2 text-xs text-red-500" style={{ color: "#EF4444" }}>
                      {errors.password}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember-me" 
                    checked={rememberMe} 
                    onCheckedChange={(checked) => setRememberMe(Boolean(checked))} 
                    className="h-5 w-5 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500" 
                  />
                  <Label htmlFor="remember-me" className="text-sm font-medium text-gray-700">
                    Remember me
                  </Label>
                </div>
              </div>

              <div>
                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-bold text-white rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30" 
                  style={{ backgroundColor: "#10B981" }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col items-center px-8 pb-12 pt-6">
            <a href="#" className="text-sm font-medium hover:underline" style={{ color: "#3B82F6" }}>
              Need Help?
            </a>
            <div className="relative my-6 w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white/80 px-2 text-gray-500">Or</span>
              </div>
            </div>
            <Button variant="secondary" className="w-full h-12 text-base font-bold rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200">
              Join Simulation
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

