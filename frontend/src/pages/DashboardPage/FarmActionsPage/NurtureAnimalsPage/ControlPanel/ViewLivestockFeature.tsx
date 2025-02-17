import styles from "../NurtureAnimalsPanel.module.scss";
import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { AnimalType, CropType } from "@/utils/enums";
import { useDispatch } from "react-redux";
import {
  setDisplayFiltered,
  setFilteredLivestock,
} from "@/app/livestock/livestock.slice";
import { useGetFilteredLivestockQuery } from "@/app/livestock/livestock.api.slice";
import { filterLivestockToQueryParams } from "@/utils/converter";

function ViewLivestockFeature() {
  // Filter states
  const [filterState, setFilterState] = useState<FilteredLivestock>({});
  const [filterFormEnabled, setFilterFormEnabled] = useState<boolean>(false);
  const [filterApplied, setFilterApplied] = useState<boolean>(false);

  const dispatch = useDispatch();

  // API
  const filteredLivestock = useGetFilteredLivestockQuery(
    filterLivestockToQueryParams(filterState)
  );

  /**
   * Clears all filters
   *
   * TODO: reset filter form to default values.
   *
   * Currently this function only clears the filter state (for querying purposes), and sets filterApplied to false (which tells the display panel
   * to display all livestock instead of the filtered livestock).
   * The acual stored filteredLivestock is not changed.
   */
  const clearFilters = () => {
    setFilterState({});
    setFilterApplied(false);
    dispatch(setDisplayFiltered(false));
  };

  const applyFilters = () => {
    setFilterApplied(true);
  };

  useEffect(() => {
    // Update stored filtered livestock only when 'Apply Filters' button is clicked. (Applies to new filters)
    if (filterApplied) {
      dispatch(setDisplayFiltered(filterFormEnabled));
      dispatch(setFilteredLivestock(filteredLivestock.data?.data || []));
    }
    setFilterApplied(false);
  }, [filterApplied]);

  return (
    <div>
      {/* VIEW LIVESTOCK FORM */}
      <form className={styles.ViewLivestockForm}>
        <button
          className={styles.Button}
          type="button"
          id="viewLivestockButton"
        >
          View Livestock
        </button>

        <button
          className={styles.ActionButton}
          type="button"
          onClick={() => {
            setFilterFormEnabled(!filterFormEnabled);
          }}
          id="filter"
        >
          <FaFilter />
        </button>
      </form>

      {/* FILTER LIVESTOCK FORM */}
      {filterFormEnabled && (
        <form className={styles.FilterLivestock}>
          <h2>Filter Livestock</h2>
          {/* TAG ID FILTER INPUT */}
          <section>
            <label htmlFor="minTagID">Tag ID</label>
            <input
              type="number"
              name="minTagID"
              id="minTagID"
              defaultValue={filterState.tagID?.min || 4000}
              min={4000}
              max={4999}
              onChange={(e) => {
                setFilterState((prevState) => ({
                  ...prevState,
                  tagID: {
                    min: parseInt(e.target.value),
                    max: prevState.tagID?.max || 4999,
                  },
                }));
              }}
            />
            <label htmlFor="maxTagID">to</label>
            <input
              type="number"
              name="maxTagID"
              id="maxTagID"
              defaultValue={filterState.tagID?.max || 4999}
              min={4000}
              max={4999}
              onChange={(e) => {
                setFilterState((prevState) => ({
                  ...prevState,
                  tagID: {
                    min: prevState.tagID?.min || 4000,
                    max: parseInt(e.target.value),
                  },
                }));
              }}
            />
          </section>

          {/* ANIMAL TYPE FILTER INPUT */}
          <section>
            <label htmlFor="animalType">Animal Type</label>
            <select
              name="animalType"
              id="animalType"
              defaultValue={"all"}
              onChange={(e) => {
                setFilterState((prevState) => ({
                  ...prevState,
                  animalType: e.target.value as AnimalType,
                }));
              }}
            >
              <option value="undefined">All</option>
              <option value="cow">Cow</option>
              <option value="chicken">Chicken</option>
              <option value="pig">Pig</option>
              <option value="sheep">Sheep</option>
            </select>
          </section>

          {/* DIET FILTER INPUT */}
          <section>
            <label htmlFor="diet">Diet</label>
            <select
              name="diet"
              id="diet"
              defaultValue={"all"}
              onChange={(e) => {
                setFilterState((prevState) => ({
                  ...prevState,
                  diet: e.target.value as CropType,
                }));
              }}
            >
              <option value="undefined">All</option>
              <option value="canola">Canola</option>
              <option value="wheat">Wheat</option>
              <option value="corn">Corn</option>
            </select>
          </section>

          {/* HARVESTABLE FILTER INPUT */}
          <section>
            <label htmlFor="harvestable">Harvestable</label>
            <select
              name="harvestable"
              id="harvestable"
              defaultValue={"all"}
              onChange={(e) => {
                if (e.target.value === "all")
                  setFilterState((prevState) => ({
                    ...prevState,
                    harvestable: undefined,
                  }));
                else
                  setFilterState((prevState) => ({
                    ...prevState,
                    harvestable: e.target.value === "true",
                  }));
              }}
            >
              <option value="undefined">All</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </section>

          {/* AGE FILTER INPUT */}
          <section>
            <label htmlFor="minAge">Age</label>
            <input
              type="number"
              name="minAge"
              id="minAge"
              defaultValue={filterState.age?.min || -1}
              min={-1}
              max={100}
              onChange={(e) => {
                setFilterState((prevState) => ({
                  ...prevState,
                  age: {
                    min: parseInt(e.target.value),
                    max: prevState.age?.max || 100,
                  },
                }));
              }}
            />
            <label htmlFor="maxAge">to</label>
            <input
              type="number"
              name="maxAge"
              id="maxAge"
              defaultValue={filterState.age?.max || -1}
              min={-1}
              max={100}
              onChange={(e) => {
                setFilterState((prevState) => ({
                  ...prevState,
                  age: {
                    min: prevState.age?.min || -1,
                    max: parseInt(e.target.value),
                  },
                }));
              }}
            />
          </section>

          {/* FOOD SPENT FILTER INPUT */}
          <section>
            <label htmlFor="minFoodSpent">Min Food Spent</label>
            <input
              type="number"
              name="minFoodSpent"
              id="minFoodSpent"
              defaultValue={filterState.minFoodSpent || -1}
              min={-1}
              onChange={(e) => {
                setFilterState((prevState) => ({
                  ...prevState,
                  minFoodSpent: parseInt(e.target.value),
                }));
              }}
            />
          </section>

          {/* WATER SPENT FILTER INPUT */}
          <section>
            <label htmlFor="minWaterSpent">Min Water Spent</label>
            <input
              type="number"
              name="minWaterSpent"
              id="minWaterSpent"
              defaultValue={filterState.minWaterSpent || -1}
              min={-1}
              onChange={(e) => {
                setFilterState((prevState) => ({
                  ...prevState,
                  minWaterSpent: parseInt(e.target.value),
                }));
              }}
            />
          </section>

          {/* Apply/Clear Filters */}
          <section>
            <button
              className={styles.Button}
              type="button"
              id="clearFilters"
              onClick={clearFilters}
            >
              Clear Filters
            </button>

            <button
              className={styles.Button}
              onClick={applyFilters}
              type="button"
              id="applyFilters"
            >
              Apply Filters
            </button>
          </section>
        </form>
      )}
    </div>
  );
}

export default ViewLivestockFeature;
