package pl.edu.agh.springapp.repository.specification.searchCriteria;

import java.util.Optional;

public enum SearchCriterion {
    SUBJECT("subject"), COURSE_TYPE("courseType"), TEACHER("teacher"), DAY("day");

    private String name;

    SearchCriterion(String name) {
        this.name = name;
    }

    public static Optional<SearchCriterion> fromString(String value) {
        for (SearchCriterion criterion: SearchCriterion.values()) {
            if (criterion.name.equals(value)) {
                return Optional.of(criterion);
            }
        }
        return Optional.empty();
    }
}
