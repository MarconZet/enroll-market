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
public class TimeBlock {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private LocalTime startTime;
    private LocalTime endTime;
    private DayOfWeek day;

    @ManyToOne
    @JoinColumn(name="offerConditions_id")
    private OfferConditions offerConditions;
}