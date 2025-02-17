import styles from "../NurtureAnimalsPanel.module.scss";
import { useState, useEffect } from "react";
import { AnimalType } from "@/utils/enums";
import { useGetFilteredLivestockCountQuery } from "@/app/livestock/livestock.api.slice";

function LivestockSummaryPanel() {
  const [livestockCount, setLivestockCount] = useState<
    { type: AnimalType; count: number }[]
  >([]);

  const cowCount = useGetFilteredLivestockCountQuery({
    animalType: AnimalType.COW,
  });
  const chickenCount = useGetFilteredLivestockCountQuery({
    animalType: AnimalType.CHICKEN,
  });
  const pigCount = useGetFilteredLivestockCountQuery({
    animalType: AnimalType.PIG,
  });
  const sheepCount = useGetFilteredLivestockCountQuery({
    animalType: AnimalType.SHEEP,
  });

  const refreshLivestockCount = async () => {
    await Promise.all([cowCount, chickenCount, pigCount, sheepCount]);
    setLivestockCount([
      {
        type: AnimalType.COW,
        count: cowCount.data?.data.count || 0,
      },
      {
        type: AnimalType.CHICKEN,

        count: chickenCount.data?.data.count || 0,
      },
      {
        type: AnimalType.PIG,
        count: pigCount.data?.data.count || 0,
      },
      {
        type: AnimalType.SHEEP,
        count: sheepCount.data?.data.count || 0,
      },
    ]);
  };

  useEffect(() => {
    refreshLivestockCount();
  }, [cowCount, chickenCount, pigCount, sheepCount]);

  return (
    <div className={styles.LivestockSummary}>
      <h2>Livestock Summary</h2>
      <section>
        {Object.keys(AnimalType).map((animalType, index) => (
          <span key={index}>
            <h3># of {animalType}:</h3>
            {livestockCount.find(
              (livestockCount) =>
                livestockCount.type.toUpperCase() === animalType
            )?.count || 0}
          </span>
        ))}
        <button className={styles.Button} onClick={refreshLivestockCount}>
          Refresh
        </button>
      </section>
    </div>
  );
}

export default LivestockSummaryPanel;
