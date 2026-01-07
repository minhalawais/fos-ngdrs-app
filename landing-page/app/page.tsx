
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Workflow from "@/components/sections/Workflow";
import DashboardPreview from "@/components/sections/DashboardPreview";
import Compliance from "@/components/sections/Compliance";

export default function Home() {
    return (
        <main className="flex flex-col min-h-screen">
            <Navbar />
            <Hero />
            <Features />
            <Workflow />
            <DashboardPreview />
            <Compliance />
            <Footer />
        </main>
    );
}
