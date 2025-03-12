import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Données personnelles"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}