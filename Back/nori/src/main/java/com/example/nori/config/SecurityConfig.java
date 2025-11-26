// src/main/java/com/example/nori/config/SecurityConfig.java

package com.example.nori.config;

import com.example.nori.service.CustomOAuth2UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;

    public SecurityConfig(CustomOAuth2UserService customOAuth2UserService) {
        this.customOAuth2UserService = customOAuth2UserService;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // API 서버 환경에서 CSRF 비활성화 (필요에 따라 설정)
            
            // --- 인가 규칙 설정 ---
            .authorizeHttpRequests(authorize -> authorize
                // 루트와 정적 리소스는 인증 없이 접근 허용
                .requestMatchers("/", "/css/**", "/images/**", "/js/**").permitAll() 
                // 나머지 모든 요청은 인증된 사용자(로그인)만 허용
                .anyRequest().authenticated()
            )
            
            // --- OAuth 2.0 로그인 설정 ---
            .oauth2Login(oauth2 -> oauth2
                // 로그인 성공 시 기본 이동할 URL
                .defaultSuccessUrl("http://localhost:5173/personal", true) 
                
                // 로그인 후 사용자 정보를 처리할 커스텀 서비스 등록
                .userInfoEndpoint(userInfo -> userInfo
                    .userService(customOAuth2UserService) 
                )
            )
            
            // --- 로그아웃 설정 ---
            .logout(logout -> logout
                .logoutSuccessUrl("/") 
                .invalidateHttpSession(true)
            );
        
        return http.build();
    }
}