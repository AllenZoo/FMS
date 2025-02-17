package com.server.controller;

import com.server.bean.RestResult;
import com.server.dto.AuthDto;
import com.server.service.interfaces.IAuthService;
import com.server.util.JwtUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(value = "/api/v1/auth")
public class AuthController extends BaseController {

    @Autowired
    private IAuthService service;

    /**
     * Handles Login Requests
     * @return access token
     * <p>
     * POST /api/v1/auth/login
     */
    @PostMapping(value = "/login")
    public RestResult<AuthDto> login(@RequestBody Map<String, Object> body) {
        String username = body.get("username").toString();
        String password = body.get("password").toString();
        AuthDto res = service.login(username, password);
        return RestResult.success(res);
    }

    /**
     * Handles Logout Requests
     * <p>
     * POST /api/v1/auth/logout
     */
    @PostMapping(value = "/logout")
    public RestResult<AuthDto> logout() {
        AuthDto res = service.logout();
        return RestResult.success(res);
    }

    /**
     * Handles Refresh Token Requests
     * @return new access token
     * <p>
     * POST /api/v1/auth/refreshToken
     * 
     * TODO: implement this
     */
    @PostMapping(value = "/refreshToken")
    public RestResult<AuthDto> refreshToken(@RequestBody Map<String, Object> body) {
        return null;
    }

    /**
     * Tests if token is valid
     * <p>
     * POST /api/v1/auth/testToken
     */
    @PostMapping(value = "/testToken")
    public RestResult<String> getUserById(@RequestBody Map<String, Object> body) {
        String token = body.get("token").toString();

        if (!JwtUtils.validateToken(token)) {
            return RestResult.fail("err", "invalid credentials");
        }

        return RestResult.success("ok");
    }
}
