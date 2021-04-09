package pl.edu.agh.springapp.data.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OfferConditions {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "teacher_offerConditions",
            joinColumns = @JoinColumn(name = "teacher_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "offerConditions_id",
                    referencedColumnName = "id"))
    private List<Teacher> teachers = new ArrayList<>();

    @OneToOne
    @JoinColumn(name="offer_id")
    private Offer offer;

    @OneToMany(mappedBy = "offerConditions")
    private List<TimeBlock> timeBlocks = new ArrayList<>();
}
