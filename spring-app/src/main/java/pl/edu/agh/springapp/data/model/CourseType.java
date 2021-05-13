package pl.edu.agh.springapp.data.model;

import pl.edu.agh.springapp.repository.specification.searchCriteria.SearchCriterion;

import java.util.Optional;

public enum CourseType {
    PROJECT, LABORATORY, LESSON, LECTURE;

    static public Optional<CourseType> fromString(String name) {
        try {
            return Optional.of(CourseType.valueOf(name));
        } catch (IllegalArgumentException ex) {
            return Optional.empty();
        }
    }
}
