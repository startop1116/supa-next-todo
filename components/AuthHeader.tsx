"use client";
import { createSupabaseBrowserClient } from "@/lib/client/supabase";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import React from "react";
import { FcTodoList } from "react-icons/fc";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLogout } from "react-icons/ai";

interface AuthHeaderProbs {
  user?: User | null;
}

const AuthHeader = ({ user }: AuthHeaderProbs) => {
  const isLoggedIn = !!user?.email;
  const supaabase = createSupabaseBrowserClient();
  const router = useRouter();

  const goToHome = () => {
    router.push("/");
  };

  const handleGoogleLogin = async () => {
    await supaabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO,
      },
    });
  };

  const handleLogout = async () => {
    await supaabase.auth.signOut();
    window.location.reload();
  };

  return (
    <header className="h-[50px] bg-white">
      <section className="px-6 h-full">
        <div className=" h-full flex flex-row justify-between items-center">
          <div
            onClick={goToHome}
            className="flex flex-row items-center cursor-pointer gap-2"
          >
            TODO
            <FcTodoList size={30} />
          </div>
          {isLoggedIn ? (
            <div
              onClick={handleLogout}
              className="flex flex-row items-center gap-4 cursor-pointer"
            >
              Logout
              <AiOutlineLogout size={30} />
            </div>
          ) : (
            <div
              onClick={handleGoogleLogin}
              className="flex flex-row items-center gap-4 cursor-pointer"
            >
              Login
              <FcGoogle size={30} />
            </div>
          )}
        </div>
      </section>
    </header>
  );
};

export default AuthHeader;
