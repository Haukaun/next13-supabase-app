import createClient from "@/lib/supabaselib/supabase-server";
import Dropdown from "../LandingPage/Dropdown";
import SwitchTheme from "./SwitchTheme";

export default async function NavBar() {
  const supabase = createClient();

  const { data } = await supabase.auth.getSession();

  return (
    <div className="navbar justify-between flex-wrap flex">
      <div className="">
        <a href={"/"} className="cursor-pointer">
          <img src="/logo.svg" alt="brand-image" />
        </a>
      </div>
      <div className=" flex justify-end">
        {!data?.session?.user && (
          <div className="flex items-center justify-center">
            <a href={"/login"} className="btn">
              Sign in
            </a>
          </div>
        )}

        {data.session?.user && (
          <div className="flex items-center justify-center gap-3">
            <Dropdown userName={data.session.user.user_metadata.user_name} />
          </div>
        )}

        <SwitchTheme />
      </div>
    </div>
  );
}
