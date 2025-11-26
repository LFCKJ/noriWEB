//USER DB 데이터 넣는 곳 

package com.example.nori.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
//==========DB테이블 값 넣기 =========//
@Entity
@Getter @Setter
@Table(name = "user") //DB 테이블 이름이 'user'임을 명시
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id") // DB의 'user_id' 컬럼과 연결
    private Long id;

    private String name;
}