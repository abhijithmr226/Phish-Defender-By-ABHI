
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Activity, Shield, AlertTriangle, Eye, CheckCircle } from "lucide-react";
import { AnalysisResult } from "./PhishDefender";

interface ThreatStatsProps {
  analysisResult: AnalysisResult | null;
}

export const ThreatStats = ({ analysisResult }: ThreatStatsProps) => {
  // Mock statistics for demonstration
  const mockStats = {
    totalScanned: 1247,
    phishingDetected: 89,
    suspiciousEmails: 156,
    safeEmails: 1002,
    todayScanned: 23,
    threatsPrevented: 12
  };

  const threatPercentage = Math.round((mockStats.phishingDetected / mockStats.totalScanned) * 100);
  const suspiciousPercentage = Math.round((mockStats.suspiciousEmails / mockStats.totalScanned) * 100);
  const safePercentage = Math.round((mockStats.safeEmails / mockStats.totalScanned) * 100);

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

      {/* Threat Statistics */}
      <Card className="bg-cyber-navy/50 border-cyber-cyan/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-cyber-cyan">
            <TrendingUp className="w-5 h-5 mr-2" />
            Threat Statistics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-cyber-blue/20 rounded-lg">
              <div className="text-2xl font-bold text-white">{mockStats.totalScanned}</div>
              <div className="text-xs text-gray-400">Total Scanned</div>
            </div>
            <div className="text-center p-3 bg-cyber-blue/20 rounded-lg">
              <div className="text-2xl font-bold text-cyber-cyan">{mockStats.todayScanned}</div>
              <div className="text-xs text-gray-400">Today</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertTriangle className="w-4 h-4 text-cyber-red mr-2" />
                <span className="text-sm text-gray-300">Phishing</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-white">{mockStats.phishingDetected}</span>
                <span className="text-xs text-cyber-red">({threatPercentage}%)</span>
              </div>
            </div>
            <Progress value={threatPercentage} className="bg-cyber-blue/30" />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Eye className="w-4 h-4 text-cyber-orange mr-2" />
                <span className="text-sm text-gray-300">Suspicious</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-white">{mockStats.suspiciousEmails}</span>
                <span className="text-xs text-cyber-orange">({suspiciousPercentage}%)</span>
              </div>
            </div>
            <Progress value={suspiciousPercentage} className="bg-cyber-blue/30" />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-cyber-green mr-2" />
                <span className="text-sm text-gray-300">Safe</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-white">{mockStats.safeEmails}</span>
                <span className="text-xs text-cyber-green">({safePercentage}%)</span>
              </div>
            </div>
            <Progress value={safePercentage} className="bg-cyber-blue/30" />
          </div>
        </CardContent>
      </Card>

      {/* Security Insights */}
      <Card className="bg-cyber-navy/50 border-cyber-cyan/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-cyber-cyan">
            <Shield className="w-5 h-5 mr-2" />
            Security Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Threats Prevented</span>
              <span className="text-lg font-bold text-cyber-green">{mockStats.threatsPrevented}</span>
            </div>
            
            <div className="bg-cyber-blue/20 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">Top Threat Vector</div>
              <div className="text-sm text-white">Social Engineering</div>
            </div>
            
            <div className="bg-cyber-blue/20 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">Risk Level Trend</div>
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 text-cyber-green mr-1" />
                <span className="text-sm text-cyber-green">Decreasing</span>
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
            <span className="text-sm text-cyber-green font-medium">AI Engine: OPERATIONAL</span>
          </div>
          <div className="flex items-center justify-center space-x-2 mt-2">
            <div className="w-2 h-2 bg-cyber-cyan rounded-full animate-pulse"></div>
            <span className="text-xs text-cyber-cyan">BERT Model: v2.1 Active</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
