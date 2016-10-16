package com.example.domain;

/**
 * Created by dm on 08.09.2016.
 */
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
public class Aquarium {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;
    private String description;

    @OneToMany(mappedBy = "fishTank", cascade = CascadeType.ALL)
    private List<Fish> aquariumFishes;

    @ManyToOne
    private User user;

    public long getId() {
        return id;
    }

    public List<Fish> getAquariumFishes() {
        return aquariumFishes;
    }
    public void setAquariumFishes(List<Fish> aquariumFishes) {this.aquariumFishes.addAll(aquariumFishes);}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
