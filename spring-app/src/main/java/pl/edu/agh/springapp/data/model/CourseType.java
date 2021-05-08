package pl.edu.agh.springapp.data.model;

public enum CourseType {
    PROJECT, LABORATORY, LESSON, LECTURE;

    static public CourseType getCourseTypeFromString(String type) {
        if (type.equals("PROJECT")) {
            return PROJECT;
        } else if (type.equals("LABORATORY")) {
            return LABORATORY;
        } else if (type.equals("LESSON")) {
            return LESSON;
        } else if (type.equals("LECTURE")) {
            return LECTURE;
        }
        return LECTURE;
    }
}
