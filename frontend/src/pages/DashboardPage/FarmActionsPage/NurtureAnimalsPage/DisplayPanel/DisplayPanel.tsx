import { useSelector } from "react-redux";

import styles from "../NurtureAnimalsPanel.module.scss";
import { RootState } from "@/app/store.ts";
import LivestockProfile from "./LivestockProfile";
import { StyledFlexDiv } from "@/components/styled/styled";

function DisplayPanel() {
  const livestock = useSelector(
    (state: RootState) => state.livestock.livestock
  );

  const filteredLivestock = useSelector(
    (state: RootState) => state.livestock.filteredLivestock
  );

  const displayFiltered = useSelector(
    (state: RootState) => state.livestock.displayFiltered
  );

  return (
    <div className={styles.DisplayPanel}>
      <h2>
        <StyledFlexDiv $column>
          Total Livestock Displayed: &nbsp;
          {!displayFiltered && <div>{livestock.length}</div>}
          {displayFiltered && <div>{filteredLivestock.length}</div>}
        </StyledFlexDiv>
      </h2>
      {livestock &&
        !displayFiltered &&
        livestock.map((livestock: LivestockDTO, index) => (
          <fieldset key={index}>
            <LivestockProfile livestock={livestock} />
          </fieldset>
        ))}

      {filteredLivestock &&
        displayFiltered &&
        filteredLivestock.map((livestock: LivestockDTO, index) => (
          <fieldset key={index}>
            <LivestockProfile livestock={livestock} />
          </fieldset>
        ))}
    </div>
  );
}

export default DisplayPanel;
