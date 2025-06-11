"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import BreadcrumbNavigation from "./BreadcrumbNavigation.jsx";
import ScenarioPreviewCard from "./ScenarioPreviewCard.jsx";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Slider } from "../ui/slider";
import { Save, Eye, Send } from "lucide-react";
import { useAuth } from "../../App";
import { useNavigate } from "react-router-dom";

const MAX_DESC_LENGTH = 500;

export default function ScenarioCreationForm() {
  const { addSimulation } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("New Trading Scenario");
  const [description, setDescription] = useState("");
  const [scenarioType, setScenarioType] = useState("Bull Run");
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [priceRange, setPriceRange] = useState([50000, 75000]);
  const [timeDuration, setTimeDuration] = useState("1w");
  const [participantLimit, setParticipantLimit] = useState(100);
  const [errors, setErrors] = useState({});

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (newTitle.trim() === "") {
      setErrors(prev => ({
        ...prev,
        title: "Scenario title cannot be empty."
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        title: undefined
      }));
    }
  };

  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    if (newDescription.length <= MAX_DESC_LENGTH) {
      setDescription(newDescription);
    }
    if (newDescription.length > MAX_DESC_LENGTH) {
      setErrors(prev => ({
        ...prev,
        description: `Description cannot exceed ${MAX_DESC_LENGTH} characters.`
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        description: undefined
      }));
    }
  };

  const handlePublish = () => {
    const newScenario = {
      id: `SIM${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      title,
      description,
      scenarioType,
      difficulty,
      priceRange,
      timeDuration,
      participantLimit,
      status: "Pending",
      participants: `0/${participantLimit}`,
      duration: timeDuration
    };
    addSimulation(newScenario);
    navigate("/facilitator/dashboard");
  };

  const breadcrumbs = [
    { label: "Dashboard", href: "/facilitator/dashboard" },
    { label: "Scenarios", href: "#" },
    { label: "Create New" }
  ];

  const difficultyOptions = [
    { label: "Beginner", color: "bg-blue-500 hover:bg-blue-600" },
    { label: "Intermediate", color: "bg-amber-500 hover:bg-amber-600" },
    { label: "Advanced", color: "bg-red-500 hover:bg-red-600" }
  ];

  return (
    <div className="bg-background text-foreground font-sans min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <BreadcrumbNavigation crumbs={breadcrumbs} />
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left Column: Form */}
          <div className="lg:col-span-2 space-y-10">
            <div className="space-y-2">
              <Label htmlFor="scenario-title" className="text-sm font-medium text-muted-foreground">Scenario Title</Label>
              <Input id="scenario-title" type="text" value={title} onChange={handleTitleChange} placeholder="e.g., Q4 Crypto Surge" className="text-3xl font-bold h-auto p-2 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 !bg-transparent -mx-2" />
              <AnimatePresence>
                {errors.title && <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-sm text-red-500 font-medium pt-1">{errors.title}</motion.p>}
              </AnimatePresence>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-muted-foreground">Description</Label>
              <Textarea id="description" value={description} onChange={handleDescriptionChange} placeholder="Describe the market conditions, objectives, and rules for this scenario..." className="min-h-[120px] text-base resize-none" rows={4} />
              <div className="flex justify-end text-sm text-muted-foreground">
                <span>{description.length} / {MAX_DESC_LENGTH}</span>
              </div>
               <AnimatePresence>
                {errors.description && <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-sm text-red-500 font-medium">{errors.description}</motion.p>}
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <Label htmlFor="scenario-type">Scenario Type</Label>
                    <Select value={scenarioType} onValueChange={(value) => setScenarioType(value)}>
                        <SelectTrigger id="scenario-type">
                            <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Market Crash">Market Crash</SelectItem>
                            <SelectItem value="Bull Run">Bull Run</SelectItem>
                            <SelectItem value="Volatility">Volatility</SelectItem>
                            <SelectItem value="Custom">Custom</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Difficulty</Label>
                    <div className="flex space-x-2">
                        {difficultyOptions.map(opt => (
                            <motion.button key={opt.label} onClick={() => setDifficulty(opt.label)} className={cn("px-4 py-2 rounded-full text-sm font-bold text-white transition-all duration-200", opt.color, difficulty === opt.label ? "ring-2 ring-offset-2 ring-offset-background ring-primary" : "opacity-70 hover:opacity-100")} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                {opt.label}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-6 border-t border-border pt-8">
                <h2 className="text-xl font-semibold">Market Parameters</h2>
                <div className="space-y-4">
                    <Label>Price Range</Label>
                    <Slider value={priceRange} onValueChange={setPriceRange} min={0} max={200000} step={1000} className="my-4" />
                    <div className="flex justify-between font-mono text-sm">
                        <span>${priceRange[0].toLocaleString()}</span>
                        <span>${priceRange[1].toLocaleString()}</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <Label htmlFor="time-duration">Time Duration</Label>
                        <Select value={timeDuration} onValueChange={setTimeDuration}>
                            <SelectTrigger id="time-duration">
                                <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1d">1 Day</SelectItem>
                                <SelectItem value="1w">1 Week</SelectItem>
                                <SelectItem value="1m">1 Month</SelectItem>
                                <SelectItem value="custom">Custom</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="participant-limit">Participant Limit</Label>
                        <Input id="participant-limit" type="number" value={participantLimit} onChange={e => setParticipantLimit(parseInt(e.target.value, 10) || 0)} className="font-mono" />
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-6">
                <Button variant="secondary" size="lg" className="bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-xl font-bold">
                    <Save className="mr-2 h-5 w-5" /> Save Draft
                </Button>
                <Button size="lg" className="bg-amber-500 text-white hover:bg-amber-600 rounded-xl font-bold">
                    <Eye className="mr-2 h-5 w-5" /> Preview
                </Button>
                <Button size="lg" className="bg-emerald-500 text-white hover:bg-emerald-600 rounded-xl font-bold ml-auto" onClick={handlePublish}>
                    <Send className="mr-2 h-5 w-5" /> Publish
                </Button>
            </div>
          </div>

          {/* Right Column: Preview */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8">
              <ScenarioPreviewCard title={title} description={description} scenarioType={scenarioType} difficulty={difficulty} minPrice={priceRange[0]} maxPrice={priceRange[1]} timeDuration={timeDuration} participantLimit={participantLimit} />
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}

