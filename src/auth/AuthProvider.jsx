import React, { useCallback, useEffect, useMemo, useState } from "react";
import { backendConfigured, getSupabase } from "../lib/backend";
import { AuthContext } from "./AuthContext";

// status: unconfigured | loading | signed-out | checking | not-owner | owner
// Whether you are the owner is decided by the database function is_owner(), so no
// email address is ever shipped to the browser.
export function AuthProvider({ children }) {
  const [state, setState] = useState({ status: backendConfigured ? "loading" : "unconfigured", session: null });

  useEffect(() => {
    if (!backendConfigured) return undefined;
    let alive = true;
    let subscription;

    const apply = async (supabase, session) => {
      if (!alive) return;
      if (!session) return setState({ status: "signed-out", session: null });
      setState({ status: "checking", session });
      const { data, error } = await supabase.rpc("is_owner");
      if (!alive) return;
      setState({ status: !error && data === true ? "owner" : "not-owner", session });
    };

    getSupabase().then((supabase) => {
      if (!alive || !supabase) return;
      supabase.auth.getSession().then(({ data }) => apply(supabase, data.session));
      const { data } = supabase.auth.onAuthStateChange((event, session) => {
        // Defer: calling Supabase from inside this callback can deadlock the client.
        setTimeout(() => apply(supabase, session), 0);
      });
      subscription = data.subscription;
    });

    return () => {
      alive = false;
      subscription?.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async () => {
    const supabase = await getSupabase();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/admin` },
    });
  }, []);

  const signOut = useCallback(async () => {
    const supabase = await getSupabase();
    await supabase.auth.signOut();
  }, []);

  const value = useMemo(
    () => ({ ...state, email: state.session?.user?.email ?? "", signIn, signOut }),
    [state, signIn, signOut]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
