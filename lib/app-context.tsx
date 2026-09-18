"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { Match, AppNotification } from "./types";
import { MATCH_IND_VS_PAK } from "./mock-data";
import { MatchSimulator, SimulationOutcome } from "./simulator-engine";
import { JURISDICTIONS, Jurisdiction } from "./compliance";

interface AppContextType {
  liveMatch: Match;
  isSimulating: boolean;
  simSpeedMs: number;
  toggleSimulation: () => void;
  stepNextBall: (outcome?: Partial<SimulationOutcome>) => void;
  resetMatch: () => void;
  jurisdiction: Jurisdiction;
  setJurisdictionCode: (code: string) => void;
  isAgeVerified: boolean;
  verifyAge: () => void;
  favorites: {
    teams: string[];
    players: string[];
    toggleTeam: (code: string) => void;
    togglePlayer: (id: string) => void;
  };
  notifications: AppNotification[];
  unreadNotificationCount: number;
  markNotificationsRead: () => void;
  addNotification: (title: string, message: string, type: AppNotification["type"]) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  user: {
    isLoggedIn: boolean;
    name: string;
    email: string;
    login: (name: string, email: string) => void;
    logout: () => void;
  };
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [simulator] = useState(() => new MatchSimulator(MATCH_IND_VS_PAK));
  const [liveMatch, setLiveMatch] = useState<Match>(() => simulator.getMatch());
  const [isSimulating, setIsSimulating] = useState(false);
  const [simSpeedMs, setSimSpeedMs] = useState(3000);

  const [jurisdictionCode, setJurisdictionCodeState] = useState("UK");
  const [isAgeVerified, setIsAgeVerified] = useState(true);

  const [favTeams, setFavTeams] = useState<string[]>(["IND", "CSK"]);
  const [favPlayers, setFavPlayers] = useState<string[]>(["virat-kohli", "jasprit-bumrah"]);

  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: "n1",
      title: "100-Run Partnership!",
      message: "Virat Kohli & Hardik Pandya cross 100 runs off 53 balls at the MCG.",
      time: "2 mins ago",
      read: false,
      type: "MILESTONE",
      matchId: "ind-vs-pak-t20wc-final"
    },
    {
      id: "n2",
      title: "Fifty for Virat Kohli",
      message: "Crucial fifty in 37 balls keeps India alive in the chase of 210.",
      time: "12 mins ago",
      read: false,
      type: "MILESTONE",
      matchId: "ind-vs-pak-t20wc-final"
    },
    {
      id: "n3",
      title: "Ticket Release Notice",
      message: "Limited final round tickets released for Ahmedabad Semi-Final on BookMyShow.",
      time: "1 hour ago",
      read: true,
      type: "NEWS"
    }
  ]);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [user, setUser] = useState({
    isLoggedIn: true,
    name: "Alex Morgan",
    email: "alex.cricket@cricpulse.com"
  });

  // Subscribe to simulator updates
  useEffect(() => {
    const unsub = simulator.subscribe((updated) => {
      setLiveMatch(updated);
    });
    return unsub;
  }, [simulator]);

  // Simulation timer loop
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (isSimulating) {
      timerRef.current = setInterval(() => {
        simulator.stepBall();
      }, simSpeedMs);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isSimulating, simSpeedMs, simulator]);

  // Global Cmd+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleSimulation = () => {
    setIsSimulating(prev => !prev);
  };

  const stepNextBall = (forced?: Partial<SimulationOutcome>) => {
    simulator.stepBall(forced);
  };

  const resetMatch = () => {
    setIsSimulating(false);
    simulator.resetMatch(MATCH_IND_VS_PAK);
  };

  const verifyAge = () => {
    setIsAgeVerified(true);
  };

  const toggleTeam = (code: string) => {
    setFavTeams(prev => prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]);
  };

  const togglePlayer = (id: string) => {
    setFavPlayers(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const markNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addNotification = (title: string, message: string, type: AppNotification["type"]) => {
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title,
        message,
        time: "Just now",
        read: false,
        type
      },
      ...prev
    ]);
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  const currentJurisdiction = JURISDICTIONS[jurisdictionCode] || JURISDICTIONS.UK;

  return (
    <AppContext.Provider
      value={{
        liveMatch,
        isSimulating,
        simSpeedMs,
        toggleSimulation,
        stepNextBall,
        resetMatch,
        jurisdiction: currentJurisdiction,
        setJurisdictionCode: setJurisdictionCodeState,
        isAgeVerified,
        verifyAge,
        favorites: {
          teams: favTeams,
          players: favPlayers,
          toggleTeam,
          togglePlayer,
        },
        notifications,
        unreadNotificationCount,
        markNotificationsRead,
        addNotification,
        isSearchOpen,
        setIsSearchOpen,
        user: {
          isLoggedIn: user.isLoggedIn,
          name: user.name,
          email: user.email,
          login: (name: string, email: string) => setUser({ isLoggedIn: true, name, email }),
          logout: () => setUser({ isLoggedIn: false, name: "", email: "" })
        }
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
