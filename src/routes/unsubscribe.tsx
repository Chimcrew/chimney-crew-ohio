import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/unsubscribe")({
  head: () => ({
    meta: [
      { title: "Unsubscribe — ChimCrew" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: UnsubscribePage,
});

type State =
  | { kind: "loading" }
  | { kind: "valid" }
  | { kind: "already" }
  | { kind: "invalid" }
  | { kind: "success" }
  | { kind: "error"; message: string };

function UnsubscribePage() {
  const [state, setState] = useState<State>({ kind: "loading" });
  const [submitting, setSubmitting] = useState(false);
  const token =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("token")
      : null;

  useEffect(() => {
    if (!token) {
      setState({ kind: "invalid" });
      return;
    }
    fetch(`/email/unsubscribe?token=${encodeURIComponent(token)}`)
      .then(async (r) => {
        const body = await r.json().catch(() => ({}));
        if (r.ok && body.valid) setState({ kind: "valid" });
        else if (body.reason === "already_unsubscribed") setState({ kind: "already" });
        else setState({ kind: "invalid" });
      })
      .catch(() => setState({ kind: "error", message: "Network error" }));
  }, [token]);

  const confirm = async () => {
    if (!token) return;
    setSubmitting(true);
    try {
      const r = await fetch("/email/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const body = await r.json().catch(() => ({}));
      if (r.ok && body.success) setState({ kind: "success" });
      else if (body.reason === "already_unsubscribed") setState({ kind: "already" });
      else setState({ kind: "error", message: body.error || "Something went wrong" });
    } catch {
      setState({ kind: "error", message: "Network error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16 text-foreground">
      <h1 className="font-display text-2xl font-extrabold uppercase tracking-tight">
        Unsubscribe from ChimCrew
      </h1>
      <div className="mt-6 border border-border bg-background p-6">
        {state.kind === "loading" && <p>Checking your link…</p>}
        {state.kind === "valid" && (
          <>
            <p className="text-sm text-foreground/80">
              Click below to stop receiving emails from ChimCrew at this address.
            </p>
            <button
              type="button"
              onClick={confirm}
              disabled={submitting}
              className="mt-4 inline-flex h-11 w-full items-center justify-center bg-flame font-display text-sm font-bold uppercase tracking-wider text-primary disabled:opacity-50"
            >
              {submitting ? "Unsubscribing…" : "Confirm Unsubscribe"}
            </button>
          </>
        )}
        {state.kind === "success" && (
          <p className="text-sm">You've been unsubscribed. We won't email you again.</p>
        )}
        {state.kind === "already" && (
          <p className="text-sm">This address is already unsubscribed.</p>
        )}
        {state.kind === "invalid" && (
          <p className="text-sm">This unsubscribe link is invalid or expired.</p>
        )}
        {state.kind === "error" && (
          <p className="text-sm text-destructive">{state.message}</p>
        )}
      </div>
      <p className="mt-4 text-xs text-foreground/50">
        Need help? Call (614) 683-5763.
      </p>
    </div>
  );
}