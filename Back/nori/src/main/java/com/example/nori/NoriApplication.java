//서버 연결 및 연결 할 때 마다 데이터 넣기 

package com.example.nori;

import com.example.nori.entity.User;
import com.example.nori.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

@SpringBootApplication
public class NoriApplication {

    private static final Logger log = LoggerFactory.getLogger(NoriApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(NoriApplication.class, args);
    }

    // 로컬에서만 더미 데이터 삽입
    @Bean
    @Profile("local")
    public CommandLineRunner dataLoader(UserRepository userRepository) {
        return args -> {
            User user = new User();
            user.setName("Local User");
            userRepository.save(user);
            log.info("Dummy data saved! ID = {}", user.getId());
        };
    }
}
