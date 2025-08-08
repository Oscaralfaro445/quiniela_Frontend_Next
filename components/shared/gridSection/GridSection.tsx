import clsx from "clsx";

interface GridSectionProps {
  children: React.ReactNode;
  className?: string;
}

export const GridSection = ({ children, className }: GridSectionProps) => {
  return (
    <section
      className={clsx(
        "grid w-full px-4 sm:px-8 md:px-16 lg:px-24 xl:px-48 2xl:px-64 py-12 justify-items-center content-center",
        className
      )}
    >
      {children}
    </section>
  );
};
