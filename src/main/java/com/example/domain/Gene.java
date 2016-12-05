package com.example.domain;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by dm on 08.09.2016.
 */
@Entity
public class Gene {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @ManyToMany(mappedBy = "genes", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Fish> fishes = new ArrayList<>();

    private String name;
    private String description;

    public String getName() {return name;}
    public void setName(String name) {this.name = name;}

    public String getDescription() {return description;}
    public void setDescription(String description) {this.description = description;}

    public enum GenType {
        Xlinked, Ylinked, Autosomal
    }
    private GenType geneTypes;

    public GenType getGeneTypes() {
        return geneTypes;
    }

    public void setGeneTypes(GenType geneTypes) {
        geneTypes = geneTypes;
    }

    public List<Fish> getFishes() {return fishes;}
    public void setFishes(List<Fish> fishes) {this.fishes.addAll(fishes);}
}
