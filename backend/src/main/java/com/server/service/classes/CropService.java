package com.server.service.classes;

import com.server.dao.interfaces.ICropDao;
import com.server.dto.CropDto;
import com.server.enums.CropStatus;
import com.server.enums.CropType;
import com.server.enums.CropVariant;
import com.server.model.crop.CropModel;
import com.server.model.crop.CropsFilterModel;
import com.server.service.BaseService;
import com.server.service.interfaces.ICropService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CropService extends BaseService implements ICropService {

    @Autowired
    private ICropDao cropDao;

    @Override
    public List<CropDto> getCrops() {
        return toDto(cropDao.getCrops());
    }

    @Override
    public List<CropDto> getCropsFiltered(CropsFilterModel cropsFilterModel) {
        return toDto(cropDao.getCropsFiltered(cropsFilterModel));
    }

    @Override
    public CropDto getCropByKey(CropType cropType, CropVariant cropVariant, CropStatus cropStatus) {
        return toDto(cropDao.getCropByKey(cropType, cropVariant, cropStatus));
    }

    @Override
    public CropDto insertCrop(CropDto cropDto) {
         cropDao.insertCrop(toModel(cropDto));
         return getCropByKey(cropDto.getCropType(), cropDto.getCropVariant(), cropDto.getCropStatus());
    }

    @Override
    public CropDto updateCrop(CropDto cropDto, CropType cropType, CropVariant cropVariant, CropStatus cropStatus) {
        cropDao.updateCrop(toModel(cropDto), cropType, cropVariant, cropStatus);
        return getCropByKey(cropType, cropVariant, cropStatus);
    }

    @Override
    public CropDto deleteCrop(CropType cropType, CropVariant cropVariant, CropStatus cropStatus) {
        cropDao.deleteCrop(cropType, cropVariant, cropStatus);
        return null;
    }

    /**
     * Helper Functions :D
     */
    private CropDto toDto(CropModel cropModel) {
        return CropDto.builder()
                .cropType(cropModel.getCropType())
                .cropVariant(cropModel.getCropVariant())
                .cropStatus(cropModel.getCropStatus())
                .quantity(cropModel.getQuantity())
                .build();
    }
    private List<CropDto> toDto(List<CropModel> cropModels) {
        List<CropDto> cropDtos = new ArrayList<>();
        for (CropModel cropModel : cropModels) {
            cropDtos.add(toDto(cropModel));
        }
        return cropDtos;
    }
    private CropModel toModel(CropDto cropDto) {
        return CropModel.builder()
                .cropType(cropDto.getCropType())
                .cropVariant(cropDto.getCropVariant())
                .cropStatus(cropDto.getCropStatus())
                .quantity(cropDto.getQuantity())
                .build();
    }
    private List<CropModel> toModel(List<CropDto> cropDtos) {
        List<CropModel> cropModels = new ArrayList<>();
        for (CropDto cropDto : cropDtos) {
            cropModels.add(toModel(cropDto));
        }
        return cropModels;
    }

}
