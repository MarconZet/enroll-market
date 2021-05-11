package pl.edu.agh.springapp.repository.specification;

import org.springframework.data.jpa.domain.Specification;
import pl.edu.agh.springapp.data.model.DayOfWeek;
import pl.edu.agh.springapp.data.model.Offer;

public class OfferSpecifications {

    public static Specification<Offer> isOneToOne(Boolean isOneToOne) {
        return (root, query, builder) -> builder.equal(root.get("isOneToOne"), isOneToOne);
    }

    public static Specification<Offer> indexDoesNotEqual(String index) {
        return (root, query, builder) -> builder.notEqual(root.get("student").get("indexNumber"), index);
    }
}
