package com.example.nori;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class UserController {
    @GetMapping("/USER")
    public String getMethodName(@RequestParam(value = "param", required = false, defaultValue = "World") String param) {
        return "HELLO, " + param + "! 서버 연결 성공";
    }
    
}
