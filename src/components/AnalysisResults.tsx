
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Shield, CheckCircle, Eye, Zap, FileText } from "lucide-react";
import { EmailData, AnalysisResult } from "./PhishDefender";

interface AnalysisResultsProps {
  emailData: EmailData | null;
  result: AnalysisResult | null;
  isAnalyzing: boolean;
}

export const AnalysisResults = ({ emailData, result, isAnalyzing }: AnalysisResultsProps) => {
  if (isAnalyzing) {
    return (
      <Card className="bg-cyber-navy/50 border-cyber-cyan/20 backdrop-blur-sm">
        <CardContent className="py-12">
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-cyber-cyan/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-cyber-cyan border-t-transparent rounded-full animate-spin"></div>
              <Zap className="absolute inset-0 m-auto w-8 h-8 text-cyber-cyan" />
            </div>
            <h3 className="text-xl font-semibold text-cyber-cyan mb-2">AI Analysis in Progress</h3>
            <p className="text-gray-400 mb-4">BERT model is analyzing email patterns...</p>
            <div className="w-full max-w-md mx-auto space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Analyzing content...</span>
                <span>33%</span>
              </div>
              <Progress value={33} className="bg-cyber-blue/30" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!result || !emailData) return null;

  const getVerdictConfig = (verdict: string) => {
    switch (verdict) {
      case 'phishing':
        return {
          icon: AlertTriangle,
          color: 'text-cyber-red',
          bg: 'bg-threat-gradient',
          label: 'PHISHING DETECTED',
          description: 'High-risk phishing attempt identified'
        };
      case 'suspicious':
        return {
          icon: Eye,
          color: 'text-cyber-orange',
          bg: 'bg-warning-gradient',
          label: 'SUSPICIOUS',
          description: 'Potential security concerns detected'
        };
      default:
        return {
          icon: CheckCircle,
          color: 'text-cyber-green',
          bg: 'bg-safe-gradient',
          label: 'SAFE',
          description: 'No immediate threats detected'
        };
    }
  };

  const verdictConfig = getVerdictConfig(result.verdict);
  const VerdictIcon = verdictConfig.icon;

  return (
    <div className="space-y-6">
      {/* Verdict Card */}
      <Card className="bg-cyber-navy/50 border-cyber-cyan/20 backdrop-blur-sm">
        <CardContent className="py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${verdictConfig.bg}`}>
                <VerdictIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className={`text-2xl font-bold ${verdictConfig.color}`}>
                  {verdictConfig.label}
                </h3>
                <p className="text-gray-400">{verdictConfig.description}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white mb-1">
                {result.confidence}%
              </div>
              <div className="text-sm text-gray-400">Confidence</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-cyber-blue/20 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Threat Level</div>
              <div className="flex items-center space-x-2">
                <Progress value={result.threatLevel} className="flex-1 bg-cyber-blue/30" />
                <span className="text-white font-semibold">{result.threatLevel}/100</span>
              </div>
            </div>
            <div className="bg-cyber-blue/20 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Keywords Found</div>
              <div className="text-xl font-bold text-cyber-cyan">
                {result.highlightedKeywords.length}
              </div>
            </div>
            <div className="bg-cyber-blue/20 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">URLs Detected</div>
              <div className="text-xl font-bold text-cyber-cyan">
                {emailData.urls.length}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Content Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-cyber-navy/50 border-cyber-cyan/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-cyber-cyan">
              <FileText className="w-5 h-5 mr-2" />
              Original Email
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-400">Subject:</div>
                <div className="text-white bg-cyber-blue/20 p-2 rounded">
                  {emailData.subject}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-400">From:</div>
                  <div className="text-white text-sm bg-cyber-blue/20 p-2 rounded">
                    {emailData.from}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">To:</div>
                  <div className="text-white text-sm bg-cyber-blue/20 p-2 rounded">
                    {emailData.to}
                  </div>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-2">Body:</div>
                <div className="text-white bg-cyber-blue/20 p-3 rounded max-h-60 overflow-y-auto text-sm leading-relaxed">
                  {highlightSuspiciousContent(emailData.body, result.highlightedKeywords)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-cyber-navy/50 border-cyber-cyan/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-cyber-cyan">
              <Shield className="w-5 h-5 mr-2" />
              Analysis Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-2">Reasoning:</h4>
              <ul className="space-y-1">
                {result.reasoning.map((reason, index) => (
                  <li key={index} className="text-sm text-gray-400 flex items-start">
                    <span className="text-cyber-cyan mr-2">•</span>
                    {reason}
                  </li>
                ))}
              </ul>
            </div>

            {result.highlightedKeywords.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Suspicious Keywords:</h4>
                <div className="flex flex-wrap gap-2">
                  {result.highlightedKeywords.map((keyword, index) => (
                    <Badge key={index} variant="outline" className="border-cyber-red text-cyber-red">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {emailData.urls.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Detected URLs:</h4>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {emailData.urls.map((url, index) => (
                    <div key={index} className="text-xs text-cyber-orange bg-cyber-blue/20 p-2 rounded">
                      {url}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-2">Recommendations:</h4>
              <ul className="space-y-1">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="text-sm text-gray-400 flex items-start">
                    <span className="text-cyber-green mr-2">✓</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detected Threats */}
      {result.detectedThreats.length > 0 && (
        <Card className="bg-cyber-navy/50 border-cyber-red/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-cyber-red">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Detected Threats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {result.detectedThreats.map((threat, index) => (
                <div key={index} className="bg-cyber-blue/20 border border-cyber-red/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white">{threat.type}</h4>
                    <Badge 
                      variant="outline" 
                      className={`
                        ${threat.severity === 'high' 
                          ? 'border-cyber-red text-cyber-red' 
                          : threat.severity === 'medium'
                          ? 'border-cyber-orange text-cyber-orange'
                          : 'border-yellow-500 text-yellow-500'
                        }
                      `}
                    >
                      {threat.severity.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400">{threat.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const highlightSuspiciousContent = (content: string, keywords: string[]) => {
  if (keywords.length === 0) return content;
  
  let highlightedContent = content;
  keywords.forEach(keyword => {
    const regex = new RegExp(`(${keyword})`, 'gi');
    highlightedContent = highlightedContent.replace(
      regex, 
      '<mark class="bg-cyber-red/30 text-cyber-red font-semibold">$1</mark>'
    );
  });
  
  return <div dangerouslySetInnerHTML={{ __html: highlightedContent }} />;
};
