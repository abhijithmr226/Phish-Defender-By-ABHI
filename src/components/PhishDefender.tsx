
import { useState } from "react";
import { Header } from "./Header";
import { EmailInput } from "./EmailInput";
import { AnalysisResults } from "./AnalysisResults";
import { ThreatStats } from "./ThreatStats";

export interface EmailData {
  subject: string;
  from: string;
  to: string;
  body: string;
  headers: string;
  urls: string[];
}

export interface AnalysisResult {
  verdict: 'safe' | 'suspicious' | 'phishing';
  confidence: number;
  reasoning: string[];
  highlightedKeywords: string[];
  threatLevel: number;
  recommendations: string[];
  detectedThreats: {
    type: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
  }[];
}

export const PhishDefender = () => {
  const [emailData, setEmailData] = useState<EmailData | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleEmailSubmit = async (data: EmailData) => {
    setEmailData(data);
    setIsAnalyzing(true);
    
    // Simulate AI analysis with more sophisticated logic
    await simulateAnalysis(data);
  };

  const simulateAnalysis = async (data: EmailData) => {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Enhanced analysis simulation
    const suspiciousKeywords = [
      'urgent', 'verify', 'account', 'suspended', 'click here', 'login now',
      'immediate action', 'expires', 'confirm', 'security alert', 'winner',
      'prize', 'congratulations', 'act now', 'limited time', 'free'
    ];

    const phishingDomains = [
      'secure-bank-update.com', 'paypal-security.net', 'amazon-verify.org',
      'google-account.info', 'microsoft-security.biz'
    ];

    const emailText = `${data.subject} ${data.body} ${data.from}`.toLowerCase();
    
    const foundKeywords = suspiciousKeywords.filter(keyword => 
      emailText.includes(keyword.toLowerCase())
    );

    const hasSuspiciousDomain = phishingDomains.some(domain =>
      data.from.toLowerCase().includes(domain) || 
      data.urls.some(url => url.toLowerCase().includes(domain))
    );

    const hasMultipleUrls = data.urls.length > 3;
    const hasUrgentLanguage = foundKeywords.some(keyword => 
      ['urgent', 'immediate', 'expires', 'act now'].includes(keyword.toLowerCase())
    );

    // Calculate threat score
    let threatScore = 0;
    if (foundKeywords.length > 0) threatScore += foundKeywords.length * 15;
    if (hasSuspiciousDomain) threatScore += 40;
    if (hasMultipleUrls) threatScore += 20;
    if (hasUrgentLanguage) threatScore += 25;
    if (data.urls.length > 0 && !data.urls.some(url => url.includes('https://'))) threatScore += 15;

    // Determine verdict
    let verdict: 'safe' | 'suspicious' | 'phishing';
    let confidence: number;

    if (threatScore >= 60) {
      verdict = 'phishing';
      confidence = Math.min(95, 70 + (threatScore - 60) * 0.5);
    } else if (threatScore >= 30) {
      verdict = 'suspicious';
      confidence = Math.min(90, 60 + (threatScore - 30) * 0.8);
    } else {
      verdict = 'safe';
      confidence = Math.max(75, 95 - threatScore * 2);
    }

    const detectedThreats = [];
    if (foundKeywords.length > 0) {
      detectedThreats.push({
        type: 'Social Engineering',
        description: `Detected ${foundKeywords.length} suspicious keywords`,
        severity: foundKeywords.length > 3 ? 'high' : 'medium' as 'high' | 'medium'
      });
    }
    if (hasSuspiciousDomain) {
      detectedThreats.push({
        type: 'Domain Spoofing',
        description: 'Suspicious domain detected in sender or URLs',
        severity: 'high' as 'high'
      });
    }
    if (hasMultipleUrls) {
      detectedThreats.push({
        type: 'URL Flooding',
        description: 'Multiple URLs detected - potential redirect attack',
        severity: 'medium' as 'medium'
      });
    }

    const reasoning = [];
    if (foundKeywords.length > 0) reasoning.push(`Found ${foundKeywords.length} suspicious keywords`);
    if (hasSuspiciousDomain) reasoning.push('Suspicious domain pattern detected');
    if (hasMultipleUrls) reasoning.push('Multiple URLs present');
    if (hasUrgentLanguage) reasoning.push('Urgent language patterns detected');

    const recommendations = [];
    if (verdict === 'phishing') {
      recommendations.push('Delete this email immediately');
      recommendations.push('Report to your security team');
      recommendations.push('Do not click any links or download attachments');
    } else if (verdict === 'suspicious') {
      recommendations.push('Exercise caution with this email');
      recommendations.push('Verify sender through alternative means');
      recommendations.push('Avoid clicking links until verified');
    } else {
      recommendations.push('Email appears safe to proceed');
      recommendations.push('Continue with normal caution');
    }

    const result: AnalysisResult = {
      verdict,
      confidence: Math.round(confidence),
      reasoning,
      highlightedKeywords: foundKeywords,
      threatLevel: Math.round(threatScore),
      recommendations,
      detectedThreats
    };

    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setEmailData(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-cyber-gradient">
      <div className="container mx-auto px-4 py-6">
        <Header />
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <EmailInput 
              onSubmit={handleEmailSubmit} 
              isAnalyzing={isAnalyzing}
              onReset={handleReset}
            />
            
            {(emailData || isAnalyzing || analysisResult) && (
              <AnalysisResults 
                emailData={emailData}
                result={analysisResult}
                isAnalyzing={isAnalyzing}
              />
            )}
          </div>
          
          <div className="lg:col-span-1">
            <ThreatStats analysisResult={analysisResult} />
          </div>
        </div>
      </div>
    </div>
  );
};
