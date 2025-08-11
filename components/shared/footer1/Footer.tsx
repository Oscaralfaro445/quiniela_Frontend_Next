export const Footer = () => {
  return (
    <footer className="flex items-center justify-center w-full py-4 px-4 md:px-8 bg-gray-900 rounded-md shadow-md text-white">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-center">
          <span className="text-lg font-semibold">NFL Quiniela</span>
        </div>

        <p className="text-neutral-400">
          © 2025 NFL Quiniela. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};
