import '@/styles/globals-dashboard.css'

export default function Authlayout(
    {
        children,
    }: {
        children: React.ReactNode;
    }
) {
  return (
    <html lang="id">
      <body className="dashboard">{children}</body>
    </html>
  );
}
