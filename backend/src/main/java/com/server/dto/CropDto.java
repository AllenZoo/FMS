package com.server.dto;

import com.google.gson.annotations.SerializedName;
import com.server.enums.CropStatus;
import com.server.enums.CropType;
import com.server.enums.CropVariant;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Builder
@Getter
public class CropDto {

    @SerializedName("crop_type")
    private final CropType cropType;
    @SerializedName("crop_variant")
    private final CropVariant cropVariant;
    @SerializedName("crop_status")
    private final CropStatus cropStatus;
    @SerializedName("quantity")
    private final int quantity;
}
