package com.server.controller;

import com.server.bean.RestResult;
import com.server.dto.LivestockDto;
import com.server.model.livestock.LivestockFilterModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.server.service.interfaces.ILivestockService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/v1/livestock")
public class LivestockController extends BaseController {
    @Autowired
    private ILivestockService service;

    /* -------------------------------------------------------------------------- */
    /*                             LIVESTOCK REQUESTS                             */
    /* -------------------------------------------------------------------------- */

    /**
     * Handles Retrieving Livestock Requests
     * GET /api/v1/livestock
     */
    @GetMapping(value = "")
    public RestResult<List<LivestockDto>> getLivestock() {
        List<LivestockDto> livestock = service.getLivestock();
        return RestResult.success(livestock, RestResult.Code.SUCCESS_OK);
    }

    /**
     * Handles Retrieving Livestock Requests with filters
     * GET /api/v1/livestock/filtered?filterParams
     */
    @GetMapping(value = "/filtered")
    public RestResult<List<LivestockDto>> getLivestock(@RequestParam Map<String,String> filterParams) {
        LivestockFilterModel livestockFilterModel = new LivestockFilterModel(filterParams);
        List<LivestockDto> livestock = service.getLivestock(livestockFilterModel);
        return RestResult.success(livestock, RestResult.Code.SUCCESS_OK);
    }

    /**
     * Handles Retrieving Livestock Requests by tagID
     * GET /api/v1/livestock/{tagID}
     */
    @GetMapping(value = "/{tagID}")
    public RestResult<LivestockDto> getLivestock(@PathVariable("tagID") int tagID) {
        LivestockDto livestock = service.getLivestock(tagID);
        return RestResult.success(livestock, RestResult.Code.SUCCESS_OK);
    }

    /**
     * Handles Retrieving the Count of filtered livestock
     * GET /api/v1/livestock/count?filterParams
     *
     * Sample Response Json:
     * {
     *   "count": 8
     * }
     */
    @GetMapping(value = "/count")
    public RestResult<Map<String, Integer>> getLivestockCount(@RequestParam Map<String,String> filterParams) {
        LivestockFilterModel livestockFilterModel = new LivestockFilterModel(filterParams);
        List<LivestockDto> livestock = service.getLivestock(livestockFilterModel);

        Map<String, Integer> responseData = new HashMap<>();
        responseData.put("count", livestock.size());

        return RestResult.success(responseData, RestResult.Code.SUCCESS_OK);
    }


    /**
     * Handles Insert Livestock Requests
     * <p>
     * POST /api/v1/livestock
     */
    @PostMapping(value = "")
    public RestResult<LivestockDto> insertLiveStock(@RequestBody String jsonPayload) {
        LivestockDto livestockDto = gson.fromJson(jsonPayload, LivestockDto.class);
        LivestockDto insertedLivestockDto = service.insertLivestock(livestockDto);
        return RestResult.success(insertedLivestockDto, RestResult.Code.SUCCESS_CREATED);
    }

    /**
     * Handles Update Livestock Requests
     * <p>
     * PUT /api/v1/livestock/{tagID}
     */
    @PutMapping(value = "/{tagID}")
    @ResponseBody
    public RestResult<LivestockDto> updateLivestock(@RequestBody String jsonPayload,
                                                    @PathVariable("tagID") int tagID) {
        // TODO: validate that all fields are present in jsonPayload
        LivestockDto livestockDto = gson.fromJson(jsonPayload, LivestockDto.class);
        LivestockDto updatedLivestock = service.updateLivestock(livestockDto, tagID);
        return RestResult.success(updatedLivestock, RestResult.Code.SUCCESS_OK);
    }


    /**
     * Handles Partially Updating Livestock Requests
     * <p>
     * PATCH /api/v1/livestock/{tagID}
     */
    @PatchMapping(value = "/{tagIID}")
    public RestResult<LivestockDto> patchLivestock(@RequestBody String jsonPayload, @PathVariable("tagID") int tagID) {
        // TODO: implement
        return null;
    }

    /**
     * Handles Delete Livestock Requests
     * <p>
     * DELETE /api/v1/livestock/{tagID}
     */
    @DeleteMapping(value = "/{tagID}")
    @ResponseBody
    public RestResult<LivestockDto> deleteLivestock(@PathVariable("tagID") int tagID) {
        service.deleteLivestock(tagID);
        return RestResult.success(null, RestResult.Code.SUCCESS_NO_CONTENT);
    }

    /**
     * OLD STUFF/METHODS
     */

