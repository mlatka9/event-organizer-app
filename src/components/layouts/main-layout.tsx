import Header from "@components/common/header";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <Header />
      <main className="mx-auto mt-10 max-w-[1000px]">{children}</main>
    </div>
  );
};

export default MainLayout;
