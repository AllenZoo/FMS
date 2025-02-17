package com.server.service.interfaces;

import org.springframework.security.core.Authentication;

public interface ITokenService {
    public String generateToken(Authentication authentication);
}
