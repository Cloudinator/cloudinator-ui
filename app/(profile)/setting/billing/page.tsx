
import type {Metadata} from "next";
import Billing from "@/components/profiledashboard/setting/Billing";

export const metadata: Metadata = {
    title: "Billing Profile",
    description: "Cloudinator Application",
};

export default function BillingPage() {
    return (
        <>
            <Billing />
        </>
    );
}
