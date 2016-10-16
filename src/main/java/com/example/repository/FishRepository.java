package com.example.repository;

/**
 * Created by dm on 08.09.2016.
 */
import java.util.List;

import com.example.domain.Fish;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;

//@PreAuthorize("hasRole('USER')")
@RepositoryRestResource(collectionResourceRel = "fishes", path = "fishes")
public interface FishRepository extends CrudRepository<Fish, Long> {
    List<Fish> findByLastName(@Param("name") String name);
}
