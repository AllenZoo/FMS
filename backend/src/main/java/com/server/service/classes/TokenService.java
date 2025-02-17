package com.server.service.classes;

import com.server.service.BaseService;
import com.server.service.interfaces.ITokenService;

import lombok.AllArgsConstructor;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class TokenService extends BaseService implements ITokenService {

    private final JwtEncoder encoder;

    /**
     * Generates a JWT token for the given authentication.
     * The token will expire in 15 minutes.
     */
    @Override
    public String generateToken(Authentication authentication) {
        Instant now = Instant.now();
        String scope = authentication.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.joining(" "));
        JwtClaimsSet claims = JwtClaimsSet.builder()
            .issuer("self")
            .issuedAt(now)
            .expiresAt(now.plus(15, ChronoUnit.MINUTES))
            .subject(authentication.getName())
            .claim("scope", scope)
            .build();
        
        return this.encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }
}
