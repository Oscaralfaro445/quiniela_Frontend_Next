import clsx from "clsx";

interface SectionGridProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionGrid = ({ children, className }: SectionGridProps) => {
  return (
    <section
      className={clsx(
        `grid max-w-[1280px] py-20 lg:py-32 mx-auto gap-4`,
        className
      )}
    >
      {children}
    </section>
  );
};
