import React, { useState } from "react";
import {
  Plane,
  User,
  LogIn,
  LogOut,
  UserPlus,
  ChevronDown,
} from "lucide-react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogin = () => {
    // Simulate login - replace with actual auth logic
    setIsLoggedIn(true);
    setUser({ name: "John Doe", email: "john@example.com" });
    setShowDropdown(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setShowDropdown(false);
  };

  const handleCreateAccount = () => {
    // Simulate account creation - replace with actual auth logic
    setIsLoggedIn(true);
    setUser({ name: "New User", email: "newuser@example.com" });
    setShowDropdown(false);
  };

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 mb-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <Plane size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">
            SpotterFlights
          </h1>
        </div>

        {/* Account Section */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <User size={18} className="text-slate-600" />
            <span className="text-sm font-medium text-slate-700">
              {isLoggedIn ? user?.name : "Account"}
            </span>
            <ChevronDown
              size={16}
              className={`text-slate-500 transition-transform ${showDropdown ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
              {isLoggedIn ? (
                <>
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-sm font-medium text-slate-800">
                      {user?.name}
                    </p>
                    <p className="text-xs text-slate-500">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <LogOut size={16} />
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleLogin}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <LogIn size={16} />
                    Log In
                  </button>
                  <button
                    onClick={handleCreateAccount}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <UserPlus size={16} />
                    Create Account
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
