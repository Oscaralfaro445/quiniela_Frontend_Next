import { TextBody } from "../../shared/text/TextBody";
import { Title } from "../../shared/text/Title";

interface HeaderPageProps {
  title: string;
  text: string;
}

export const HeaderPage = ({ title, text }: HeaderPageProps) => {
  return (
    <section className="grid lg:flex w-full max-w-[1280px] mx-auto px-10 py-8 gap-4 justify-center lg:justify-between">
      <div className="grid gap-2 justify-items-start items-center">
        <Title className="text-center" title={title} />
        <TextBody className="text-center" text={text} />
      </div>

      <div className="flex h-fit justify-center items-center border-2 border-blue-600 rounded-2xl">
        <p className="px-2 py-1 text-sm font-semibold text-blue-700">
          NFL temporada 2025
        </p>
      </div>
    </section>
  );
};
