import { useContext } from "react";
import ChickenProfileImage from "@/assets/images/livestock/chicken.png";
import CowProfileImage from "@/assets/images/livestock/cow.png";
import PigProfileImage from "@/assets/images/livestock/pig.png";
import SheepProfileImage from "@/assets/images/livestock/sheep.png";
import {
  GiBasket,
  GiMedicalPack,
  GiBloodySword,
  GiGrain,
  GiPowderBag,
} from "react-icons/gi";

import { AnimalType } from "@/utils/enums";
import {
  useDeleteLivestockMutation,
  useUpdateLivestockMutation,
} from "@/app/livestock/livestock.api.slice.ts";
import ModalContext from "@/contexts/ModalContext";
import { formatDateToISO } from "@/utils/dates";
import styles from "../NurtureAnimalsPanel.module.scss";

interface LivestockProfileProps {
  livestock: LivestockDTO;
}

function LivestockProfile(props: LivestockProfileProps) {
  const modalContext = useContext(ModalContext);

  // States (TOOD: use State for the following)
  // const [livestock, setLivestock] = useState<LivestockDTO>(props.livestock);
  const { livestock } = props;

  // API
  const [deleteLivestock] = useDeleteLivestockMutation();
  const [updateLivestock] = useUpdateLivestockMutation();

  /**
   * Gets the profile image of the animal
   */
  const getAnimalProfile = (animalType: AnimalType) => {
    switch (animalType) {
      case AnimalType.CHICKEN:
        return ChickenProfileImage;
      case AnimalType.COW:
        return CowProfileImage;
      case AnimalType.PIG:
        return PigProfileImage;
      case AnimalType.SHEEP:
        return SheepProfileImage;
      default:
        return "";
    }
  };
  /**
   * Terminate the livestock
   */
  const terminateLivestock = async (livestock: LivestockDTO) => {
    try {
      modalContext.setModal(
        <>
          <h1>
            Are you sure you want to terminate {livestock.animal_type} (ID #
            {livestock.tag_id})?
          </h1>
          <button
            className={styles.Button}
            type="button"
            onClick={() => {
              try {
                deleteLivestock(livestock.tag_id);
                window.alert(
                  `Successfully terminated livestock #${livestock.tag_id}!`
                );
              } catch (err: any) {
                window.alert(
                  `Could not terminate livestock #${livestock.tag_id}!`
                );
              }
              modalContext.clearModal();
            }}
          >
            Absolutely Yes!
          </button>
          <button
            className={styles.Button}
            type="button"
            onClick={() => {
              modalContext.clearModal();
            }}
          >
            Not Now!
          </button>
        </>
      );
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Feeds the livestock
   */
  const feedLivestock = async (livestock: LivestockDTO) => {
    try {
      let livestockToInsert: LivestockDTO = {
        ...livestock,
        last_fed: new Date().toISOString().split("T")[0],
        last_violated_for_harvested_goods: formatDateToISO(
          livestock.last_violated_for_harvested_goods
        ),
      };
      await updateLivestock(livestockToInsert);
      window.alert(
        `Successfully fed livestock! \n ${livestock.animal_type} #${livestock.tag_id} says: "Mmm! That was delicious!"`
      );
    } catch (err) {
      window.alert(
        `Failed to feed livestock! \n ${livestock.animal_type} #${livestock.tag_id} says: "Welp! Guess I'll just starve."`
      );
    }
  };

  /**
   * Harvests from the livestock
   */
  const harvestLivestock = async (livestock: LivestockDTO) => {
    try {
      const livestockToInsert: LivestockDTO = {
        ...livestock,
        last_violated_for_harvested_goods: new Date()
          .toISOString()
          .split("T")[0],
        last_fed: formatDateToISO(livestock.last_fed),
      };
      await updateLivestock(livestockToInsert);
      window.alert(
        `Successfully harvested livestock! \n ${livestock.animal_type} #${livestock.tag_id} says: "AAAAAAAAAAAAHHHHHHHHHHH!!!"`
      );
    } catch (err) {
      window.alert(
        `Failed to harvest livestock! \n ${livestock.animal_type} #${livestock.tag_id} says: "Thank the heavens!"`
      );
    }
  };

  // TODO: reimplement
  /**
   * Loads resources spent on livestock
   */
  const lookUpResourcesSpent = async (livestock: LivestockDTO) => {
    console.log(livestock);
    alert("This feature is not implemented yet!");
    // try {
    //   await getResourcesSpent(livestock).then((resourcesSpent) => {
    //     modalContext.setModal(
    //       <>
    //         <h1>
    //           Resources Spent On {livestock.animalType} (ID #{livestock.tagID})
    //         </h1>
    //         {resourcesSpent ? (
    //           <div>
    //             <h2>Total Food Consumed: {resourcesSpent.totalFoodConsumed}</h2>
    //             <h2>
    //               Total Water Consumed: {resourcesSpent.totalWaterConsumed}
    //             </h2>
    //           </div>
    //         ) : (
    //           <h2>
    //             This animal has been neglected...deprived of food and water :D
    //           </h2>
    //         )}
    //         <button
    //           className={styles.Button}
    //           type="button"
    //           onClick={() => {
    //             modalContext.clearModal();
    //           }}
    //         >
    //           Close
    //         </button>
    //       </>
    //     );
    //   });
    // } catch (err) {
    //   console.error(err);
    // }
  };

  // TODO: reimplement
  /**
   * Loads vet records for livestock
   */
  const lookUpVetRecords = async (livestock: LivestockDTO) => {
    console.log(livestock);
    alert("This feature is not implemented yet!");
    // try {
    //   await getVetRecords(livestock).then((vetRecords) => {
    //     modalContext.setModal(
    //       <>
    //         <h1>
    //           Veterinary Records For {livestock.animalType} (ID #
    //           {livestock.tagID})
    //         </h1>
    //         {vetRecords ? (
    //           <div>
    //             <h2>Record ID: #{vetRecords.recordID}</h2>
    //             <h2>Health Status: {vetRecords.healthstatus}</h2>
    //             <h2>Record Date: {vetRecords.record_date}</h2>
    //           </div>
    //         ) : (
    //           <h2>No records found</h2>
    //         )}
    //         <button
    //           className={styles.Button}
    //           type="button"
    //           onClick={() => {
    //             modalContext.clearModal();
    //           }}
    //         >
    //           Close
    //         </button>
    //       </>
    //     );
    //   });
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return (
    <div className={styles.LivestockInfo}>
      <legend>Livestock ID: #{livestock.tag_id}</legend>
      <img
        src={getAnimalProfile(livestock.animal_type)}
        alt=""
        draggable={false}
      />

      <div className={styles.Info}>
        <b>GENERAL</b>
        <section>
          <p>
            Type: <br />
            <b>{livestock.animal_type}</b>
          </p>
          <p>
            Age: <br />
            <b>{livestock.age} YEARS</b>
          </p>
          <p>
            Weight: <br />
            <b>{livestock.weight} KG</b>
          </p>
        </section>

        <b>FEEDING</b>
        <section>
          <p>
            Diet: <br />
            <b>{livestock.diet}</b>
          </p>
          <p>
            Last Fed: <br />
            <b>{livestock.last_fed || "N/A"}</b>
          </p>
          {/* <p>
              Food Spent: <br />
              <b>
                {livestock.foodSpent ? livestock.foodSpent : "None"}
              </b>
            </p>
            <p>
              Water Spent: <br />
              <b>
                {livestock.waterSpent ? livestock.waterSpent : "None"}
              </b>
            </p> */}
        </section>

        <b>HARVEST</b>
        <section>
          <p>
            Harvestable: <br />
            <b>{livestock.harvestable ? "YES" : "NO"}</b>
          </p>
          <p>
            Last Violated For Harvested Goods: <br />
            <b>{livestock.last_violated_for_harvested_goods || "N/A"}</b>
          </p>
        </section>
      </div>

      <div className={styles.Actions}>
        <button
          className={styles.ActionButton}
          type="button"
          onClick={() => feedLivestock(livestock)}
          id="feed"
          title={`Feed #${livestock.tag_id} with ${livestock.diet}`}
        >
          <GiGrain />
        </button>

        <button
          className={styles.ActionButton}
          type="button"
          onClick={() => harvestLivestock(livestock)}
          id="harvest"
          title={
            livestock.harvestable
              ? `Harvest #${livestock.tag_id}`
              : `Cannot harvest #${livestock.tag_id} yet`
          }
          disabled={!livestock.harvestable}
        >
          <GiBasket />
        </button>

        <button
          className={styles.ActionButton}
          type="button"
          onClick={() => lookUpResourcesSpent(livestock)}
          id="resourcesSpent"
          title={`Read Resources Spent on #${livestock.tag_id}`}
        >
          <GiPowderBag />
        </button>

        <button
          className={styles.ActionButton}
          type="button"
          onClick={() => lookUpVetRecords(livestock)}
          id="vetRecords"
          title={`Read Vet Records of #${livestock.tag_id}`}
        >
          <GiMedicalPack />
        </button>

        <button
          className={styles.ActionButton}
          type="button"
          onClick={() => terminateLivestock(livestock)}
          id="terminate"
          title={`Terminate #${livestock.tag_id}`}
        >
          <GiBloodySword />
        </button>
      </div>
    </div>
  );
}

export default LivestockProfile;
