// src/main/java/com/example/nori/service/CustomOAuth2UserService.java

package com.example.nori.service;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    // 현재는 더미 데이터 확인이 목적이므로 UserRepository 주입은 생략합니다.

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        
        // 1. 기본 OAuth2UserService 객체를 사용하여 사용자 정보(OAuth2User)를 가져옵니다.
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        // 2. 서비스 식별 및 전체 Attribute(원시 데이터) 가져오기
        String registrationId = userRequest.getClientRegistration().getRegistrationId(); 
        Map<String, Object> attributes = oAuth2User.getAttributes();
        
        
        // 3. 카카오 데이터 파싱 및 콘솔 출력 (더미 데이터 확인!)
        
        
        if ("kakao".equals(registrationId)) {
            
            String providerId = String.valueOf(attributes.get("id")); // 카카오 고유 ID
            
            // 카카오 계정 정보 (kakao_account) 맵을 가져옵니다.
            Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
            
            String nickname = null;
            String email = null;

            if (kakaoAccount != null) {
                // 프로필 정보 (profile) 맵을 가져와 닉네임을 추출합니다.
                Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");
                if (profile != null) {
                    nickname = (String) profile.get("nickname");
                    email = (String) profile.get("email");
                }
            }
            //=======터미널 출력=======//
            System.out.println("=====================================================");
            System.out.println("✅ 카카오 소셜 로그인 성공! (더미 데이터 확인)");
            System.out.println("서비스: " + registrationId);
            System.out.println("카카오 고유 ID (providerId): " + providerId);
            System.out.println("닉네임: " + nickname);
            System.out.println("이메일: " + email);
            System.out.println("=====================================================");
            System.out.println("🔥 전체 Attributes (Raw Data): " + attributes); 
            System.out.println("=====================================================");
        }else if("naver".equals(registrationId)){
            Map<String, Object> response = (Map<String, Object>) attributes.get("response");
            String providerId = (String) response.get("id");
            String nickname = (String) response.get("nickname");
            String email = (String) response.get("email");

            //=======터미널 출력=======//
            System.out.println("=====================================================");
            System.out.println("✅ 네이버 소셜 로그인 성공! (더미 데이터 확인)");
            System.out.println("서비스: " + registrationId);
            System.out.println("네이버 고유 ID (providerId): " + providerId);
            System.out.println("닉네임: " + nickname);
            System.out.println("이메일: " + email);
            System.out.println("=====================================================");
            System.out.println("🔥 전체 Attributes (Raw Data): " + attributes); 
            System.out.println("=====================================================");
        }else if("google".equals(registrationId)){
            String providerId = (String) attributes.get("sub");
            String nickname = (String) attributes.get("name");
            String email = (String) attributes.get("email");

            //=======터미널 출력=======//
            System.out.println("=====================================================");
            System.out.println("✅ 구글 소셜 로그인 성공! (더미 데이터 확인)");
            System.out.println("서비스: " + registrationId);
            System.out.println("구글 고유 ID (providerId): " + providerId);
            System.out.println("닉네임: " + nickname);
            System.out.println("이메일: " + email);
            System.out.println("=====================================================");
            System.out.println("🔥 전체 Attributes (Raw Data): " + attributes); 
            System.out.println("=====================================================");
        }

        // 4. Spring Security에 OAuth2User 객체 반환
        return oAuth2User; 
    }
}