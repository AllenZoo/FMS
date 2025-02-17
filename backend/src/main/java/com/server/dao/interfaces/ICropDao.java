package com.server.dao.interfaces;

import com.server.enums.CropStatus;
import com.server.enums.CropType;
import com.server.enums.CropVariant;
import com.server.model.crop.CropModel;
import com.server.model.crop.CropsFilterModel;

import java.util.List;

public interface ICropDao {
    public List<CropModel> getCrops();
    public List<CropModel> getCropsFiltered(CropsFilterModel cropsFilterModel);
    public CropModel getCropByKey(CropType cropType, CropVariant cropVariant, CropStatus cropStatus);
    public void insertCrop(CropModel cropModel);
    public void updateCrop(CropModel cropModel, CropType cropType, CropVariant cropVariant, CropStatus cropStatus);
    public void deleteCrop(CropType cropType, CropVariant cropVariant, CropStatus cropStatus);
}
