import styles from "../NurtureAnimalsPanel.module.scss";
import LivestockSummaryPanel from "./LivestockSummaryPanel";
import ViewLivestockFeature from "./ViewLivestockFeature";
import AddLivestockFeature from "./AddLivestockFeature";

function ControlPanel() {
  return (
    <div className={styles.ControlPanel}>
      <h2>Nurture Animals</h2>
      <div className={styles.Controls}>
        <ViewLivestockFeature></ViewLivestockFeature>
        <AddLivestockFeature></AddLivestockFeature>
        <LivestockSummaryPanel></LivestockSummaryPanel>
      </div>
    </div>
  );
}

export default ControlPanel;
