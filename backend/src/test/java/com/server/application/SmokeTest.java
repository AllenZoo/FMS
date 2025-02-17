package com.server.application;

import com.server.controller.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
class SmokeTest {

	@Autowired
	private AuthController authController;

	@Autowired
	private LivestockController livestockController;

	@Autowired
	private UserController userController;

	@Autowired
	private CropController cropController;

	@Test
	void contextLoads() {
		assertThat(authController).as("auth api controller").isNotNull();
		assertThat(livestockController).as("livestock api controller").isNotNull();
		assertThat(userController).as("user api controller").isNotNull();
		assertThat(cropController).as("crop api controller").isNotNull();
	}

}
