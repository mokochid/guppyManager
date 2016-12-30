package com.example.domain;

/**
 * Created by dm on 08.09.2016.
 */

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import java.util.*;

@Entity
public class Fish {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String firstName;
    private String lastName;
    private Date fishBirth;

    @ManyToOne
    private Aquarium fishTank;


    //dopisać wszędzie takie settery z addall, zaprojektowac reszte
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "fish_gene",
            joinColumns = @JoinColumn(name = "fish_id"),
            inverseJoinColumns = @JoinColumn(name = "gene_id"))
    private Set<Gene> genes = new HashSet<>(50);

    public Set<Gene> getGenes() {return genes;}
    public void setGenes(Set<Gene> genes) {
        this.genes.addAll(genes);
    }

    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Aquarium getFishTank() {
        return fishTank;
    }
    public void setFishTank(Aquarium fishTank) {
        this.fishTank = fishTank;
    }

    public Date getFishBirth() {
        return fishBirth;
    }

    public void setFishBirth(Date fishBirth) {
        this.fishBirth = fishBirth;
    }
}
