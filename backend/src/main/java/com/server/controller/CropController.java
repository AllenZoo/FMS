package com.server.controller;

import com.server.bean.RestResult;
import com.server.dto.CropDto;
import com.server.enums.CropStatus;
import com.server.enums.CropType;
import com.server.enums.CropVariant;
import com.server.model.crop.CropsFilterModel;
import com.server.service.interfaces.ICropService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping(value = "/api/v1/crops")
public class CropController extends BaseController {
    @Autowired
    private ICropService service;

    /* -------------------------------------------------------------------------- */
    /*                               CROPS REQUESTS                               */
    /* -------------------------------------------------------------------------- */

    /**
     * Handles Retrieving Crop Requests
     * GET /api/v1/crops
     */
    @GetMapping(value = "")
    public RestResult<List<CropDto>> getCrops() {
        List<CropDto> crops = service.getCrops();
        return RestResult.success(crops, RestResult.Code.SUCCESS_OK);
    }

    /**
     * Handles Retrieving Crop Requests
     * GET /api/v1/crops/filtered?filterParams...
     */
    @GetMapping(value = "/filtered")
    public RestResult<List<CropDto>> getCrops(@RequestParam Map<String, String> filterParams) {
        CropsFilterModel cropsFilterModel = new CropsFilterModel(filterParams);
        List<CropDto> crops = service.getCropsFiltered(cropsFilterModel);
        return RestResult.success(crops, RestResult.Code.SUCCESS_OK);
    }

    /**
     * Handles Retrieving Crop Requests by {cropType}/{cropVariant}/{cropStatus}
     * GET /api/v1/crops/{cropType}/{cropVariant}/{cropStatus}
     */
    @GetMapping(value = "/{cropType}/{cropVariant}/{cropStatus}")
    public RestResult<CropDto> getCrops(@PathVariable("cropType") CropType cropType,
                                        @PathVariable("cropVariant") CropVariant cropVariant,
                                        @PathVariable("cropStatus") CropStatus cropStatus) {
        CropDto cropDto = service.getCropByKey(cropType, cropVariant, cropStatus);
        return RestResult.success(cropDto, RestResult.Code.SUCCESS_OK);
    }

    /**
     * Handles creating/inserting a new crop into db
     * If existing cropType, cropVariant, and cropStatus tuple exists,
     * this method will add the quantity to the existing row.
     *
     * POST /api/v1/crops
     */
    @PostMapping(value = "")
    public RestResult<CropDto> insertCrop(@RequestBody String jsonPayload) {
        CropDto cropDto = gson.fromJson(jsonPayload, CropDto.class);
        CropDto cropDtoInserted = service.insertCrop(cropDto);
        return RestResult.success(cropDtoInserted, RestResult.Code.SUCCESS_CREATED);
    }

    /**
     * Handles updating a crop's quantity in db by cropType, cropVariant, and cropStatus
     * PUT /api/v1/crops/{cropType}/{cropVariant}/{cropStatus}
     */
    @PutMapping(value = "/{cropType}/{cropVariant}/{cropStatus}")
    public RestResult<CropDto> updateCrop(@RequestBody String jsonPayload,
                                          @PathVariable("cropType") CropType cropType,
                                          @PathVariable("cropVariant") CropVariant cropVariant,
                                          @PathVariable("cropStatus") CropStatus cropStatus) {
        CropDto cropDto = gson.fromJson(jsonPayload, CropDto.class);
        CropDto cropDtoUpdated = service.updateCrop(cropDto, cropType, cropVariant, cropStatus);
        return RestResult.success(cropDtoUpdated, RestResult.Code.SUCCESS_OK);
    }

    /**
     * Handles deleting a crop row in db by cropType, cropVariant, and cropStatus.
     * DELETE /api/v1/crops/{cropType}/{cropVariant}/{cropStatus}
     */
    @DeleteMapping(value = "/{cropType}/{cropVariant}/{cropStatus}")
    public RestResult<CropDto> deleteCrop(@PathVariable("cropType") CropType cropType,
                                          @PathVariable("cropVariant") CropVariant cropVariant,
                                          @PathVariable("cropStatus") CropStatus cropStatus) {
        service.deleteCrop(cropType, cropVariant, cropStatus);
        return RestResult.success(null, RestResult.Code.SUCCESS_NO_CONTENT);
    }
}
