import React from "react";
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-[calc(100vh-var(--nav-h))] bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
      {children}
    </section>
  );
}

export default Layout;
