package com.server.model.livestock;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.sql.Date;

import org.json.JSONObject;

import com.server.enums.AnimalType;
import com.server.enums.CropType;

/**
 * The intent for this class is to update/store information about a single livestock
 */
@AllArgsConstructor
@Builder
@Getter
public class  LivestockModel {

    private final int tagID;
    private final AnimalType animalType;
    private final int age;
    private final CropType diet;
    private final double weight;
    private final Date lastFed;
    private final boolean harvestable;
    private final Date lastViolatedForHarvestedGoods;

    public JSONObject toJSON() {
        JSONObject json = new JSONObject();
        json.put("tagID", tagID);
        json.put("animalType", animalType);
        json.put("age", age);
        json.put("diet", diet);
        json.put("weight", weight);
        json.put("lastFed", lastFed);
        json.put("harvestable", harvestable);
        json.put("lastViolatedForHarvestedGoods", lastViolatedForHarvestedGoods);
        return json;
    }

    public static LivestockModel fromJSON(JSONObject json) {
        Date lastFed;
        try {
          lastFed = Date.valueOf(json.getString("lastFed"));
        } catch (Exception e) {
          lastFed = null;
        }

        Date lastViolatedForHarvestedGoods;
        try {
          lastViolatedForHarvestedGoods = Date.valueOf(json.getString("lastViolatedForHarvestedGoods"));
        } catch (Exception e) {
          lastViolatedForHarvestedGoods = null;
        }

        return new LivestockModel(
                json.getInt("tagID"),
                AnimalType.valueOf(json.getString("animalType").toUpperCase()),
                json.getInt("age"),
                CropType.valueOf(json.getString("diet").toUpperCase()),
                json.getDouble("weight"),
                lastFed,
                json.getBoolean("harvestable"),
                lastViolatedForHarvestedGoods
        );
    }
}