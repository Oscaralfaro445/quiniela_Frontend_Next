export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-10">
      <main>{children}</main>
    </div>
  );
}
