interface CardProps {
  children: React.ReactNode;
}

export const Card = ({ children }: CardProps) => {
  return (
    <div className="grid w-full p-4 items-center border border-neutral-400 rounded-lg bg-white">
      {children}
    </div>
  );
};
