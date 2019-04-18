package com.huanle;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.huanle.dao")
public class HuanleApplication {

    public static void main(String[] args) {
        SpringApplication.run(HuanleApplication.class, args);
    }

}
