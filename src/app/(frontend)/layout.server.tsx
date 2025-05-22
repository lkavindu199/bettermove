import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Movein - Movers & Packers',
};

export default function ServerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
