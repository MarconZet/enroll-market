package pl.edu.agh.springapp.data.dto;

import lombok.Data;

@Data
public class OneToOneOfferDto {
    private Long id;
    private StudentDto student;
    private CourseDto givenCourse;
    private CourseDto takenCourse;
}
