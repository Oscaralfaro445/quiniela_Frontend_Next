interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const CardDescription = ({
  children,
  className,
}: CardDescriptionProps) => {
  return <div className={`${className}`}>{children}</div>;
};
