package com.example;

import com.example.domain.GenType;
import com.example.domain.Gene;
import com.example.domain.User;
import com.example.repository.GeneRepository;
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
    private final GeneRepository geneRepository;

    @Autowired
    public DatabaseLoader(UserRepository userRepository, GeneRepository geneRepository) {

        this.userRepository = userRepository;
        this.geneRepository = geneRepository;
    }

    @Override
    public void run(String... strings) throws Exception {
         /*   User test = new User();
            test.setLogin("testowy");
            test.setPassword("testowy");
            test.setRoles(new String []{"USER"});
            this.userRepository.save(test);*/
//        Gene gene = new Gene();
//        gene.setName("testowy");
//        gene.setDescription("testowyGen");
//        gene.setGeneTypes(GenType.Autosomal);
//        this.geneRepository.save(gene);
    }
}
