import React from "react";

const MainLayout = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <header className="bg-red-50">Header</header>

        <div className="flex-1 flex flex-col sm:flex-row">
          <main className="flex-1 bg-indigo-100">Content here</main>

          <nav className="order-first sm:w-32 bg-purple-200">Sidebar</nav>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
