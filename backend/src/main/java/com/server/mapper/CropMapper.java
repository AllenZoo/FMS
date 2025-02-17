package com.server.mapper;

import com.server.enums.CropStatus;
import com.server.enums.CropType;
import com.server.enums.CropVariant;
import com.server.model.crop.CropModel;
import com.server.model.crop.CropsFilterModel;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CropMapper {
    public List<CropModel> getCrops();
    public List<CropModel> getCropsFiltered(@Param("filterModel") CropsFilterModel cropsFilterModel);
    public CropModel getCropByKey(@Param("cropType") CropType cropType,
                                  @Param("cropVariant") CropVariant cropVariant,
                                  @Param("cropStatus") CropStatus cropStatus);
    public void insertCrop(@Param("crop") CropModel cropModel);
    public void updateCrop(@Param("crop") CropModel cropModel,
                           @Param("cropType") CropType cropType,
                           @Param("cropVariant") CropVariant cropVariant,
                           @Param("cropStatus") CropStatus cropStatus);
    public void deleteCrop(@Param("cropType") CropType cropType,
                           @Param("cropVariant") CropVariant cropVariant,
                           @Param("cropStatus") CropStatus cropStatus);
}
