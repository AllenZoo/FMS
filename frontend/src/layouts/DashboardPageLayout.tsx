import NavBar from "@/components/NavBar";

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
/**
 * Layout for the dashboard page.
 * @returns The dashboard page layout.
 */
const DashboardPageLayout = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  return (
    <div
      data-testid="main-page"
      style={{
        color: "#fff",
        textAlign: "center",
      }}
    >
      <NavBar />
      
      {children}
  </div>
  );
}

export default DashboardPageLayout;
