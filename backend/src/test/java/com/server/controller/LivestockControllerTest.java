package com.server.controller;

import com.server.bean.RestResult;
import com.server.config.SecurityConfig;
import com.server.dto.LivestockDto;
import com.server.enums.AnimalType;
import com.server.enums.CropType;
import com.server.model.livestock.LivestockFilterModel;
import com.server.service.classes.TokenService;
import com.server.service.interfaces.ILivestockService;
import jdk.jfr.Description;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Arrays;
import java.util.List;

import static org.mockito.BDDMockito.given;

@WebMvcTest(LivestockController.class)
@Import({SecurityConfig.class, TokenService.class})
public class LivestockControllerTest {

    @MockBean
    private ILivestockService livestockService;

    @InjectMocks
    private LivestockController livestockController;

    @Autowired
    private MockMvc mockMvc;

    String token;

    @BeforeEach
    @Description("setup for every test")
    public void setup() throws Exception {
        String loginRes = mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/auth/login")
                                                .content("{\"username\":\"guest\",\"password\":\"guest\"}")
                                                .contentType(MediaType.APPLICATION_JSON))
                        .andExpect(MockMvcResultMatchers.status().isOk())
                        .andReturn().getResponse().getContentAsString();
        RestResult<String> loginResObj = RestResult.parse(loginRes);
        token = loginResObj.getData();
    }

    @Test
    @Description("test for GET /api/v1/livestock")
    public void testGetAllLivestock() throws Exception {
        LivestockDto livestock1 = new LivestockDto(1, AnimalType.COW, 5, CropType.WHEAT, 500.0, null, false, null);
        LivestockDto livestock2 = new LivestockDto(2, AnimalType.PIG, 3, CropType.CORN, 300.0, null, true, null);
        List<LivestockDto> livestockList = Arrays.asList(livestock1, livestock2);

        given(livestockService.getLivestock()).willReturn(livestockList);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/livestock")
                                .header("Authorization", "Bearer " + token)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status()
                        .isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[0].tag_id")
                        .value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[0].animal_type")
                        .value("COW"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[1].tag_id")
                        .value(2))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[1].animal_type")
                        .value("PIG"));
    }

    @Test
    @Description("test for GET /api/v1/livestock/filtered?")
    public void testGetFilteredLivestock() throws Exception {
        LivestockFilterModel livestockFilterModel = LivestockFilterModel.builder().maxAge(8).build();

        LivestockDto livestock1 = new LivestockDto(1, AnimalType.COW, 5, CropType.WHEAT, 500.0, null, false, null);
        LivestockDto livestock2 = new LivestockDto(2, AnimalType.PIG, 3, CropType.CORN, 300.0, null, true, null);
        List<LivestockDto> livestockList = Arrays.asList(livestock1, livestock2);

        given(livestockService.getLivestock(livestockFilterModel)).willReturn(livestockList);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/livestock/filtered?maxAge=8")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)).andExpect(MockMvcResultMatchers.status()
                        .isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[0].tag_id")
                        .value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[0].animal_type")
                        .value("COW"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[1].tag_id")
                        .value(2))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[1].animal_type")
                        .value("PIG"));
    }


    @Test
    @Description("test for GET /api/v1/livestock/count?")
    public void testGetFilteredLivestockCount() throws Exception {
        LivestockFilterModel livestockFilterModel = LivestockFilterModel.builder().maxAge(8).build();

        LivestockDto livestock1 = new LivestockDto(1, AnimalType.COW, 5, CropType.WHEAT, 500.0, null, false, null);
        LivestockDto livestock2 = new LivestockDto(2, AnimalType.PIG, 3, CropType.CORN, 300.0, null, true, null);
        List<LivestockDto> livestockList = Arrays.asList(livestock1, livestock2);

        given(livestockService.getLivestock(livestockFilterModel)).willReturn(livestockList);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/livestock/filtered?maxAge=8")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)).andExpect(MockMvcResultMatchers.status()
                        .isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.count")
                        .value(2));
    }

    @Test
    @Description("test for GET /api/v1/livestock/{tagID}")
    public void testGetLivestockByID() throws Exception {
        int tagID = 1;
        LivestockDto livestock = new LivestockDto(tagID, AnimalType.COW, 5, CropType.WHEAT, 500.0, null, false, null);

        given(livestockService.getLivestock(tagID)).willReturn(livestock);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/livestock/" + tagID)
                                .header("Authorization", "Bearer " + token)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status()
                        .isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.tag_id")
                        .value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.animal_type")
                        .value("COW"));
    }

    @Test
    @Description("test for POST /api/v1/livestock")
    public void testInsertLivestock() throws Exception {
        LivestockDto livestockDto = new LivestockDto(1, AnimalType.COW, 5, CropType.WHEAT, 500.0, null, false, null);
        String requestBodyJson = "{\"tag_id\": 1, \"animal_type\": \"COW\", \"age\": 5, \"diet\": \"WHEAT\", " +
                "\"weight\": 500.0," +
                " \"last_fed\": null, \"harvestable\": false, \"last_violated_for_harvested_goods\": null}";

        given(livestockService.insertLivestock(livestockDto)).willReturn(livestockDto);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/livestock")
                                .header("Authorization", "Bearer " + token)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(requestBodyJson))
                .andExpect(MockMvcResultMatchers.status()
                        .isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.tag_id")
                        .value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.animal_type")
                        .value("COW"));
    }

    @Test
    @Description("test for PUT /api/v1/livestock/{tagID}")
    public void testUpdateLivestock() throws Exception {
        int tagID = 1;
        LivestockDto livestockDto = new LivestockDto(tagID, AnimalType.COW, 5, CropType.WHEAT, 500.0, null, false, null);
        String requestBodyJson = "{\"tag_id\": "+ tagID + ", \"animal_type\": \"COW\", \"age\": 5, \"diet\": " +
                "\"WHEAT\", " +
                "\"weight\": 500.0," +
                " \"last_fed\": null, \"harvestable\": false, \"last_violated_for_harvested_goods\": null}";

        given(livestockService.updateLivestock(livestockDto, tagID)).willReturn(livestockDto);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/livestock/" + tagID)
                                .header("Authorization", "Bearer " + token)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(requestBodyJson))
                .andExpect(MockMvcResultMatchers.status()
                        .isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.tag_id")
                        .value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.animal_type")
                        .value("COW"));
    }

    @Test
    @Description("test for DELETE /api/v1/livestock/{tagID}")
    public void testDeleteLivestock() throws Exception {
        int tagID = 1;

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/v1/livestock/" + tagID)
                                .header("Authorization", "Bearer " + token))
                .andExpect(MockMvcResultMatchers.status()
                        .isOk());
    }
}
