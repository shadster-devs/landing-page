"use client";

import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="mb-10">
        <div className="inline-block mb-4 px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
          Legal Information
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6">Privacy Policy</h1>
        <p className="text-[var(--muted)] text-lg">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <section className="mb-10 p-6 rounded-2xl bg-[var(--card)] border border-white/10">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-[var(--muted)]">
            This Privacy Policy describes how the Flow2Chat Mermaid Diagram Renderer Chrome extension 
            (referred to as &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) handles data.
          </p>
        </section>

        <section className="mb-10 p-6 rounded-2xl bg-[var(--card)] border border-white/10">
          <h2 className="text-2xl font-semibold mb-4">Data Collection</h2>
          <p className="text-[var(--muted)] mb-4">
            The Flow2Chat Mermaid Diagram Renderer extension does not collect, store, or transmit any user data. 
            All diagram rendering happens locally in your browser and no information is sent to external servers.
          </p>
          <p className="text-[var(--muted)]">
            The extension only processes Mermaid code found in ChatGPT conversations to render diagrams. 
            This processing is done entirely client-side (in your browser) without sending any data to our servers 
            or third parties.
          </p>
        </section>

        <section className="mb-10 p-6 rounded-2xl bg-[var(--card)] border border-white/10">
          <h2 className="text-2xl font-semibold mb-4">Use of Permissions</h2>
          <p className="text-[var(--muted)] mb-4">Our extension requires the following permissions:</p>
          <ul className="space-y-3 text-[var(--muted)]">
            <li className="flex gap-3">
              <div className="h-6 w-6 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0 mt-0.5">✓</div>
              <div><strong>activeTab:</strong> Used solely to detect and render Mermaid diagrams on ChatGPT pages.</div>
            </li>
            <li className="flex gap-3">
              <div className="h-6 w-6 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0 mt-0.5">✓</div>
              <div><strong>tabs:</strong> Used to determine if you are currently on ChatGPT and enable/disable the extension popup buttons accordingly.</div>
            </li>
            <li className="flex gap-3">
              <div className="h-6 w-6 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0 mt-0.5">✓</div>
              <div><strong>Host permissions:</strong> Limited to specific domains (chat.openai.com and chatgpt.com) to ensure the extension only runs where needed.</div>
            </li>
          </ul>
          <p className="text-[var(--muted)] mt-4">
            These permissions are the minimum required for the extension to function and are not used for any data collection purposes.
          </p>
        </section>

        <section className="mb-10 p-6 rounded-2xl bg-[var(--card)] border border-white/10">
          <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
          <p className="text-[var(--muted)]">
            Our extension does not integrate with any third-party services for data collection, analytics, 
            or tracking. The only external dependency is the Mermaid.js library, which is bundled with the 
            extension and runs entirely in your browser.
          </p>
        </section>

        <section className="mb-10 p-6 rounded-2xl bg-[var(--card)] border border-white/10">
          <h2 className="text-2xl font-semibold mb-4">Data Storage</h2>
          <p className="text-[var(--muted)]">
            The extension does not store any user data persistently, neither on your device nor on remote servers.
            Any rendering state is temporary and exists only during the browser session.
          </p>
        </section>

        <section className="mb-10 p-6 rounded-2xl bg-[var(--card)] border border-white/10">
          <h2 className="text-2xl font-semibold mb-4">Children&apos;s Privacy</h2>
          <p className="text-[var(--muted)]">
            Our extension is not directed at children under the age of 13, and we do not knowingly collect 
            any personal information from children.
          </p>
        </section>

        <section className="mb-10 p-6 rounded-2xl bg-[var(--card)] border border-white/10">
          <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
          <p className="text-[var(--muted)] mb-4">
            We may update our Privacy Policy from time to time. We will notify you of any changes by 
            posting the new Privacy Policy on this page.
          </p>
          <p className="text-[var(--muted)]">
            You are advised to review this Privacy Policy periodically for any changes. Changes to this 
            Privacy Policy are effective when they are posted on this page.
          </p>
        </section>

        <section className="mb-10 p-6 rounded-2xl bg-[var(--card)] border border-white/10">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-[var(--muted)] mb-4">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <div className="mt-6">
            <a href="mailto:support@flow2chat.com" className="px-5 py-3 rounded-xl bg-accent hover:bg-accent-600 text-white font-semibold">
              support@flow2chat.com
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}