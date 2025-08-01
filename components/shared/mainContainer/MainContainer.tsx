interface MainContainerProps {
  children: React.ReactNode;
}

export const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <div className="grid w-full justify-items-center content-center">
      {children}
    </div>
  );
};
