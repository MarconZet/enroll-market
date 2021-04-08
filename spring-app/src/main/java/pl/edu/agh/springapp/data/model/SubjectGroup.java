package pl.edu.agh.springapp.data.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubjectGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private SubjectType type;
    private LocalTime startTime;
    private DayOfWeek day;

    @ManyToOne
    @JoinColumn(name="teacher_id")
    private Teacher teacher;
}
