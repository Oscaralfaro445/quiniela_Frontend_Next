import clsx from "clsx";

interface SectionGridProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionGrid = ({ children, className }: SectionGridProps) => {
  return (
    <section
      className={clsx(
        `grid w-full gap-4 py-4 px-4 sm:px-8 md:px-16`,
        className
      )}
    >
      {children}
    </section>
  );
};
