import React from "react";

export const DevFormConsole = ({ form }: { form: any }) => {
  const [isOpenDev, setIsOpenDev] = React.useState(false);

  const onClickDevHandler = () => {
    setIsOpenDev(!isOpenDev);
  };

  return (
    <div
      role="button"
      onClick={onClickDevHandler}
      className="fixed bg-amber-200 bottom-0 w-full cursor-pointer"
    >
      <b>
        <pre>🛰️🛰️🛰️HOUSTON🛰️🛰️🛰️</pre>
      </b>
      {isOpenDev && (
        <code>
          <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre>
        </code>
      )}
    </div>
  );
};
