package com.server.dao.classes;

import com.server.dao.BaseDao;
import com.server.dao.interfaces.ICropDao;
import com.server.enums.CropStatus;
import com.server.enums.CropType;
import com.server.enums.CropVariant;
import com.server.mapper.CropMapper;
import com.server.model.crop.CropModel;
import com.server.model.crop.CropsFilterModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CropDao extends BaseDao implements ICropDao {

    @Autowired
    private CropMapper cropMapper;

    @Override
    public List<CropModel> getCrops() {
        return cropMapper.getCrops();
    }

    @Override
    public List<CropModel> getCropsFiltered(CropsFilterModel cropsFilterModel) {
        return cropMapper.getCropsFiltered(cropsFilterModel);
    }

    @Override
    public CropModel getCropByKey(CropType cropType, CropVariant cropVariant, CropStatus cropStatus) {
        return cropMapper.getCropByKey(cropType, cropVariant, cropStatus);
    }

    @Override
    public void insertCrop(CropModel cropModel) {
        cropMapper.insertCrop(cropModel);
    }

    @Override
    public void updateCrop(CropModel cropModel, CropType cropType, CropVariant cropVariant, CropStatus cropStatus) {
        cropMapper.updateCrop(cropModel, cropType, cropVariant, cropStatus);
    }

    @Override
    public void deleteCrop(CropType cropType, CropVariant cropVariant, CropStatus cropStatus) {
        cropMapper.deleteCrop(cropType, cropVariant, cropStatus);
    }
}
