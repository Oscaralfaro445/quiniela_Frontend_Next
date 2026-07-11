interface MainContainerProps {
  children: React.ReactNode;
}

export const MainContainer = ({ children }: MainContainerProps) => {
  return <div className="grid py-4 mx-4 lg:mx-24">{children}</div>;
};
