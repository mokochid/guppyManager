package com.example.repository;

import com.example.domain.Fish;
import com.example.domain.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PostFilter;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

/**
 * Created by dm on 08.09.2016.
 */
//@PreAuthorize("hasRole('USER')")
@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface UserRepository extends CrudRepository<User, Long> {
    User findByLogin(@Param("login") String login);
//    @PostFilter("filterObject.getLogin() == authentication.name")
}
