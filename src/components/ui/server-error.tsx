import Image from "next/image";

import ServerErrorImage from "../../../public/server_error.webp";

export const ServerError = ({ error }: { error?: string }) => {
  return (
    <div className="flex flex-col w-full items-center">
      <Image
        alt="Atlas logo"
        src={ServerErrorImage}
        width={300}
        height={300}
        className="cursor-pointer"
      />

      <p className="text-gray-600  w-max-[500px] text-center">
        Ha ocurrido un error inesperado. Intente de nuevo más tarde o contactese
        con soporte
        <pre>
          <code>{error}</code>
        </pre>
      </p>
    </div>
  );
};
