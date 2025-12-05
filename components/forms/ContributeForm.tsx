"use client";

import { useState } from "react";

export default function ContributeForm() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;

    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const link = (form.elements.namedItem("link") as HTMLInputElement).value;
    const description = (form.elements.namedItem(
      "description"
    ) as HTMLTextAreaElement).value;

    const body = { name, email, link, description };

    const res = await fetch("/api/contribute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setLoading(false);

    if (res.ok) {
      setDone(true);
      form.reset();
    }
  }

  return (
    <section className="py-20 px-6 sm:px-10">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Contribute New Resources
        </h2>

        <p className="text-text-secondary text-center mb-10">
          Know an authoritative fraud-fighting organization or resource?
          Submit it below and help expand our global directory.
        </p>

        {done && (
          <p className="text-green-400 text-center mb-4">
            Submission sent successfully!
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 bg-bg-card-dark p-6 rounded-xl border border-white/10"
        >
          <div>
            <label className="block mb-1 text-sm">Your Name</label>
            <input
              name="name"
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg 
              bg-bg-card-dark 
              border border-white/40 
              focus:border-brand-rose 
              outline-none transition"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Email Address</label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 rounded-lg 
              bg-bg-card-dark 
              border border-white/40 
              focus:border-brand-rose 
              outline-none transition"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Link to Resource</label>
            <input
              name="link"
              type="url"
              required
              className="w-full px-4 py-3 rounded-lg 
              bg-bg-card-dark 
              border border-white/40 
              focus:border-brand-rose 
              outline-none transition"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Brief Description</label>
            <textarea
              name="description"
              required
              rows={3}
              className="w-full px-4 py-3 rounded-lg 
              bg-bg-card-dark 
              border border-white/40 
              focus:border-brand-rose 
              outline-none transition"
            />
          </div>

          {/* Rose theme button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg 
            bg-brand-rose 
            text-white font-semibold 
            hover:bg-brand-rose/80 
            transition"
          >
            {loading ? "Submitting..." : "Submit for Review"}
          </button>
        </form>
      </div>
    </section>
  );
}
