package com.server.controller;

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

import com.server.bean.RestResult;
import com.server.config.SecurityConfig;
import com.server.dto.CropDto;
import com.server.enums.CropStatus;
import com.server.enums.CropType;
import com.server.enums.CropVariant;
import com.server.model.crop.CropsFilterModel;
import com.server.service.classes.TokenService;
import com.server.service.interfaces.ICropService;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.BDDMockito.given;

@WebMvcTest(CropController.class)
@Import({SecurityConfig.class, TokenService.class})
public class CropControllerTest {

    @MockBean
    private ICropService cropService;

    @InjectMocks
    private CropController cropController;

    @Autowired
    private MockMvc mockMvc;
    
    String token;
    CropDto crop1, crop2, crop3;
    List<CropDto> crops;

    @BeforeEach
    @Description("setup for every test")
    public void setup() throws Exception {
        crop1 = new CropDto(CropType.CANOLA, CropVariant.HYBRIDS, CropStatus.PLANTED, 100);
        crop2 = new CropDto(CropType.WHEAT, CropVariant.POLLINATED, CropStatus.PLANTED, 40);
        crop3 = new CropDto(CropType.COCONUT, CropVariant.HYBRIDS, CropStatus.HARVESTED, 10);
        crops = Arrays.asList(crop1, crop2, crop3);

        String loginRes = mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/auth/login")
                                                .content("{\"username\":\"guest\",\"password\":\"guest\"}")
                                                .contentType(MediaType.APPLICATION_JSON))
                        .andExpect(MockMvcResultMatchers.status().isOk())
                        .andReturn().getResponse().getContentAsString();
        RestResult<String> loginResObj = RestResult.parse(loginRes);
        token = loginResObj.getData();
    }

    @Test
    @Description("test for GET /api/v1/crops")
    public void testGetAllCrops() throws Exception {
        given(cropService.getCrops()).willReturn(crops);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/crops")
                                .header("Authorization", "Bearer " + token)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status()
                        .isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.length()")
                        .value(3))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[0].crop_type")
                        .value("CANOLA"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[0].quantity")
                        .value(100))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[1].crop_variant")
                        .value("POLLINATED"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[1].quantity")
                        .value(40))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[2].crop_type")
                        .value("COCONUT"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[2].crop_status")
                        .value("HARVESTED"));
    }

    @Test
    @Description("test for GET /api/v1/crops/filtered?cropType=CANOLA")
    public void testGetFilteredCropsByCropType() throws Exception {
        Map<String, String> filterCanola = Map.of("cropType", "CANOLA");
        CropsFilterModel cropsFilterCanolaModel = new CropsFilterModel(filterCanola);
        List<CropDto> cropsCanola = Arrays.asList(crop1);

        given(cropService.getCropsFiltered(cropsFilterCanolaModel)).willReturn(cropsCanola);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/crops/filtered?cropType=CANOLA")
                                .header("Authorization", "Bearer " + token)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status()
                        .isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.length()")
                        .value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[0].crop_type")
                        .value("CANOLA"));
    }

    @Test
    @Description("test for GET /api/v1/crops/filtered?cropVariant=HYBRIDS")
    public void testGetFilteredCropsByCropVariant() throws Exception {
        Map<String, String> filterHybrids = Map.of("cropVariant", "HYBRIDS");
        CropsFilterModel cropsFilterHybridsModel = new CropsFilterModel(filterHybrids);
        List<CropDto> cropsHybrids = Arrays.asList(crop1, crop3);

        given(cropService.getCropsFiltered(cropsFilterHybridsModel)).willReturn(cropsHybrids);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/crops/filtered?cropVariant=HYBRIDS")
                                .header("Authorization", "Bearer " + token)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status()
                        .isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.length()")
                        .value(2))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[0].crop_type")
                        .value("CANOLA"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[1].crop_type")
                        .value("COCONUT"));
    }

    @Test
    @Description("test for GET /api/v1/crops/filtered?cropVariant=HYBRIDS")
    public void testGetFilteredCropsByCropStatus() throws Exception {
        Map<String, String> filterHarvested = Map.of("cropStatus", "HARVESTED");
        CropsFilterModel cropsFilterHarvestedModel = new CropsFilterModel(filterHarvested);
        List<CropDto> cropsHarvested = Arrays.asList(crop1, crop3);

        given(cropService.getCropsFiltered(cropsFilterHarvestedModel)).willReturn(cropsHarvested);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/crops/filtered?cropStatus=HARVESTED")
                                .header("Authorization", "Bearer " + token)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status()
                        .isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.length()")
                        .value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[0].crop_type")
                        .value("COCONUT"));
    }

    @Test
    @Description("test for GET /api/v1/crops/filtered?minQuantity=30")
    public void testGetFilteredCropsByMinQuantity() throws Exception {
        Map<String, String> filterMinQuantity = Map.of("minQuantity", "30");
        CropsFilterModel cropsFilterMinQuantityModel = new CropsFilterModel(filterMinQuantity);
        List<CropDto> cropsMinQuantity = Arrays.asList(crop1, crop2);

        given(cropService.getCropsFiltered(cropsFilterMinQuantityModel)).willReturn(cropsMinQuantity);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/crops/filtered?minQuantity=30")
                                .header("Authorization", "Bearer " + token)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status()
                        .isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.length()")
                        .value(2))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[0].crop_type")
                        .value("CANOLA"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[1].crop_type")
                        .value("WHEAT"));
    }

    @Test
    @Description("test for GET /api/v1/crops/filtered?maxQuantity=40")
    public void testGetFilteredCropsByMaxQuantity() throws Exception {
        Map<String, String> filterMaxQuantity = Map.of("maxQuantity", "40");
        CropsFilterModel cropsFilterMaxQuantityModel = new CropsFilterModel(filterMaxQuantity);
        List<CropDto> cropsMaxQuantity = Arrays.asList(crop2, crop3);

        given(cropService.getCropsFiltered(cropsFilterMaxQuantityModel)).willReturn(cropsMaxQuantity);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/crops/filtered?maxQuantity=40")
                                .header("Authorization", "Bearer " + token)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status()
                        .isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.length()")
                        .value(2))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[0].crop_type")
                        .value("WHEAT"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[1].crop_type")
                        .value("COCONUT"));
    }

    @Test
    @Description("test for GET /api/v1/crops/{cropType}/{cropVariant}/{cropStatus}")
    // TODO: add tests
    public void testGetCropsByParams() throws Exception {
        fail();
    }

    @Test
    @Description("test for POST /api/v1/crops")
    public void testPostCrop() throws Exception {
        CropDto cropDto = new CropDto(CropType.CANOLA, CropVariant.HYBRIDS, CropStatus.PLANTED, 100);
        String requestBodyJson = "{\"crop_type\":\"CANOLA\",\"crop_variant\":\"HYBRIDS\",\"crop_status\":\"PLANTED\",\"quantity\":100}";

        given(cropService.insertCrop(cropDto)).willReturn(cropDto);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/crops")
                                .header("Authorization", "Bearer " + token)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(requestBodyJson))
                .andExpect(MockMvcResultMatchers.status()
                        .isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.crop_type")
                        .value("CANOLA"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.crop_variant")
                        .value("HYBRIDS"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.crop_status")
                        .value("PLANTED"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.quantity")
                        .value(100));
    }

    @Test
    @Description("test for PUT /api/v1/crops/{cropType}/{cropVariant}/{cropStatus}")
    // TODO: add tests
    public void testUpdateCrop() throws Exception {
        fail();
    }

    @Test
    @Description("test for DELETE /api/v1/crops/{cropType}/{cropVariant}/{cropStatus}")
    // TODO: add tests
    public void testDeleteCrop() throws Exception {
        fail();
    }
}
