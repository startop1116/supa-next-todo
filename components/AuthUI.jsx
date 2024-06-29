"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createSupabaseBrowserClient } from "@/lib/client/supabase";
import useHydrate from "@/hooks/useHydrate";

const AuthUI = () => {
  const [user, setUser] = useState();
  const supabase = createSupabaseBrowserClient();
  const isMount = useHydrate();

  const getUserInfo = useCallback(async () => {
    const result = await supabase.auth.getUser();
    if (result?.data?.user) setUser(result?.data?.user);
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const handleGoogleLogin = async () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO,
      },
    });
  };

  const handleGithubLogin = async () => {
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO,
      },
    });
  };

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  if (!isMount) return null;

  return (
    <section className="mx-auto w-full p-10">
      <div className="mx-auto max-w-[500px] flex justify-center my-4">
        {user ? `${user?.email} 님, 환영합니다 :)` : "로그인 후 사용하세요."}
      </div>
      <>
        {user && (
          <button onClick={handleLogout} className=" border-2 border-black">
            로그아웃
          </button>
        )}
      </>
      <div className="mx-auto max-w-[500px] flex flex-col gap-1 ">
        <button
          onClick={handleGoogleLogin}
          className="border border-gray p-2 rounded"
        >
          Sign in with Google
        </button>
        <button
          onClick={handleGithubLogin}
          className="border border-gray p-2 rounded "
        >
          Sign in with github
        </button>
        <Auth
          redirectTo={process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO}
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          onlyThirdPartyProviders
          providers={["google", "github"]}
        />
      </div>
    </section>
  );
};

export default AuthUI;
