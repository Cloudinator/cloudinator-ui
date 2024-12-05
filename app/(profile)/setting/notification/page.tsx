
import type {Metadata} from "next";
import Notifications from "@/components/profiledashboard/setting/Notifications";

export const metadata: Metadata = {
    title: "Notifications Setting Profile",
    description: "Cloudinator Application",
};

export default function NotificationPage() {
    return (
        <>
            <Notifications />
        </>
    );
}
