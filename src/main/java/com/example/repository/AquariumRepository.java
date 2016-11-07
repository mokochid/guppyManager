package com.example.repository;

/**
 * Created by dm on 08.09.2016.
 */
import java.util.List;

import com.example.domain.Aquarium;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PostFilter;
import org.springframework.security.access.prepost.PreAuthorize;

//@PreAuthorize("hasRole('USER')")

@RepositoryRestResource(collectionResourceRel = "aquariums", path = "aquariums")
public interface AquariumRepository extends PagingAndSortingRepository<Aquarium, Long> {
    @PostFilter("filterObject.getUser()!=null && filterObject.getUser().getLogin() == authentication.name")
//    @PostFilter("filterObject.getId() == 8")
    @Override
    Iterable<Aquarium> findAll();

}
