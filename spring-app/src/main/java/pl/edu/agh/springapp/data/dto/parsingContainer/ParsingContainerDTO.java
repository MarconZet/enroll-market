package pl.edu.agh.springapp.data.dto.parsingContainer;

import lombok.Data;

@Data
public class ParsingContainerDTO {

    private String subjectName;
    private String courseType;
    private String maxCount;
    private String groupNumber;
    private String teacher;
    private String teacherMailAddress;
    private String isOnline;
    private String weekAB;
    private String dayOfWeek;
    private String startTime;
    private String studentName;
    private String studentIndex;
}
