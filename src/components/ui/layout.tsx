import { ReactElement } from "react";
import { Outlet } from "react-router-dom";

function Layout(): ReactElement {
  return (
    <>
      <main className="p-6 flex flex-col gap-8 max-w-screen-lg mx-auto">
        <Outlet />
      </main>
    </>
  );
}

export { Layout };
