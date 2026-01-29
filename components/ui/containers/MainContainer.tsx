interface MainContainerProps {
  children: React.ReactNode;
}

export const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <div className="space-y-6 mx-8 mt-16 pt-8 mb-8 min-h-screen">
      {children}
    </div>
  );
};
