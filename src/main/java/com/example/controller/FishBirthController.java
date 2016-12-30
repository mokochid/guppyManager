package com.example.controller;

import com.example.domain.Aquarium;
import com.example.domain.Fish;
import com.example.domain.User;
import com.example.filter.CsrfHeaderFilter;
import com.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

@RestController
public class FishBirthController {
    @Autowired
    UserRepository userRepository;

    @RequestMapping("/api/fishBirths")
    public List<Fish> fishBirth(@RequestParam(value="user") String user) {
        List<Aquarium> aquariums = userRepository.findByLogin(user).getAquariums();
        List<Fish> fishes = new ArrayList<>();
        long currentDate = new Date().getTime();

        for (Aquarium aquarium: aquariums) {
            List<Fish> aquariumFishes = aquarium.getAquariumFishes();
            for (Fish fish: aquariumFishes) {
                if (fish.getFishBirth() != null) {
                    long diff = fish.getFishBirth().getTime() - currentDate;
                    if (TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS) < 3) {
                        fishes.add(fish);
                    }
                }
            }
        }
        return fishes;
    }
}
