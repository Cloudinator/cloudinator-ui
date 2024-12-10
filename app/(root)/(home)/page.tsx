import HomePage from "@/components/homepage/Home";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Home",
    description: "Home Page Cloudinator Application",
};

export default function Homes() {
  return (
      <>
          <HomePage />
      </>
  );
}
