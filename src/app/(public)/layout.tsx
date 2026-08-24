import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { NoticeBar } from "@/components/public/NoticeBar";
import { WhatsAppFloatingButton } from "@/components/public/WhatsAppFloatingButton";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8FAFC]">
      <NoticeBar />
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
