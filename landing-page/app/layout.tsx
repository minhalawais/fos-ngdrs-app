
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";

const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-jakarta",
    display: "swap",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export const metadata: Metadata = {
    title: "NGDRS - National Gender Data Reporting System",
    description: "Pakistan's unified digital platform for GBV reporting and compliance. Mandated by NCSW.",
    icons: {
        icon: "/ncsw.png",
        shortcut: "/ncsw.png",
        apple: "/ncsw.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={clsx(
                jakarta.variable,
                inter.variable,
                "font-body antialiased bg-brand-canvas text-brand-dark overflow-x-hidden"
            )}>
                {children}
            </body>
        </html>
    );
}
