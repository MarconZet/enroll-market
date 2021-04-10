package pl.edu.agh.springapp.data.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "offerConditions")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OfferConditions {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToMany
    @JoinTable(name = "teacher_offerConditions",
            joinColumns = @JoinColumn(name = "offerConditions_id"),
            inverseJoinColumns = @JoinColumn(name = "teacher_id"))
    private List<Teacher> teachers = new ArrayList<>();

    @OneToOne(mappedBy = "offerConditions")
    private Offer offer;

    @OneToMany(mappedBy = "offerConditions", cascade = {CascadeType.MERGE, CascadeType.PERSIST }, orphanRemoval = true)
    private List<TimeBlock> timeBlocks = new ArrayList<>();
}
