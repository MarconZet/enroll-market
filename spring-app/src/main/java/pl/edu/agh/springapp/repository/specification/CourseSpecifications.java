package pl.edu.agh.springapp.repository.specification;

import org.springframework.data.jpa.domain.Specification;
import pl.edu.agh.springapp.data.model.Course;
import pl.edu.agh.springapp.data.model.CourseType;
import pl.edu.agh.springapp.data.model.DayOfWeek;
import pl.edu.agh.springapp.data.model.Subject;
import pl.edu.agh.springapp.repository.specification.searchCriteria.SearchOperation;

public class CourseSpecifications {

    public static Specification<Course> hasType(CourseType type) {
        return (root, query, builder) -> builder.equal(root.get("type"), type);
    }

    public static Specification<Course> hasSubject(Subject subject) {
        return ((root, query, builder) -> builder.equal(root.get("subject"), subject));
    }

    public static Specification<Course> idIsNotEqual(Long id) {
        return ((root, query, builder) -> builder.notEqual(root.get("id"), id));
    }
}
