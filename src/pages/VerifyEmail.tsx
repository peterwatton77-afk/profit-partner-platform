import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight, RefreshCw } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import { Link } from "react-router-dom";

const VerifyEmail = () => {
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  const handleResend = () => {
    setResending(true);
    setTimeout(() => { setResending(false); setResent(true); }, 1500);
  };

  return (
    <AuthLayout>
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Mail size={32} className="text-primary" />
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2">Check your email</h1>
        <p className="text-muted-foreground text-sm mb-8 max-w-sm mx-auto">
          We've sent a verification link to your email address. Click the link to verify your account and get started.
        </p>

        <div className="glass-card p-6 mb-6 text-left">
          <h3 className="font-display text-sm font-semibold mb-3">Didn't receive the email?</h3>
          <ul className="text-xs text-muted-foreground space-y-2">
            <li>• Check your spam or junk folder</li>
            <li>• Make sure you entered the correct email</li>
            <li>• Wait a few minutes and try again</li>
          </ul>
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleResend}
            disabled={resending}
            className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2"
          >
            {resending ? <><RefreshCw size={16} className="animate-spin" /> Sending...</> : resent ? "Email Resent ✓" : <><RefreshCw size={16} /> Resend Verification Email</>}
          </Button>
          <Button variant="ghost" className="w-full h-11 text-muted-foreground" asChild>
            <Link to="/login">Back to Sign In</Link>
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyEmail;
