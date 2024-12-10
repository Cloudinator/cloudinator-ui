import type {Metadata} from "next";
import ServicesPage from "@/components/servicepage/Service";

export const metadata: Metadata = {
    title: "Service",
    description: "Service Page Cloudinator Application",
};

export default function Services() {
    return (
        <>
            <ServicesPage />
        </>
    );
}
