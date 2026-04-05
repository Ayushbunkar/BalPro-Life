import React from 'react';

const DashboardLayout = ({ sidebar, children, title }) => {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <div className="content-container grid grid-cols-1 lg:grid-cols-6 gap-8">
        <aside className="lg:col-span-1">{sidebar}</aside>
        <main className="lg:col-span-5">
          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 shadow-[0_24px_80px_-40px_rgba(239,191,112,0.35)]">
            {title && <h1 className="text-2xl font-bold mb-4 font-headline text-on-surface">{title}</h1>}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
