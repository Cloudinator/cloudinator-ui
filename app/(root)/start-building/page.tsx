import type {Metadata} from "next";
import StartBuildingPage from "@/components/startbuilding/StartBuilding";

export const metadata: Metadata = {
    title: "Start-Building",
    description: "Start-Building Page Cloudinator Application",
};

export default function Services() {
    return (
        <>
            <StartBuildingPage />
        </>
    );
}
