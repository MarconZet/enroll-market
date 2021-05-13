package pl.edu.agh.springapp.repository.specification;

import org.springframework.data.jpa.domain.Specification;
import pl.edu.agh.springapp.data.model.CourseType;
import pl.edu.agh.springapp.data.model.DayOfWeek;
import pl.edu.agh.springapp.data.model.Offer;
import pl.edu.agh.springapp.repository.specification.searchCriteria.SearchOperation;

import java.beans.Expression;

public class OfferSpecifications {

    public static Specification<Offer> isOneToOne(Boolean isOneToOne) {
        return (root, query, builder) -> builder.equal(root.get("isOneToOne"), isOneToOne);
    }

    public static Specification<Offer> studentIndexDoesNotEqual(String index) {
        return (root, query, builder) -> builder.notEqual(root.get("student").get("indexNumber"), index);
    }

    public static Specification<Offer> compareGivenCourseDayOfWeek(DayOfWeek day, SearchOperation operation) {
        return (root, query, builder) ->  {
            if (operation == SearchOperation.EQUALITY) {
                return builder.equal(root.get("givenCourse").get("day"), day);
            } else {
                return builder.notEqual(root.get("givenCourse").get("day"), day);
            }
        };
    }

    public static Specification<Offer> compareGivenCourseType(CourseType type, SearchOperation operation) {
        return (root, query, builder) ->  {
            if (operation == SearchOperation.EQUALITY) {
                return builder.equal(root.get("givenCourse").get("type"), type);
            } else {
                return builder.notEqual(root.get("givenCourse").get("type"), type);
            }
        };
    }

    public static Specification<Offer> compareGivenCourseTeacherId(Long id, SearchOperation operation) {
        return (root, query, builder) ->  {
            if (operation == SearchOperation.EQUALITY) {
                return builder.equal(root.get("givenCourse").get("teacher").get("id"), id);
            } else {
                return builder.notEqual(root.get("givenCourse").get("teacher").get("id"), id);
            }
        };
    }

    public static Specification<Offer> compareGivenCourseSubjectId(Long id, SearchOperation operation) {
        return (root, query, builder) ->  {
            if (operation == SearchOperation.EQUALITY) {
                return builder.equal(root.get("givenCourse").get("subject").get("id"), id);
            } else {
                return builder.notEqual(root.get("givenCourse").get("subject").get("id"), id);
            }
        };
    }
}
