package pl.edu.agh.springapp.data.model;

public enum DayOfWeek {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY;

    static public String convertDayOfWeekName(String name) {
        if (name.equals("MONDAY") || name.equals("Pn")) {
            return "MONDAY";
        } else if (name.equals("TUESDAY") || name.equals("Wt")) {
            return "TUESDAY";
        } else if (name.equals("WEDNESDAY") || name.equals("Sr")) {
            return "WEDNESDAY";
        } else if (name.equals("THURSDAY") || name.equals("Cz") || name.equals("Czw")) {
            return "THURSDAY";
        } else if (name.equals("FRIDAY") || name.equals("Pt")) {
            return "FRIDAY";
        } else if (name.equals("SATURDAY") || name.equals("Sb")) {
            return "SATURDAY";
        } else if (name.equals("SUNDAY") || name.equals("Nd")) {
            return "SUNDAY";
        }
        return "SUNDAY";
    }
    static public DayOfWeek getDayOfWeek(String name) {
        if (name.equals("MONDAY") || name.equals("Pn")) {
            return MONDAY;
        } else if (name.equals("TUESDAY") || name.equals("Wt")) {
            return TUESDAY;
        } else if (name.equals("WEDNESDAY") || name.equals("Sr")) {
            return WEDNESDAY;
        } else if (name.equals("THURSDAY") || name.equals("Cz") || name.equals("Czw")) {
            return THURSDAY;
        } else if (name.equals("FRIDAY") || name.equals("Pt")) {
            return FRIDAY;
        } else if (name.equals("SATURDAY") || name.equals("Sb")) {
            return SATURDAY;
        } else if (name.equals("SUNDAY") || name.equals("Nd")) {
            return SUNDAY;
        }
        return SUNDAY;
    }

}
