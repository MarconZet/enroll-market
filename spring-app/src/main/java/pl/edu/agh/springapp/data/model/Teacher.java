package pl.edu.agh.springapp.data.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private String surname;
    private String emailAddress;

    @OneToMany(mappedBy = "teacher")
    private List<Course> courses = new ArrayList<>();

    @ManyToMany(mappedBy = "teachers")
    private List<OfferConditions> offerConditions = new ArrayList<>();
}
