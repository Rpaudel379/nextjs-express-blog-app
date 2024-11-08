import Navbar from "@components/user/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-4 md:px-10">
      <Navbar />
      {children}
    </div>
  );
}
