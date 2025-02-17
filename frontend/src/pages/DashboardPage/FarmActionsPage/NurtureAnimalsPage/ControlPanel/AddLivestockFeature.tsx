import { useState, useEffect } from "react";
import { AnimalType, CropType } from "@/utils/enums";
import styles from "../NurtureAnimalsPanel.module.scss";
import { useCreateLivestockMutation } from "@/app/livestock/livestock.api.slice.ts";
import { DEFAULT_LIVESTOCK_STATE } from "@/configs/defaultStates";

function AddLivestockFeature() {
  // Add livestock states
  const [addLivestockState, setAddLivestockState] = useState<LivestockDTO>();
  const [addEnabled, setAddEnabled] = useState<boolean>(false);

  // API
  const [createLivestock] = useCreateLivestockMutation();

  /**
   * Adds a new livestock to the database
   */
  const handleAddLivestock = async () => {
    console.log("Adding livestock...");
    console.log(addLivestockState);
    if (addLivestockState === undefined) {
      console.error("addLivestockState is undefined!");
      return;
    }
    await createLivestock(addLivestockState);
  };

  /**
   * Syncs the livestock data with the database.
   * Also inits the addLivestockState with DEFAULT_LIVESTOCK_STATE
   */
  useEffect(() => {
    setAddLivestockState(DEFAULT_LIVESTOCK_STATE);
  }, []);

  return (
    <div>
      {/* ENABLE ADD LIVESTOCK FORM */}
      <form className={styles.AddLivestockForm}>
        <button
          className={styles.Button}
          type="button"
          onClick={() => {
            setAddEnabled(!addEnabled);
          }}
        >
          Add Livestock
        </button>
      </form>

      {/* ADD LIVESTOCK FORM */}
      {addEnabled && (
        <form className={styles.AddLivestock}>
          <h2>Add Livestock</h2>

          {/* TAG ID INPUT */}
          <section>
            <label htmlFor="tagID">Tag ID</label>
            <input
              type="number"
              name="tagID"
              id="tagID"
              maxLength={4}
              min={4000}
              max={4999}
              defaultValue={DEFAULT_LIVESTOCK_STATE.tag_id}
              onChange={(e) => {
                setAddLivestockState((prevState) => ({
                  ...prevState,
                  tag_id: parseInt(e.target.value),
                }));
              }}
            />
          </section>

          {/* ANIMAL TYPE INPUT */}
          <section>
            <label htmlFor="animalType">Animal Type</label>
            <select
              name="animalType"
              id="animalType"
              defaultValue={DEFAULT_LIVESTOCK_STATE.animal_type}
              onChange={(e) => {
                setAddLivestockState((prevState) => ({
                  ...prevState,
                  animal_type: e.target.value.toUpperCase() as AnimalType,
                }));
              }}
            >
              <option value="COW">Cow</option>
              <option value="CHICKEN">Chicken</option>
              <option value="PIG">Pig</option>
              <option value="SHEEP">Sheep</option>
            </select>
          </section>

          {/* DIET INPUT */}
          <section>
            <label htmlFor="diet">Diet</label>
            <select
              name="diet"
              id="diet"
              defaultValue={DEFAULT_LIVESTOCK_STATE.diet}
              onChange={(e) => {
                setAddLivestockState((prevState) => ({
                  ...prevState,
                  diet: e.target.value.toUpperCase() as CropType,
                }));
              }}
            >
              <option value="CANOLA">Canola</option>
              <option value="WHEAT">Wheat</option>
              <option value="CORN">Corn</option>
              <option value="POTATOES">Potatoes</option>
              <option value="MUSTARD">Mustard</option>
              <option value="COCONUT">Coconut</option>
            </select>
          </section>

          {/* AGE INPUT */}
          <section>
            <label htmlFor="age">Age</label>
            <input
              type="number"
              name="age"
              id="age"
              min={0}
              defaultValue={DEFAULT_LIVESTOCK_STATE.age}
              onChange={(e) => {
                setAddLivestockState((prevState) => ({
                  ...prevState,
                  age: parseInt(e.target.value),
                }));
              }}
            />
          </section>

          {/* WEIGHT INPUT */}
          <section>
            <label htmlFor="weight">Weight</label>
            <input
              type="number"
              name="weight"
              id="weight"
              min={0}
              defaultValue={DEFAULT_LIVESTOCK_STATE.weight}
              onChange={(e) => {
                setAddLivestockState((prevState) => ({
                  ...prevState,
                  weight: parseInt(e.target.value),
                }));
              }}
            />
          </section>

          {/* LAST FED INPUT */}
          <section>
            <label htmlFor="lastFed">Last Fed</label>
            <input
              type="date"
              name="lastFed"
              id="lastFed"
              defaultValue={DEFAULT_LIVESTOCK_STATE.last_fed as string}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => {
                setAddLivestockState((prevState) => ({
                  ...prevState,
                  last_fed: new Date(e.target.value)
                    .toISOString()
                    .split("T")[0],
                }));
              }}
            />
          </section>

          {/* LAST VIOLATED FOR HARVESTED GOODS INPUT */}
          <section>
            <label htmlFor="lastViolatedForHarvestedGoods">
              Last Harvested
            </label>
            <input
              type="date"
              name="lastViolatedForHarvestedGoods"
              id="lastViolatedForHarvestedGoods"
              defaultValue={
                DEFAULT_LIVESTOCK_STATE.last_violated_for_harvested_goods as string
              }
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => {
                setAddLivestockState((prevState) => ({
                  ...prevState,
                  last_violated_for_harvested_goods: new Date(e.target.value)
                    .toISOString()
                    .split("T")[0],
                }));
              }}
            />
          </section>

          {/* HARVESTABLE INPUT */}
          <section>
            <label htmlFor="harvestable">Harvestable</label>
            <select
              name="harvestable"
              id="harvestable"
              defaultValue={DEFAULT_LIVESTOCK_STATE.harvestable!.toString()}
              onChange={(e) => {
                setAddLivestockState((prevState) => ({
                  ...prevState,
                  harvestable: e.target.value === "true",
                }));
              }}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </section>

          <button
            className={styles.Button}
            type="button"
            id="addLivestockButton"
            onClick={() => {
              handleAddLivestock();
            }}
          >
            Add Livestock #{addLivestockState?.tag_id}
          </button>
        </form>
      )}
    </div>
  );
}

export default AddLivestockFeature;