    /**
     * Handles Filtering Livestock By: harvestable, animalType, min Age, max Age, diet, min tagID, max tagID,
     * minWaterSpent, minFoodSpent
     * <p>
     * POST /api/v1/livestock/filteredValues
     */
//    @PostMapping(value = "/filteredValues")
//    @ResponseBody
//    public RestResult<List<LivestockDto>> getFilteredLivestock(@RequestBody Map<String, Object> map, HttpServletResponse res) throws IOException {
//        // Check for if null for these values.
//        String harvestable = map.get("harvestable").toString().toUpperCase();
//        AnimalType animalType = AnimalType.valueOf(map.get("animalType").toString().toUpperCase());
//        CropType diet = CropType.valueOf(map.get("diet").toString().toUpperCase());
//
//        Map<String, Object> tagID = (Map<String, Object>) map.get("tagID");
//        int minTagID = (int) tagID.get("min");
//        int maxTagID = (int) tagID.get("max");
//
//        Map<String, Object> age = (Map<String, Object>) map.get("age");
//        int minAge = (int) age.get("min");
//        int maxAge = (int) age.get("max");
//
//        int minWaterSpent = (int) map.get("minWaterSpent");
//        int minFoodSpent = (int) map.get("minFoodSpent");
//
//        List<LivestockDto> livestock = service.getFilteredLivestock(harvestable, animalType, diet, minAge, maxAge,
//                minTagID, maxTagID, minWaterSpent, minFoodSpent);
//        PrintWriter out = res.getWriter();
//        res.setContentType("application/json");
//        res.setCharacterEncoding("UTF-8");
//        out.print(livestock);
//        out.flush();
//
//        // TODO: replace stub.
//        return RestResult.success(livestock);
//    }

//    /**
//     * Gets the animal count for each animal type filtered by age
//     * <p>
//     * GET /api/v1/livestock/animalCountByAge
//     */
//    @GetMapping(value = "/animalCountByAge")
//    public RestResult<LivestockModel> getAnimalCountTypeByAge(@RequestParam(name = "age") String age, HttpServletResponse res) throws IOException {
//        JSONArray livestock = service.getAnimalCountTypeByAge(Integer.valueOf(age));
//
//        PrintWriter out = res.getWriter();
//        res.setContentType("application/json");
//        res.setCharacterEncoding("UTF-8");
//        out.print(livestock);
//        out.flush();
//
//        // TODO: replace stub.
//        return RestResult.success(stubLivestockModel());
//    }
//
//    /**
//     * Gets the animal count for each animal type
//     * <p>
//     * GET /api/v1/livestock/count
//     */
//    @GetMapping(value = "/count")
//    public RestResult<LivestockModel> getAnimalCountType(HttpServletResponse res) throws IOException {
//        JSONArray livestock = service.getAnimalCountType();
//
//        PrintWriter out = res.getWriter();
//        res.setContentType("application/json");
//        res.setCharacterEncoding("UTF-8");
//        out.print(livestock);
//        out.flush();
//
//        // TODO: replace stub.
//        return RestResult.success(stubLivestockModel());
//    }
//
//    /**
//     * Handles getVetRecords request for the livestock
//     * <p>
//     * GET /api/v1/livestock/vetRecords
//     */
//    @GetMapping(value = "/vetRecords")
//    public RestResult<LivestockModel> getVetRecords(@RequestBody Map<String, Object> map, HttpServletResponse res) throws IOException {
//        int tag_to_find = Integer.parseInt(map.get("tagID").toString());
//        JSONArray livestock = service.getVetRecords(tag_to_find);
//
//        PrintWriter out = res.getWriter();
//        res.setContentType("application/json");
//        res.setCharacterEncoding("UTF-8");
//        out.print(livestock);
//        out.flush();
//
//        // TODO: replace stub.
//        return RestResult.success(stubLivestockModel());
//    }
//
//    /**
//     * Gets the total food and water spent for a given livestock (tagID)
//     * <p>
//     * GET /api/v1/livestock/foodWaterSpent
//     */
//    @GetMapping(value = "/foodWaterSpent")
//    public RestResult<LivestockModel> getFoodWaterSpent(@RequestBody Map<String, Object> map, HttpServletResponse res) throws IOException {
//        int tagID = Integer.parseInt(map.get("tagID").toString());
//        List<LivestockDto> data = service.getWaterAndFoodOfLivestock(tagID);
//
//        PrintWriter out = res.getWriter();
//        res.setContentType("application/json");
//        res.setCharacterEncoding("UTF-8");
//        out.print(data);
//        out.flush();
//
//        // TODO: replace stub.
//        return RestResult.success(stubLivestockModel());
//    }


}
