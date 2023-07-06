"use client";

import supabaseclient from "@/lib/supabaselib/supabase-browser";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useState } from "react";

export default function Login() {
  const [supabase] = useState(() => supabaseclient);

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
}
