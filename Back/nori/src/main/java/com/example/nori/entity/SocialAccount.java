//social 로그인 정보 DB

package com.example.nori.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class SocialAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // social_id (PK)
    @Enumerated(EnumType.STRING)
    private SocialProvider provider; // kakao, google, naver
    //// 예시 코드
//SocialAccount account = new SocialAccount();
// account.setProvider("kakao"); // 이제 이렇게 문자열로 안 넣습니다.
//account.setProvider(SocialProvider.KAKAO); // 이렇게

    private String providerId; // 소셜 쪽 식별자
    private String email;

    // 토큰 정보 TEXT나 길이를 길게 잡아주는 게 안전
    @Column(length = 2000) 
    private String accessToken;
    
    @Column(length = 2000)
    private String refreshToken;

    private LocalDateTime tokenExpiresAt;
    private LocalDateTime linkedAt;

    //  User 테이블과 연결하는 고리 
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id") // DB에 user_id라는 컬럼이 생기고, 이게 FK
    private User user;
}