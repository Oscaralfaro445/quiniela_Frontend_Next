interface MainContainerProps {
  children: React.ReactNode;
}

export const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <div className="grid h-full w-full py-6 justify-items-center content-center">
      {children}
    </div>
  );
};
