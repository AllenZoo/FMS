package com.server.model.crop;

import com.server.enums.CropStatus;
import com.server.enums.CropType;
import com.server.enums.CropVariant;
import com.server.util.parsing.TypeParser;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
public class CropsFilterModel {

    private final CropType cropType;
    private final CropVariant cropVariant;
    private final CropStatus cropStatus;
    private final Integer minQuantity;
    private final Integer maxQuantity;

    /**
     * Creates a crops filter model from the query parameters
     *
     * @param filterParams The query parameter string
     */
    public CropsFilterModel(Map<String, String> filterParams) {
        this.cropType = TypeParser.parse(filterParams.get("cropType"), CropType.class);
        this.cropVariant = TypeParser.parse(filterParams.get("cropVariant"), CropVariant.class);
        this.cropStatus = TypeParser.parse(filterParams.get("cropStatus"), CropStatus.class);
        this.minQuantity = TypeParser.parse(filterParams.get("minQuantity"), Integer.class);
        this.maxQuantity = TypeParser.parse(filterParams.get("maxQuantity"), Integer.class);
    }
}
