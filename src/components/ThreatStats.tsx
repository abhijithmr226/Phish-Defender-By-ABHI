
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Activity, 
  Shield, 
  AlertTriangle, 
  Eye, 
  CheckCircle,
  Monitor,
  Clock
} from "lucide-react";
import { AnalysisResult } from "./PhishDefender";
import { useState, useEffect } from "react";

interface ThreatStatsProps {
  analysisResult: AnalysisResult | null;
}

export const ThreatStats = ({ analysisResult }: ThreatStatsProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sessionStart] = useState(new Date());
  const [analysisCount, setAnalysisCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (analysisResult) {
      setAnalysisCount(prev => prev + 1);
    }
  }, [analysisResult]);

  const sessionDuration = Math.floor((currentTime.getTime() - sessionStart.getTime()) / 1000);
  const sessionMinutes = Math.floor(sessionDuration / 60);
  const sessionSeconds = sessionDuration % 60;

  // Get real browser information
  const browserInfo = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    onLine: navigator.onLine,
    platform: navigator.platform,
    cookieEnabled: navigator.cookieEnabled
  };

  return (
    <div className="space-y-6">
      {/* Current Analysis Status */}
      <Card className="bg-cyber-navy/50 border-cyber-cyan/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-cyber-cyan">
            <Activity className="w-5 h-5 mr-2" />
            Analysis Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {analysisResult ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Current Threat Level</span>
                <span className="text-white font-semibold">{analysisResult.threatLevel}/100</span>
              </div>
              <Progress value={analysisResult.threatLevel} className="bg-cyber-blue/30" />
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Confidence Score</span>
                <span className="text-cyber-cyan font-semibold">{analysisResult.confidence}%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Status</span>
                <span className={`font-semibold ${
                  analysisResult.verdict === 'phishing' ? 'text-cyber-red' :
                  analysisResult.verdict === 'suspicious' ? 'text-cyber-orange' :
                  'text-cyber-green'
                }`}>
                  {analysisResult.verdict.toUpperCase()}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Shield className="w-12 h-12 mx-auto text-gray-600 mb-3" />
              <p className="text-gray-500">No analysis performed yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Session Statistics */}
      <Card className="bg-cyber-navy/50 border-cyber-cyan/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-cyber-cyan">
            <TrendingUp className="w-5 h-5 mr-2" />
            Session Statistics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-cyber-blue/20 rounded-lg">
              <div className="text-2xl font-bold text-white">{analysisCount}</div>
              <div className="text-xs text-gray-400">Emails Analyzed</div>
            </div>
            <div className="text-center p-3 bg-cyber-blue/20 rounded-lg">
              <div className="text-lg font-bold text-cyber-cyan">
                {sessionMinutes}:{sessionSeconds.toString().padStart(2, '0')}
              </div>
              <div className="text-xs text-gray-400">Session Time</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-cyber-green mr-2" />
                <span className="text-sm text-gray-300">Current Time</span>
              </div>
              <span className="text-sm text-white">{currentTime.toLocaleTimeString()}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Monitor className="w-4 h-4 text-cyber-cyan mr-2" />
                <span className="text-sm text-gray-300">Browser</span>
              </div>
              <span className="text-sm text-white">
                {browserInfo.userAgent.includes('Chrome') ? 'Chrome' :
                 browserInfo.userAgent.includes('Firefox') ? 'Firefox' :
                 browserInfo.userAgent.includes('Safari') ? 'Safari' : 'Other'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Eye className="w-4 h-4 text-cyber-orange mr-2" />
                <span className="text-sm text-gray-300">Platform</span>
              </div>
              <span className="text-sm text-white">{browserInfo.platform}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Information */}
      <Card className="bg-cyber-navy/50 border-cyber-cyan/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-cyber-cyan">
            <Shield className="w-5 h-5 mr-2" />
            System Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Connection Status</span>
              <span className={`text-sm font-bold ${browserInfo.onLine ? 'text-cyber-green' : 'text-cyber-red'}`}>
                {browserInfo.onLine ? 'ONLINE' : 'OFFLINE'}
              </span>
            </div>
            
            <div className="bg-cyber-blue/20 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">Language</div>
              <div className="text-sm text-white">{browserInfo.language}</div>
            </div>
            
            <div className="bg-cyber-blue/20 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">Cookies Enabled</div>
              <div className="flex items-center">
                {browserInfo.cookieEnabled ? (
                  <CheckCircle className="w-4 h-4 text-cyber-green mr-1" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-cyber-red mr-1" />
                )}
                <span className={`text-sm ${browserInfo.cookieEnabled ? 'text-cyber-green' : 'text-cyber-red'}`}>
                  {browserInfo.cookieEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card className="bg-cyber-navy/50 border-cyber-green/20 backdrop-blur-sm">
        <CardContent className="py-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse"></div>
            <span className="text-sm text-cyber-green font-medium">System: OPERATIONAL</span>
          </div>
          <div className="flex items-center justify-center space-x-2 mt-2">
            <div className="w-2 h-2 bg-cyber-cyan rounded-full animate-pulse"></div>
            <span className="text-xs text-cyber-cyan">Analysis Engine: Ready</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
