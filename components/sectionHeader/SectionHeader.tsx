interface DetailsProps {
  title: string;
  description: string;
}

export function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center w-full h-20 px-4 shadow-sm rounded-md ">
      {children}
    </div>
  );
}

function Details({ title, description }: DetailsProps) {
  return (
    <div className="flex flex-col">
      <p className="font-bold text-base text-gray-600">{title}</p>
      <p className="font-normal text-xs text-gray-400">{description}</p>
    </div>
  );
}

function Buttons({ children }: { children: React.ReactNode }) {
  return <div className="flex flex- items-center">{children}</div>;
}

SectionHeader.Details = Details;
SectionHeader.Buttons = Buttons;
