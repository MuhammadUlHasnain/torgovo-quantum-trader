import React from "react";
import Layout from "@/components/layout/Layout";

const Terms = () => (
  <Layout>
    <div className="container py-16 max-w-3xl">
      <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
      <p className="text-muted-foreground mb-10">Last updated: May 2026</p>

      <section className="space-y-4 mb-10">
        <h2 className="text-2xl font-bold">Account Policy</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">One account per person.</strong> Each account
            must be verified by a unique email address and phone number. Duplicate accounts
            will be terminated.
          </li>
          <li>
            <strong className="text-foreground">Bot limits apply per account, not per subscription.</strong>{" "}
            Sharing account access with other users violates these Terms and will result in
            immediate account termination without refund.
          </li>
          <li>
            <strong className="text-foreground">Personal API keys only.</strong> Each bot must
            be connected to exchange API keys that belong to the account holder. Connecting
            third-party exchange accounts is a violation of these Terms.
          </li>
        </ul>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-2xl font-bold">Anti-Abuse Enforcement</h2>
        <p className="text-muted-foreground">
          Torgovo reserves the right to suspend accounts showing suspicious usage patterns,
          including but not limited to:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Logins from multiple unrelated geographic locations</li>
          <li>API keys belonging to multiple different exchange account holders</li>
          <li>Bot activity inconsistent with a single trader</li>
          <li>Coordinated activity across multiple accounts</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Risk Disclosure</h2>
        <p className="text-muted-foreground">
          Cryptocurrency trading involves substantial risk. Past performance is not indicative
          of future results. Never invest more than you can afford to lose.
        </p>
      </section>
    </div>
  </Layout>
);

export default Terms;
