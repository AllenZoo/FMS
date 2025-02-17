package com.server.controller;

import com.server.service.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.bean.RestResult;
import com.server.model.auth.LoginRequest;
import com.server.service.interfaces.ITokenService;

@RestController
@RequestMapping(value = "/api/v1/auth")
public class AuthController extends BaseController {

	private final AuthenticationManager authManager;

	@Autowired
	private ITokenService tokenService;

	public AuthController(AuthenticationManager authManager) {
		this.authManager = authManager;
	}

	/* -------------------------------------------------------------------------- */
	/*                                AUTH REQUESTS                               */
	/* -------------------------------------------------------------------------- */

	/**
	 * Handles Login Requests
	 * POST /api/v1/auth/login
	 */
	@Transactional
	@PostMapping(value = "/login")
	public RestResult<String> login(@RequestBody LoginRequest userLogin) {
		try {
			Authentication auth = authManager.authenticate(
					new UsernamePasswordAuthenticationToken(userLogin.username(), userLogin.password())
			);

			if (!auth.isAuthenticated()) {
				return RestResult.fail("Bad Login", "Bad Login", RestResult.Code.ERROR_UNAUTHORIZED);
			}

			String token = this.tokenService.generateToken(auth);
			return RestResult.success(token, RestResult.Code.SUCCESS_OK);
		} catch (BadCredentialsException e) {
			return
					RestResult.fail("", "Invalid username or password", RestResult.Code.ERROR_UNAUTHORIZED);
		} catch (AuthenticationException e) {
			return
					RestResult.fail("", "Authentication failed", RestResult.Code.ERROR_UNAUTHORIZED);
		} catch (Exception e) {
			return RestResult.fail("", "An unexpected error occurred", RestResult.Code.ERROR_INTERNAL_SERVER);
		}
	}

	/**
	 * Handles Logout Requests
	 * POST /api/v1/auth/logout
	 */
	@PostMapping(value = "/logout")
	public RestResult<String> logout() {
		return RestResult.success("Logout Successful", RestResult.Code.SUCCESS_OK);
	}

	/**
	 * Handles Refresh Token Requests
	 * POST /api/v1/auth/refresh
	 * TODO: Implement Refresh Token
	 */
	@PostMapping(value = "/refresh")
	public RestResult<String> refresh(Authentication authentication) {
		return RestResult.fail(null, "");
	}
}
