import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "../App";

// A subtle background pattern component to avoid cluttering the main component
const FinancialChartPattern = () => (
  <div className="absolute inset-0 w-full h-full bg-gray-50 dark:bg-gray-900 overflow-hidden" aria-hidden="true">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
      <defs>
        <pattern id="financial_pattern" patternUnits="userSpaceOnUse" width="80" height="80" patternTransform="scale(1) rotate(0)">
          <path d="M 20 80 Q 40 20 60 80" stroke="rgba(229, 231, 235, 1)" strokeWidth="1" fill="none" className="dark:stroke-gray-800" />
          <path d="M 0 60 Q 20 0 40 60" stroke="rgba(229, 231, 235, 1)" strokeWidth="1" fill="none" className="dark:stroke-gray-800" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#financial_pattern)" />
    </svg>
  </div>
);

// A simple SVG logo for PlatformX
const PlatformXLogo = ({ className }) => (
  <svg className={cn("h-8 w-auto text-gray-800 dark:text-white", className)} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="PlatformX Logo">
    <title>PlatformX Logo</title>
    <path d="M20 0L40 20L20 40L0 20L20 0Z" fill="currentColor" fillOpacity="0.1" />
    <path d="M20 5L35 20L20 35L5 20L20 5Z" stroke="currentColor" strokeWidth="2" />
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="20" fontWeight="bold" fill="currentColor" className="font-sans">
      X
    </text>
  </svg>
);

export default function FacilitatorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: ""
    };
    let isValid = true;
    
    if (!email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid.";
      isValid = false;
    }
    
    if (!password) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        
        // Mock successful login
        const userData = {
          id: 1,
          email: email,
          name: "John Facilitator",
          role: "facilitator"
        };
        
        login(userData, 'facilitator');
        navigate('/facilitator/dashboard');
        
        setErrors({
          email: "",
          password: ""
        });
      }, 2000);
    }
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-4 font-sans bg-gray-100 dark:bg-gray-900">
      <FinancialChartPattern />
      <motion.div 
        initial={{ opacity: 0, y: -20, scale: 0.95 }} 
        animate={{ opacity: 1, y: 0, scale: 1 }} 
        transition={{ duration: 0.5, ease: "easeOut" }} 
        className="relative w-full max-w-md"
      >
        <Card className="w-full rounded-2xl shadow-lg border-gray-200/80 dark:border-gray-800/50 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
          <CardHeader className="text-center p-6 sm:p-8">
            <div className="flex justify-center mb-4">
              <PlatformXLogo />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100 font-sans tracking-tight">
              Facilitator Portal
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 pt-1">
              Sign in to manage your platform activities.
            </CardDescription>
            <div className="flex justify-center pt-4">
              <Badge variant="secondary" className="font-mono text-xs font-medium rounded-md bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                <ShieldCheck className="h-3 w-3 mr-1.5" />
                Facilitator Access
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6 sm:p-8 pt-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className={cn("text-sm font-medium", errors.email ? "text-red-500 dark:text-red-400" : "text-gray-700 dark:text-gray-300")}>
                  Email Address
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className={cn("h-12 text-base rounded-lg px-4", errors.email && "border-red-500 dark:border-red-400 focus-visible:ring-red-500/50")} 
                  aria-invalid={!!errors.email} 
                  aria-describedby="email-error" 
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p 
                      id="email-error" 
                      className="text-xs text-red-500 dark:text-red-400 font-medium pt-1" 
                      initial={{ opacity: 0, y: -10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className={cn("text-sm font-medium", errors.password ? "text-red-500 dark:text-red-400" : "text-gray-700 dark:text-gray-300")}>
                  Password
                </Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className={cn("h-12 text-base rounded-lg px-4 pr-12", errors.password && "border-red-500 dark:border-red-400 focus-visible:ring-red-500/50")} 
                    aria-invalid={!!errors.password} 
                    aria-describedby="password-error" 
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-0 right-0 h-12 w-12 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100" 
                    onClick={() => setShowPassword(!showPassword)} 
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </Button>
                </div>
                <AnimatePresence>
                  {errors.password && (
                    <motion.p 
                      id="password-error" 
                      className="text-xs text-red-500 dark:text-red-400 font-medium pt-1" 
                      initial={{ opacity: 0, y: -10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: -10 }}
                    >
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
                    onCheckedChange={(checked) => setRememberMe(!!checked)} 
                    className="rounded-[4px] border-gray-400" 
                  />
                  <Label htmlFor="remember-me" className="text-sm font-medium text-gray-600 dark:text-gray-300 cursor-pointer">
                    Remember me
                  </Label>
                </div>
                <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                  Forgot Password?
                </a>
              </div>

              <div>
                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-bold rounded-lg bg-[#1E40AF] hover:bg-[#1E40AF]/90 text-white dark:bg-blue-500 dark:hover:bg-blue-500/90 dark:text-white" 
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Sign In"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
          © {new Date().getFullYear()} PlatformX, Inc. All rights reserved.
        </p>
      </motion.div>
    </main>
  );
}

