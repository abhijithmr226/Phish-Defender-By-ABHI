
import { Shield } from "lucide-react";

export const Header = () => {
  return (
    <header className="text-center">
      <div className="flex items-center justify-center mb-4">
        <div className="relative">
          <Shield className="w-16 h-16 text-cyber-cyan animate-pulse-glow" />
          <div className="absolute inset-0 w-16 h-16 border-2 border-cyber-cyan rounded-full animate-ping opacity-20"></div>
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyber-cyan to-cyber-green bg-clip-text text-transparent mb-2">
        Phish Defender
      </h1>
      
      <p className="text-lg text-gray-300 mb-2">
        AI-Powered Email Threat Analyzer
      </p>
      
      <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
        <span className="flex items-center">
          <div className="w-2 h-2 bg-cyber-green rounded-full mr-2 animate-pulse"></div>
          BERT Model Active
        </span>
        <span className="flex items-center">
          <div className="w-2 h-2 bg-cyber-cyan rounded-full mr-2 animate-pulse"></div>
          Real-time Analysis
        </span>
      </div>
    </header>
  );
};
