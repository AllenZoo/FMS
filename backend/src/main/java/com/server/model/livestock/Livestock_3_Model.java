package com.server.model.livestock;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import org.json.JSONObject;

import com.server.enums.AnimalType;

@AllArgsConstructor
@Builder
@Getter
public class Livestock_3_Model {
    private final AnimalType animalType;
    private final int age;
    private final boolean harvestable;

    public JSONObject toJSON() {
        JSONObject json = new JSONObject();
        json.put("animalType", animalType);
        json.put("age", age);
        json.put("harvestable", harvestable);
        return json;
    }

    public static Livestock_3_Model fromJSON(JSONObject json) {
        return new Livestock_3_Model(
                AnimalType.valueOf(json.getString("animalType").toUpperCase()),
                json.getInt("age"),
                json.getBoolean("harvestable")
        );
    }
}
