import React from 'react';

const DashboardLayout = ({ sidebar, children, title }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="pt-24">
        <div className="content-container grid grid-cols-1 lg:grid-cols-6 gap-8">
          <aside className="lg:col-span-1">{sidebar}</aside>
          <main className="lg:col-span-5">
            <div className="bg-white p-6 rounded-lg shadow">
              {title && <h1 className="text-2xl font-bold mb-4">{title}</h1>}
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
