
import type {Metadata} from "next";
import Team from "@/components/profiledashboard/setting/Team";

export const metadata: Metadata = {
    title: "Team Setting Profile",
    description: "Cloudinator Application",
};

export default function TeamPage() {
    return (
        <>
            <Team />
        </>
    );
}
