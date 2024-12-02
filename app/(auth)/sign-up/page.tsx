import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Login Page",
    description: "Cloudinator Application",
};

export default function SignUpPage() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1>This is Sign Up Page</h1>
        </div>
    );
}
