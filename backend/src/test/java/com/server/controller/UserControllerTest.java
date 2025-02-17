package com.server.controller;

import com.server.bean.RestResult;
import com.server.config.SecurityConfig;
import com.server.dto.UserDto;
import com.server.service.classes.TokenService;
import com.server.service.interfaces.IUserService;
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

@WebMvcTest(UserController.class)
@Import({SecurityConfig.class, TokenService.class})
public class UserControllerTest {

    @MockBean
    private IUserService userService;

    @InjectMocks
    private UserController userController;

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
    @Description("test for GET /api/v1/user")
    public void testGetAllUser() throws Exception {
        UserDto user1 = new UserDto(1, "user1", "password1", "first1", "last1", 1, null);
        UserDto user2 = new UserDto(2, "user2", "password2", "first2", "last2", 3, null);
        List<UserDto> userList = Arrays.asList(user1, user2);

        given(userService.getUser()).willReturn(userList);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/user")
                                .header("Authorization", "Bearer " + token)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status()
                        .isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[0].user_id")
                        .value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[0].username")
                        .value("user1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[1].user_id")
                        .value(2))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[1].username")
                        .value("user2"));
    }

    @Test
    @Description("test for GET /api/v1/user/{userID}")
    public void testGetUserByID() throws Exception {
        int userID = 1;
        UserDto user = new UserDto(userID, "user", "pass", "first", "last", 1, null);

        given(userService.getUser(userID)).willReturn(user);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/user/" + userID)
                                .header("Authorization", "Bearer " + token)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status()
                        .isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.user_id")
                        .value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.username")
                        .value("user"));
    }

    @Test
    @Description("test for POST /api/v1/user")
    public void testInsertUser() throws Exception {
        UserDto user = new UserDto(1, "user", "pass", "first", "last", 1, null);
        String requestBodyJson = "{\"user_id\": 1, \"username\": \"user\", \"password\": \"pass\", " +
                "\"first_name\": \"first\", \"last_name\": \"last\", \"role\": 1, \"last_login\": null}";

        given(userService.insertUser(user)).willReturn(user);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/user")
                                .header("Authorization", "Bearer " + token)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(requestBodyJson))
                .andExpect(MockMvcResultMatchers.status()
                        .isOk());
    }

    @Test
    @Description("test for PUT /api/v1/user/{userID}")
    public void testUpdateUser() throws Exception {
        int userID = 1;
        UserDto user = new UserDto(userID, "user", "pass", "first", "last", 1, null);
        String requestBodyJson = "{\"user_id\": " + userID + ", \"username\": \"user\", \"password\": \"pass\"," +
                " \"first_name\": \"first\", \"last_name\": \"last\", \"role\": 1, \"last_login\": null }";

        given(userService.updateUser(user, userID)).willReturn(user);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/user/" + userID)
                                .header("Authorization", "Bearer " + token)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(requestBodyJson))
                .andExpect(MockMvcResultMatchers.status()
                        .isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.user_id")
                        .value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.username")
                        .value("user"));
    }

    @Test
    @Description("test for DELETE /api/v1/user/{userID}")
    public void testDeleteUser() throws Exception {
        int userID = 1;

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/v1/user/" + userID)
                                .header("Authorization", "Bearer " + token))
                .andExpect(MockMvcResultMatchers.status()
                        .isOk());
    }
}
