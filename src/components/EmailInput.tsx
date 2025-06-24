
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  FileText, 
  Mail, 
  Zap, 
  RotateClockwise,
  AlertTriangle 
} from "@hugeicons/react";
import { EmailData } from "./PhishDefender";
import { useToast } from "@/hooks/use-toast";

interface EmailInputProps {
  onSubmit: (data: EmailData) => void;
  isAnalyzing: boolean;
  onReset: () => void;
}

export const EmailInput = ({ onSubmit, isAnalyzing, onReset }: EmailInputProps) => {
  const [emailText, setEmailText] = useState("");
  const [subject, setSubject] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const { toast } = useToast();

  const parseEmailText = (text: string): EmailData => {
    // Simple email parsing - in production, use a proper email parser
    const lines = text.split('\n');
    let parsedSubject = subject;
    let parsedFrom = from;
    let parsedTo = to;
    let body = text;
    let headers = "";

    // Extract headers if email format is detected
    if (text.includes('From:') || text.includes('Subject:')) {
      const headerEndIndex = text.indexOf('\n\n');
      if (headerEndIndex > -1) {
        headers = text.substring(0, headerEndIndex);
        body = text.substring(headerEndIndex + 2);
        
        // Parse headers
        const subjectMatch = headers.match(/Subject:\s*(.+)/i);
        const fromMatch = headers.match(/From:\s*(.+)/i);
        const toMatch = headers.match(/To:\s*(.+)/i);
        
        if (subjectMatch) parsedSubject = subjectMatch[1].trim();
        if (fromMatch) parsedFrom = fromMatch[1].trim();
        if (toMatch) parsedTo = toMatch[1].trim();
      }
    }

    // Extract URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = [...body.matchAll(urlRegex)].map(match => match[1]);

    return {
      subject: parsedSubject,
      from: parsedFrom,
      to: parsedTo,
      body: body,
      headers: headers,
      urls: urls
    };
  };

  const handleSubmit = () => {
    if (!emailText.trim() && !subject.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide email content to analyze.",
        variant: "destructive",
      });
      return;
    }

    const emailData = parseEmailText(emailText);
    onSubmit(emailData);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setEmailText(content);
      };
      reader.readAsText(file);
    }
  };

  const loadSamplePhishingEmail = () => {
    const sample = `From: security@secure-bank-update.com
To: customer@email.com
Subject: URGENT: Your Account Will Be Suspended - Immediate Action Required

Dear Valued Customer,

We have detected suspicious activity on your account. Your account will be suspended within 24 hours unless you verify your information immediately.

Click here to verify your account now: http://secure-bank-update.com/verify

This is an urgent security alert. Please act now to avoid account suspension.

Time remaining: 23 hours 45 minutes

Best regards,
Security Team`;
    
    setEmailText(sample);
    setSubject("URGENT: Your Account Will Be Suspended - Immediate Action Required");
    setFrom("security@secure-bank-update.com");
    setTo("customer@email.com");
  };

  const handleReset = () => {
    setEmailText("");
    setSubject("");
    setFrom("");
    setTo("");
    onReset();
  };

  return (
    <Card className="bg-cyber-navy/50 border-cyber-cyan/20 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-cyber-cyan">
          <Mail className="w-5 h-5 mr-2" />
          Email Analysis Input
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="paste" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-cyber-blue/50">
            <TabsTrigger value="paste" className="data-[state=active]:bg-cyber-cyan/20">
              <FileText className="w-4 h-4 mr-2" />
              Paste Email
            </TabsTrigger>
            <TabsTrigger value="upload" className="data-[state=active]:bg-cyber-cyan/20">
              <Upload className="w-4 h-4 mr-2" />
              Upload File
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="paste" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="subject" className="text-gray-300">Subject</Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Email subject"
                  className="bg-cyber-blue/30 border-cyber-cyan/30 text-white"
                />
              </div>
              <div>
                <Label htmlFor="from" className="text-gray-300">From</Label>
                <Input
                  id="from"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="sender@example.com"
                  className="bg-cyber-blue/30 border-cyber-cyan/30 text-white"
                />
              </div>
              <div>
                <Label htmlFor="to" className="text-gray-300">To</Label>
                <Input
                  id="to"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="recipient@example.com"
                  className="bg-cyber-blue/30 border-cyber-cyan/30 text-white"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email-content" className="text-gray-300">Email Content</Label>
              <Textarea
                id="email-content"
                value={emailText}
                onChange={(e) => setEmailText(e.target.value)}
                placeholder="Paste your email content here..."
                className="min-h-[200px] bg-cyber-blue/30 border-cyber-cyan/30 text-white"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="upload" className="space-y-4">
            <div className="border-2 border-dashed border-cyber-cyan/30 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 mx-auto text-cyber-cyan mb-4" />
              <p className="text-gray-300 mb-4">
                Upload .eml, .msg, or .txt files
              </p>
              <Input
                type="file"
                accept=".eml,.msg,.txt"
                onChange={handleFileUpload}
                className="bg-cyber-blue/30 border-cyber-cyan/30"
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex flex-wrap gap-3 mt-6">
          <Button
            onClick={handleSubmit}
            disabled={isAnalyzing}
            className="bg-cyber-cyan hover:bg-cyber-cyan/80 text-cyber-blue font-semibold"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cyber-blue mr-2"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Analyze Email
              </>
            )}
          </Button>
          
          <Button
            onClick={loadSamplePhishingEmail}
            variant="outline"
            className="border-cyber-orange text-cyber-orange hover:bg-cyber-orange/10"
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Load Sample Phishing Email
          </Button>
          
          <Button
            onClick={handleReset}
            variant="outline"
            className="border-gray-500 text-gray-400 hover:bg-gray-700/20"
          >
            <RotateClockwise className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
