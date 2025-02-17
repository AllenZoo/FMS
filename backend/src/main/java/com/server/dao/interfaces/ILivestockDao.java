package com.server.dao.interfaces;

import com.server.model.livestock.LivestockFilterModel;
import com.server.model.livestock.LivestockModel;

import java.util.List;

public interface ILivestockDao {
    public List<LivestockModel> getLivestock();
    public List<LivestockModel> getLivestock(LivestockFilterModel livestockFilterModel);
    public LivestockModel getLivestock(int tagID);
    public void insertLivestock(LivestockModel livestockModel);
    public void updateLivestock(LivestockModel livestockModel, int tagID);
    public void deleteLivestock(int tagID);
}
