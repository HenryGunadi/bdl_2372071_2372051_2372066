import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex max-w-screen-xl mx-auto w-full">
        <Sidebar />
        <main className="flex-1 p-4 box-border overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
