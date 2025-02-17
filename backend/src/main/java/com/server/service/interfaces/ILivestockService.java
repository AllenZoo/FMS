package com.server.service.interfaces;

import com.server.dto.LivestockDto;
import com.server.enums.AnimalType;
import com.server.enums.CropType;
import com.server.model.livestock.LivestockFilterModel;

import org.json.JSONArray;

import java.util.List;


public interface ILivestockService {

    /**
     * Get list of all livestock
     */
    public List<LivestockDto> getLivestock();

    /**
     * Get list of all livestock, filtered by livestockFilterModel.
     */
    public List<LivestockDto> getLivestock(LivestockFilterModel livestockFilterModel);

    /**
     * Get livestock with specific tagID
     */
    public LivestockDto getLivestock(int tagID);

    /**
     * Update the livestock based on tagID.
     * @param livestockDto
     * @return
     */
    public LivestockDto updateLivestock(LivestockDto livestockDto, int tagID);

    public LivestockDto patchLivestock(LivestockDto livestockDto, int tagID);

    /**
     * Insert a livestock given info
     */
    public LivestockDto insertLivestock(LivestockDto livestockDto);


    public void deleteLivestock(int tagID);




    /**
     * OLD STUFF/METHODS
     */

    /**
     * Join query with vet records
     */
    // public JSONArray getVetRecords(int id);

    /**
     * Aggregation with group by -> count animal types
     */
    // public JSONArray getAnimalCountType();

    // public JSONArray getAnimalCountTypeByAge(int age);

//    public List<LivestockDto> getFilteredLivestock(String harvestable, AnimalType animalType, CropType diet, int minAge, int maxAge,
//                                                   int minTagID, int maxTagID, int minWaterSpent, int minFoodSpent);


    // public List<LivestockDto> getWaterAndFoodOfLivestock(int tagID);
}
