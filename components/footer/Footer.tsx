"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { Mail, MapPin, Phone } from "lucide-react";

const navigation = {
  links: [
    { name: "Home", href: "/" },
    { name: "Service", href: "/service" },
    { name: "Document", href: "https://cloudinator-doc.cloudinator.cloud/" },
    { name: "Start Building", href: "/start-building" },
    { name: "About Us", href: "/about" },
  ],
};

const contact = {
  phone: "+855978443615",
  email: "cloudinator@gmail.com",
  address:
    "No. 24, Street 562 ,Sangkat Boeung Kok, Toul Kork, Phnom Penh City.",
  mapUrl: "https://maps.app.goo.gl/HRN4hrCyrAqTdZzP6",
};

const partners = [
  {
    name: "CBRD",
    src: "/cbrd.png",
    height: 150,
    width: 150,
  },
  {
    name: "MPTC",
    src: "/mptc.png",
    height: 150,
    width: 150,
  },
  {
    name: "ISTAD",
    src: "/istad-logo.png",
    height: 140,
    width: 140,
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t py-10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div>
            <Image
              src="/cloudinator-v2.1.png"
              alt="Cloudinator Logo"
              width={150}
              height={150}
              className="mb-4 ml-6 h-100 w-100"
            />
            <p className="text-purple-500 font-semibold text-sm w-[200px] text-center">
              Empowering your cloud journey with simplicity and innovation
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-purple-500 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navigation.links.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-purple-500 mb-4">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-purple-500" />
                <a
                  href={`tel:${contact.phone}`}
                  className="text-gray-600 dark:text-gray-400 text-sm hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
                >
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-purple-500" />
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}&su=Inquiry%20from%20Website&body=Hello%20Cloudinator%20Team,%0D%0A%0D%0AI%20am%20reaching%20out%20regarding...`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 text-sm hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
                >
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-8 w-8 text-purple-500" />
                <a
                  href={contact.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 text-sm hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
                >
                  {contact.address}
                </a>
              </li>
            </ul>
          </div>

          {/* Partners */}
          <div className="space-y-4 md:mx-auto md:w-full lg:mx-0">
            <h3 className="text-lg font-semibold text-purple-500 mb-4 text-center">
              Sponsor
            </h3>
            <div className="grid gap-4 sm:gap-6 justify-center">
              {partners.map((partner) => (
                <Image
                  key={partner.name}
                  src={partner.src}
                  alt={partner.name}
                  width={partner.width}
                  height={partner.height}
                  className="rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Footer Bottom */}
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()}{" "}
            <Link
              href="https://www.cstad.edu.kh/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
            >
              Cloudinator by ISTAD
            </Link>
            . All rights reserved.™
          </p>
        </div>
      </Container>
    </footer>
  );
}
