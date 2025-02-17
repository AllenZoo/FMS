import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLivestock } from "@/app/livestock/livestock.slice.ts";
import { useGetAllLivestockQuery } from "@/app/livestock/livestock.api.slice.ts";
import styles from "./NurtureAnimalsPanel.module.scss";
import ControlPanel from "./ControlPanel/ControlPanel";
import DisplayPanel from "./DisplayPanel/DisplayPanel";
import NavBar from "@/components/NavBar";
import { StyledFlexDiv } from "@/components/styled/styled";

/**
 * Renders the 'Nurture Animals' panel of Farmer Actions
 */
const NurtureAnimalsPanel = () => {
  // TODO: maybe automate this effect of rerendering after data is fetched/refreshed
  const { data: livestockData, error, isLoading } = useGetAllLivestockQuery();
  const dispatch = useDispatch();

  /**
   * Syncs data
   */
  async function syncData(): Promise<void> {
    // 'livestockData' will contain the fetched data from the query
    // 'isLoading' will be true while the data is being fetched
    // 'error' will contain any error that occurred during the data fetch
    if (isLoading) {
      console.log("Loading data...");
      return;
    }

    if (error) {
      console.error("Error fetching data:", error);
      return;
    }

    if (livestockData) {
      dispatch(setLivestock(livestockData.data));
    }
  }

  useEffect(() => {
    syncData();
  }, [livestockData]);

  return (
    <StyledFlexDiv $fill>
      <NavBar />
      <main className={styles.PagePanel}>
        <ControlPanel></ControlPanel>
        <DisplayPanel></DisplayPanel>
      </main>
    </StyledFlexDiv>
  );
};

export default NurtureAnimalsPanel;
