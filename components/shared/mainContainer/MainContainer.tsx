interface MainContainerProps {
  children: React.ReactNode;
}

export const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <div className="grid h-full w-full justify-items-center content-center">
      {children}
    </div>
  );
};
