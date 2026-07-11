interface HeaderPageProps {
  title: string;
  text: string;
}

export const PageHeader = ({ title, text }: HeaderPageProps) => {
  return (
    <section className="grid gap-4">
      <h1 className="text-center text-5xl lg:text-7xl font-extrabold text-blue-600">
        {title}
      </h1>
      <p className="text-center">{text}</p>
    </section>
  );
};
