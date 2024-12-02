import type {Metadata} from "next";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Documentation Page",
    description: "Cloudinator Application",
};

export default function DocumentPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <h1 className="text-4xl font-bold text-violet-600">We Will Be Back Soon!</h1>
            <p className="mt-4 text-lg text-gray-700">Our site is currently undergoing maintenance. Please check back later.</p>
            <Link href="/" passHref>
                <Button className="mt-6">Go to Home</Button>
            </Link>
        </div>
    );
}
