//서버 요청 완료 시 반환되는 값(브라우저 localhost:8080/환경)

package com.example.nori;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class UserController {

    @GetMapping("/")
    public String home() {
        return "Server OK";
    }
}





