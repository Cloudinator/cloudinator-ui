import Setting from "@/components/profiledashboard/setting/Setting";
import UserDataWrapper from "@/components/profiledashboard/UserDataWrapper";

export function generateStaticParams() {
  return [];
}

export default function ProfilePage() {
  return (
    <>
        <UserDataWrapper>
          <Setting />
        </UserDataWrapper>
    </>
  );
}