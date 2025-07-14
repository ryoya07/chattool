package com.example.chatapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.config.Customizer;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    SecurityContextRepository securityContextRepository = new HttpSessionSecurityContextRepository();

    http
        .securityContext(context -> context
            .securityContextRepository(securityContextRepository)
        )
        .cors(Customizer.withDefaults())
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(authz -> authz
            .requestMatchers(
                "/login", "/login/me", "/logout", "/register",
                "/h2-console/**", "/ws/**"
            ).permitAll()
            .requestMatchers(HttpMethod.GET, "/chatrooms/**").authenticated()
            .requestMatchers(HttpMethod.GET, "/users").authenticated()
            .requestMatchers(HttpMethod.DELETE, "/users/**").authenticated()
            .requestMatchers(HttpMethod.PUT, "/users/**").authenticated()
            .anyRequest().authenticated()
        )
        .formLogin(form -> form.disable())
        .httpBasic(basic -> basic.disable())
        .logout(logout -> logout
            .logoutUrl("/logout")
            .logoutSuccessHandler((request, response, authentication) -> {
                response.setStatus(HttpServletResponse.SC_OK);
            })
            .permitAll()
        );

    http.headers(headers -> headers.frameOptions().disable());

    return http.build();
}

}
