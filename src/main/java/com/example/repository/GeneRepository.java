package com.example.repository;

import com.example.domain.GenType;
import com.example.domain.Gene;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;

/**
 * Created by dm on 08.09.2016.
 */
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
@RepositoryRestResource(collectionResourceRel = "genes", path = "genes")
public interface GeneRepository extends CrudRepository<Gene, Long> {
    @PreAuthorize("hasAuthority('ROLE_USER')")
    Gene findByGeneTypes(@Param("GeneTypes") GenType type);

    @PreAuthorize("hasAuthority('ROLE_USER')")
    @Override
    Gene findOne(Long id);
    @PreAuthorize("hasAuthority('ROLE_USER')")
    @Override
    Iterable<Gene> findAll();
    @PreAuthorize("hasAuthority('ROLE_USER')")
    @Override
    Iterable<Gene> findAll(Iterable<Long> ids);

}
