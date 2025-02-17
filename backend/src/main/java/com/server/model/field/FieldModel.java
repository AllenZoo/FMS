package com.server.model.field;

import com.server.enums.CropType;
import com.server.enums.FieldState;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

/**
 * The intent for this class is to update/store information about a single field
 */
@AllArgsConstructor
@Builder
@Getter
public class FieldModel {

    private final int plotNum;
    private final double nutrientLevels;
    private final CropType suitableCrops;
    private final int capacity;
    private final FieldState fieldState;
    private final boolean needPesticides;
}
