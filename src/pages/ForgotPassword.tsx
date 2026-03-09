import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle, Mail } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { setError("Email is required"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Invalid email address"); return; }
    setError("");
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <AuthLayout>
      <div>
        {sent ? (
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={28} className="text-primary" />
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2">Check your email</h1>
            <p className="text-muted-foreground text-sm mb-8 max-w-sm mx-auto">
              We've sent a password reset link to <span className="text-foreground font-medium">{email}</span>. 
              It may take a minute to arrive.
            </p>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full h-11 border-border text-foreground hover:bg-secondary font-medium gap-2"
                onClick={() => setSent(false)}
              >
                <Mail size={16} />
                Resend Link
              </Button>
              <Link to="/login">
                <Button variant="ghost" className="w-full h-11 text-muted-foreground hover:text-foreground gap-2">
                  <ArrowLeft size={16} />
                  Back to Sign In
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft size={14} />
              Back to Sign In
            </Link>

            <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2">Forgot your password?</h1>
            <p className="text-muted-foreground text-sm mb-8">
              Enter your email and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-sm font-medium mb-1.5 block">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`h-11 bg-secondary/50 border-border ${error ? "border-destructive" : ""}`}
                />
                {error && <p className="text-destructive text-xs mt-1">{error}</p>}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          </>
        )}
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
