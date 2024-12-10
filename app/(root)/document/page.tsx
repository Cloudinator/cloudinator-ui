import type {Metadata} from "next";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Documentation Page",
    description: "Documentation Page Cloudinator Application",
};

export default function DocumentPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <h1 className="text-4xl font-bold text-violet-600">Look up for our document</h1>
            <p className="mt-4 text-lg text-gray-700">Check out this link below. Do not worry it is secure</p>
            <Link href="https://cloudinator-doc-vercel.vercel.app/" passHref>
                <Button className="mt-6 bg-purple-500 hover:bg-purple-700">Go to Document</Button>
            </Link>
        </div>
    );
}
