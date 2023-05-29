import Header from "../Header";

const MainLayout = () => {
  return (
    <>
      <div className="min-h-screen font-inter flex flex-col">
        <header className="bg-red-50">
          <Header />
        </header>

        <div className="flex-1 flex flex-col sm:flex-row">
          <main className="flex-1 bg-indigo-100"></main>

          <nav className="order-first sm:w-32 bg-purple-200">Sidebar</nav>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
