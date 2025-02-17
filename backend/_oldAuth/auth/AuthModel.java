package com.server.model.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Builder
@Getter
public class AuthModel {
	private final int userID;
	private final String username;
	private final String accessToken;
	private final String refreshToken;
}
