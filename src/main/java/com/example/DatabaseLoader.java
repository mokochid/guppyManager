package com.example;

import com.example.domain.User;
import com.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * Created by Daniel on 2016-10-14.
 */
@Component
public class DatabaseLoader implements CommandLineRunner {

    private final UserRepository userRepository;

    @Autowired
    public DatabaseLoader(UserRepository userRepository) {

        this.userRepository = userRepository;
    }

    @Override
    public void run(String... strings) throws Exception {
        /*    User test = new User();
            test.setLogin("daniel");
            test.setPassword("daniel");
            test.setRoles(new String []{"ADMIN", "USER"});
            this.userRepository.save(test);*/

    }
}
