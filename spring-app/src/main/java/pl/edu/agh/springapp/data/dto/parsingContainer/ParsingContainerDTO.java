package pl.edu.agh.springapp.data.dto.parsingContainer;

import lombok.Data;

@Data
public class ParsingContainerDTO {

    private String subjectName;
    private String teacher;
    private String teacherMailAddress;
    private String student;
    private String dayOfWeek;
    private String startTime;
    private String courseType;
}
