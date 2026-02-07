interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <p className="carbon-label-01">
            © {new Date().getFullYear()} Calculators for Life. Built for everyday use.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
