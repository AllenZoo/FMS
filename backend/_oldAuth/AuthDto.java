package com.server.dto;

import com.google.gson.annotations.SerializedName;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Builder
@Getter
public class AuthDto {
    @SerializedName("user_id")
    private final int userID;
    @SerializedName("username")
    private final String username;
    @SerializedName("accessToken")
    private final String accessToken;
    @SerializedName("refreshToken")
    private final String refreshToken;
}
