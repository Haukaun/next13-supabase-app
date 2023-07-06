"use client";

import supabaseclient from "@/lib/supabaselib/supabase-browser";
import { Session } from "@supabase/auth-helpers-nextjs";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const [supabase] = useState(() => supabaseclient);

  const router = useRouter();

  const [session, setSession] = useState<Session | null>(null);

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) =>
      setSession(session)
    );
    return () => subscription.unsubscribe();
  }, []);
  if (!session) {
    return (
      <div className="m-auto px-8 sm:max-w-md gap-2">
        <a className="underline hover:font-medium" href="/">
          {"Go to main page"}
        </a>
        <div className="">
          <Auth
            supabaseClient={supabase}
            view="magic_link"
            appearance={{ theme: ThemeSupa }}
            showLinks={false}
            providers={["github"]}
            redirectTo="http://localhost:3000/auth/callback"
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center">
        <h1>{session.user.user_metadata.full_name}</h1>
        <button onClick={signOut}>Sign out</button>
      </div>
    );
  }
}
