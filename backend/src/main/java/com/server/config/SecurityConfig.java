package com.server.config;

import java.util.List;

import javax.sql.DataSource;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import com.server.util.JwksUtils;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

	private RSAKey rsaKey;

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(12);
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
		return authConfig.getAuthenticationManager();
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		return http
				.cors(Customizer.withDefaults())
				.csrf(AbstractHttpConfigurer::disable)
				.authorizeHttpRequests(auth -> auth
						.requestMatchers("/api/v1").permitAll()
						.requestMatchers("/api/v1/auth/**").permitAll()
						.requestMatchers(HttpMethod.GET,"/api/v1/**").permitAll()
						.anyRequest().authenticated()
				)
				.oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt)
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.exceptionHandling(exceptions -> exceptions
						.authenticationEntryPoint((request, response, authException) -> {
							response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
						})
				)
				.build();
	}

	@Bean
	public DaoAuthenticationProvider authenticationProvider(DataSource dataSource, BCryptPasswordEncoder passwordEncoder) {
		JdbcUserDetailsManager userDetailsManager = new JdbcUserDetailsManager(dataSource);
		userDetailsManager.setUsersByUsernameQuery("SELECT username, password, enabled FROM users WHERE username = ?");
		userDetailsManager.setAuthoritiesByUsernameQuery("SELECT username, role FROM users WHERE username = ?");

		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		authProvider.setUserDetailsService(userDetailsManager);
		authProvider.setPasswordEncoder(passwordEncoder);
		return authProvider;
	}

	@Bean
	public JWKSource<SecurityContext> jwkSource() {
		rsaKey = JwksUtils.generateRsaKey();
		JWKSet jwkSet = new JWKSet(rsaKey);
		return (jwkSelector, securityContext) -> jwkSelector.select(jwkSet);
	}

	@Bean
	JwtDecoder jwtDecoder() throws JOSEException {
		return NimbusJwtDecoder.withPublicKey(rsaKey.toRSAPublicKey()).build();
	}

	@Bean
	JwtEncoder jwtEncoder(JWKSource<SecurityContext> jwks) {
		return new NimbusJwtEncoder(jwks);
	}

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000",
				"https://farm-management-system-eight.vercel.app"));
        configuration.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization","Content-Type"));
		configuration.setAllowCredentials(true);
		
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**",configuration);
        return source;
    }
}
