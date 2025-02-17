package com.server.model.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;

@AllArgsConstructor
@Builder
@Getter
public class UserModel {
	private final int userID;
	private final String username;
	private final String password;
	private final String firstName;
	private final String lastName;
	private final int role;
	private final Timestamp lastLogin;
}
