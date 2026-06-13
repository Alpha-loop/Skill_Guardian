import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SubscriptionGate() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md text-center">

        <h2 className="text-2xl font-bold mb-4">
          Subscription Required
        </h2>

        <p className="text-slate-600 mb-6">
          Your organisation does not
          currently have an active
          subscription.
        </p>

        <Link href="/pricing">
          <Button>
            View Plans
          </Button>
        </Link>

      </div>
    </div>
  );
}