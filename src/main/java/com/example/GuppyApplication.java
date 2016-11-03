package com.example;

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

import java.security.Principal;

@SpringBootApplication
@RestController
public class GuppyApplication {
    @Autowired
    UserRepository userRepository;

    /*@RequestMapping("/api")
    public Map<String,Object> home() {
        Map<String,Object> model = new HashMap<String,Object>();
        model.put("id", UUID.randomUUID().toString());
        model.put("content", "Hello World");
        return model;
    }*/
    @RequestMapping("/user")
    /*public User user(Principal user) {
        return userRepository.findByLogin("daniel");
	}*/
    public Principal user(Principal user) {
        System.out.println(user.getName());
        return user;
    }

    public static void main(String[] args) {

        SpringApplication.run(GuppyApplication.class, args);
    }

    @Configuration
    @Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
    protected static class SecurityConfiguration extends WebSecurityConfigurerAdapter {
        @Autowired
        private SpringDataJpaUserDetailsService userDetailsService;

        @Override
        protected void configure(AuthenticationManagerBuilder auth) throws Exception {
            auth
                    .userDetailsService(this.userDetailsService)
                    .passwordEncoder(User.PASSWORD_ENCODER);
        }

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http
                    .httpBasic()
                    .and()
                    .authorizeRequests().antMatchers("/api/**").authenticated()
                    .antMatchers("/user").authenticated().and()
                    .addFilterAfter(new CsrfHeaderFilter(), CsrfFilter.class)
                    .csrf().csrfTokenRepository(csrfTokenRepository());
        }
    }

    private static CsrfTokenRepository csrfTokenRepository() {
        HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
        repository.setHeaderName("X-XSRF-TOKEN");
        return repository;
    }

    ;
////					.httpBasic()
////					.and()
//					.authorizeRequests()
//					.antMatchers("/index.html", "/home.html", "/views/userLogin.html", "/main.html", "/", "/userlogin", "/#/userlogin").permitAll()
////					.antMatchers("/resources/**").permitAll()
//					.anyRequest().authenticated().and()
////					.formLogin()
////					.loginPage("/").permitAll().and()
//					.csrf()
//						.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
//		}
//	}
}
