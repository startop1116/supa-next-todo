import { getProfileById } from "@/actions/auth/user.action";
import { permanentRedirect } from "next/navigation";
import React from "react";
import TodoContainer from "./components/TodoContainer";

interface sharePageProps {
  params: { user_id: string };
  searchParams: {};
}

const SharePage = async (props: sharePageProps) => {
  const userId = props?.params?.user_id;
  const profile = await getProfileById({ serverComponent: true, userId });
  const userName = profile?.full_name;

  if (!profile) permanentRedirect("/");

  return (
    <div>
      <TodoContainer sharedUserFullName={userName ?? ""} owenUserId={userId} />
    </div>
  );
};

export default SharePage;
