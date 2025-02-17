package com.server.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.server.bean.RestResult;
import com.server.config.SecurityConfig;
import com.server.service.classes.TokenService;

import jdk.jfr.Description;

@WebMvcTest({AuthController.class, AuthControllerTest.class})
@Import({SecurityConfig.class, TokenService.class})
public class AuthControllerTest {

  	@Autowired
	private MockMvc mockMvc;

	@Test
	@Description("test if /api/v1 is inaccessible w/o auth")
	public void testUnauthorizedRoute() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/user"))
				.andExpect(MockMvcResultMatchers.status().isUnauthorized());
	}

	@Test
	@Description("test login with correct credentials")
	public void testAuthorized() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/auth/login")
						.content("{\"username\":\"guest\",\"password\":\"guest\"}")
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.status().isOk());
	}

	@Test
	@Description("test if /api/v1 is inaccessible w/o auth")
	public void testAuthorizedRoute() throws Exception {
		String loginRes = mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/auth/login")
										.content("{\"username\":\"guest\",\"password\":\"guest\"}")
										.contentType("application/json"))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andReturn().getResponse().getContentAsString();
		RestResult<String> loginResObj = RestResult.parse(loginRes);

		mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/user")
										.header("Authorization", "Bearer " + loginResObj.getData()))
				.andExpect(MockMvcResultMatchers.status().isOk());
	}
}
