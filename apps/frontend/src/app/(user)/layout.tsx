import Navbar from "@components/user/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-10">
      <Navbar />
      {children}
    </div>
  );
}
