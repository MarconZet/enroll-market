package pl.edu.agh.springapp.data.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Offer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name="student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name="course_id")
    private Course givenCourse;

    @OneToOne(
            orphanRemoval = true,
            cascade = {CascadeType.MERGE, CascadeType.PERSIST }
            )
    @JoinColumn(name = "offerConditions_id", referencedColumnName = "id")
    private OfferConditions offerConditions;
}
