package pl.edu.agh.springapp.data.model;

import pl.edu.agh.springapp.repository.specification.searchCriteria.SearchCriterion;

import java.util.Optional;

public enum DayOfWeek {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY;

    static public String convertDayOfWeekName(String name) {
        if (name.equals("Pn")) {
            return "MONDAY";
        } else if (name.equals("Wt")) {
            return "TUESDAY";
        } else if (name.equals("Sr")) {
            return "WEDNESDAY";
        } else if (name.equals("Cz") || name.equals("Czw")) {
            return "THURSDAY";
        } else if (name.equals("Pt")) {
            return "FRIDAY";
        } else if (name.equals("Sb")) {
            return "SATURDAY";
        } else if (name.equals("Nd")) {
            return "SUNDAY";
        }
        return "SUNDAY";
    }
    static public DayOfWeek getDayOfWeek(String name) {
        if (name.equals("Pn")) {
            return MONDAY;
        } else if (name.equals("Wt")) {
            return TUESDAY;
        } else if (name.equals("Sr")) {
            return WEDNESDAY;
        } else if (name.equals("Cz") || name.equals("Czw")) {
            return THURSDAY;
        } else if (name.equals("Pt")) {
            return FRIDAY;
        } else if (name.equals("Sb")) {
            return SATURDAY;
        } else if (name.equals("Nd")) {
            return SUNDAY;
        }
        return SUNDAY;
    }

    static public Optional<DayOfWeek> fromString(String name) {
        try {
            return Optional.of(DayOfWeek.valueOf(name));
        } catch (IllegalArgumentException ex) {
            return Optional.empty();
        }
    }
}
