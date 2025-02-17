package com.server.service.interfaces;

import com.server.dto.CropDto;
import com.server.enums.CropStatus;
import com.server.enums.CropType;
import com.server.enums.CropVariant;
import com.server.model.crop.CropsFilterModel;

import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface ICropService {

    public List<CropDto> getCrops();
    public List<CropDto> getCropsFiltered(CropsFilterModel cropsFilterModel);
    public CropDto getCropByKey(CropType cropType, CropVariant cropVariant, CropStatus cropStatus);
    public CropDto insertCrop(CropDto cropDto);
    public CropDto updateCrop(CropDto cropDto, CropType cropType, CropVariant cropVariant, CropStatus cropStatus);
    public CropDto deleteCrop(CropType cropType, CropVariant cropVariant, CropStatus cropStatus);
}
