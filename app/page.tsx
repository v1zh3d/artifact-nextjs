import Navbar from "@/components/Navbar";
import UserProfile from "@/components/page-components/user-profile/UserProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Profile | Artifact",
  description: "Where you see your stats for improving more in reality!",
};

export default function UserProfilePage() {
  return (
    <main>
      <header className="px-16 pt-10">
        <Navbar />
      </header>
      <section className="flex min-h-screen flex-col items-center justify-between p-10 font-roboto">
        <UserProfile />
      </section>
    </main>
  );
}
