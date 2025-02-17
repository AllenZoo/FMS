import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { GiBarn, GiFarmer, GiPerson, GiBroccoli } from "react-icons/gi";

import { ROUTES, getPathFromRoute } from "@/configs/routes";

import DashboardPageLayout from "@/layouts/DashboardPageLayout";

// Farmer Actions Panels
import TendFieldsPanel from "./FarmActionsPage/TendFieldsPage/TendFieldsPanel";
import NurtureAnimalsPanel from "./FarmActionsPage/NurtureAnimalsPage/NurtureAnimalsPanel";
import SellProductsPanel from "./FarmActionsPage/SellProductsPage/SellProductsPanel";
import ManageFacilitiesPanel from "./FarmActionsPage/ManageFacilitiesPanel";

// User Info Panels
import ViewProfilePanel from "./UserInfoPage/ViewProfilePanel";
import ViewInventoryPanel from "./UserInfoPage/ViewInventoryPanel";

// Company Fun Facts Panels
import ViewCompanyInfoPanel from "./CompanyFunFactsPage/ViewCompanyInfoPanel";

// Housing Panels
import ViewHousingPanel from "./HousingPage/ViewHousingPanel";
import ManageHousingPanel from "./HousingPage/ManageHousingPanel";

import styles from "./index.module.scss";

/* -------------------------------------------------------------------------- */
/*                                  SUBPAGES                                  */
/* -------------------------------------------------------------------------- */
// Uses the hash.
interface ISubpage {
  text: string;
  component: React.ReactNode;
  disabled?: boolean;
}

// Uses the pathname.
interface ISubroute {
  title: string;
  icon: React.ReactNode;
  subpages: Record<string, ISubpage>;
}

const Subpages: Record<string, ISubroute> = {
  "farmer-actions": {
    title: "Farmer Actions",
    icon: <GiFarmer size="2rem" />,
    subpages: {
      "#tend-fields": {
        text: "Tend Fields",
        component: <TendFieldsPanel />,
        disabled: true,
      },
      "#nurture-animals": {
        text: "Nurture Animals",
        component: <NurtureAnimalsPanel />,
      },
      "#sell-products": {
        text: "Sell Products",
        component: <SellProductsPanel />,
        disabled: true,
      },
      "#manage-facilities": {
        text: "Manage Facilities",
        component: <ManageFacilitiesPanel />,
        disabled: true,
      },
    },
  },

  "user-info": {
    title: "User Info",
    icon: <GiPerson />,
    subpages: {
      "#profile": {
        text: "View Profile",
        component: <ViewProfilePanel />,
        disabled: true,
      },
      "#inventory": {
        text: "View Inventory",
        component: <ViewInventoryPanel />,
        disabled: true,
      },
    },
  },

  "company-fun-facts": {
    title: "Company Fun Facts",
    icon: <GiBroccoli />,
    subpages: {
      "#company-info": {
        text: "View Company Info",
        component: <ViewCompanyInfoPanel />,
      },
    },
  },

  housing: {
    title: "Housing",
    icon: <GiBarn />,
    subpages: {
      "#housing": {
        text: "View Housing",
        component: <ViewHousingPanel />,
        disabled: true,
      },
      "#manage-housing": {
        text: "Manage Housing",
        component: <ManageHousingPanel />,
        disabled: true,
      },
    },
  },
};

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
/**
 * Renders default panel.
 * @returns The default panel.
 */
const DefaultPanel = (): React.ReactElement => {
  return (
    <main>
      {Object.entries(Subpages).map(([path, subroute], index) => (
        <section className={styles.Section} key={index}>
          <h1>
            {subroute.icon} {subroute.title}
          </h1>
          {Object.entries(subroute.subpages).map(([hash, button], index) => (
            <Link
              to={`${getPathFromRoute(ROUTES.DASHBOARD)}/${path}${hash}`}
              key={index}
            >
              <button className={styles.Button} disabled={button.disabled}>
                {button.text}
              </button>
            </Link>
          ))}
        </section>
      ))}
    </main>
  );
};

/**
 * Renders the main dashboard page.
 * @returns The main dashboard page.
 */
const DashboardPageOld = (): React.ReactElement => {
  const [panel, setPanel] = useState<React.ReactNode>(null);
  const location = useLocation();

  useEffect(() => {
    const { pathname, hash } = location;
    const path = pathname.split("/").pop();

    path && hash
      ? setPanel(Subpages[path].subpages[hash].component)
      : setPanel(<DefaultPanel />);
  }, [location]);

  return <DashboardPageLayout>{panel}</DashboardPageLayout>;
};

export default DashboardPageOld;
