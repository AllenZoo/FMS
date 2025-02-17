package com.server.model.livestock;

import com.server.enums.AnimalType;
import com.server.enums.CropType;
import com.server.util.parsing.TypeParser;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@Builder
@Getter
@AllArgsConstructor
public class LivestockFilterModel {

    private final Boolean harvestable;
    private final AnimalType animalType;
    private final CropType diet;
    private final Integer minAge;
    private final Integer maxAge;
    private final Integer minTagID;
    private final Integer maxTagID;

//    private final Integer minWaterSpent;
//    private final Integer minFoodSpent;

    /**
     * Creates a livestock filter model from the query parameters
     *
     * @param filterParams The query parameter string
     */
    public LivestockFilterModel(Map<String, String> filterParams) {
        this.harvestable = TypeParser.parse(filterParams.get("harvestable"), Boolean.class);
        this.animalType = TypeParser.parse(filterParams.get("animalType"), AnimalType.class);
        this.diet = TypeParser.parse(filterParams.get("diet"), CropType.class);
        this.minAge = TypeParser.parse(filterParams.get("minAge"), Integer.class);
        this.maxAge = TypeParser.parse(filterParams.get("maxAge"), Integer.class);
        this.minTagID = TypeParser.parse(filterParams.get("minTagID"), Integer.class);
        this.maxTagID = TypeParser.parse(filterParams.get("maxTagID"), Integer.class);
        //this.minWaterSpent = parseInteger(filterParams.get("minWaterSpent"));
        //this.minFoodSpent = parseInteger(filterParams.get("minFoodSpent"));
    }
}
