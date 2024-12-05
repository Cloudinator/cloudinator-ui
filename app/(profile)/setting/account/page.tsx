
import type {Metadata} from "next";
import Setting from "@/components/profiledashboard/setting/Setting";

export const metadata: Metadata = {
    title: "Account Profile",
    description: "Cloudinator Application",
};

export default function SettingPage() {
    return (
        <>
            <Setting />
        </>
    );
}
