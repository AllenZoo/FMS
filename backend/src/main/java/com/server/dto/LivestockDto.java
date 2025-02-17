package com.server.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.gson.annotations.SerializedName;
import com.server.enums.AnimalType;
import com.server.enums.CropType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.sql.Date;
import java.util.Objects;

@AllArgsConstructor
@Builder
@Getter
public class LivestockDto {
    @NotNull(message = "tag_id is a required field.")
    @SerializedName("tag_id")
    @Setter
    private int tagID;

    @NotBlank(message = "animal_type is a required field.")
    @SerializedName("animal_type")
    private final AnimalType animalType;

    @SerializedName("age")
    private final int age;

    @SerializedName("diet")
    private final CropType diet;

    @SerializedName("weight")
    private final double weight;

    @SerializedName("last_fed")
    private final Date lastFed;

    @SerializedName("harvestable")
    private final boolean harvestable;

    @SerializedName("last_violated_for_harvested_goods")
    private final Date lastViolatedForHarvestedGoods;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LivestockDto that = (LivestockDto) o;
        return tagID == that.tagID &&
                age == that.age &&
                Double.compare(that.weight, weight) == 0 &&
                harvestable == that.harvestable &&
                Objects.equals(animalType, that.animalType) &&
                Objects.equals(diet, that.diet) &&
                Objects.equals(lastFed, that.lastFed) &&
                Objects.equals(lastViolatedForHarvestedGoods, that.lastViolatedForHarvestedGoods);
    }

    @Override
    public int hashCode() {
        return Objects.hash(tagID, animalType, age, diet, weight, lastFed, harvestable, lastViolatedForHarvestedGoods);
    }
}
