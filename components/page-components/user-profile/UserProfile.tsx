import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "./ProfileForm";

const UserProfile = () => {
  return (
    <div className="space-y-6 p-10 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">User Profile</h2>
        <p className="text-muted-foreground">
          Manage your profile settings and check how others will see you on
          site.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <div className="flex-1 lg:max-w-2xl">
          <div className="space-y-6">
            <ProfileForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
