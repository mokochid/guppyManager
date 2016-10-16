package com.example.domain;



import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

/**
 * Created by dm on 08.09.2016.
 */

@Entity
public class User {
    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String password;

    private String[] roles;

    private String login;
    private String mail;
    private enum Country {
        Poland, Germany, Slovakia, Taiwan, China, Japan, USA
    }
    private String city;
    private Country userCountry;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Aquarium> aquariums;

    public String[] getRoles() {
        return roles;
    }

    public void setRoles(String[] roles) {
        this.roles = roles;
    }

    public String getPassword() {return password;}
    public void setPassword(String password) {
        this.password = PASSWORD_ENCODER.encode(password);
    }

    public String getLogin() {return login;}
    public void setLogin(String login) {this.login = login;}

    public String getMail() {return mail;}
    public void setMail(String mail) {this.mail = mail;}

    public String getCity() {return city;}
    public void setCity(String city) {this.city = city;}

    public List<Aquarium> getAquariums() {return aquariums;}
    public void setAquariums(List<Aquarium> aquariums) {this.aquariums.addAll(aquariums);}

    public Country getCountry() {return userCountry;}
    public void setCountry(Country country) {userCountry = country;}
}
