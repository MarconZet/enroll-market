package pl.edu.agh.springapp.data.mapper;

import org.springframework.stereotype.Component;
import pl.edu.agh.springapp.data.dto.offer.OneToOneOfferDto;
import pl.edu.agh.springapp.data.dto.offer.OneToOneOfferPostDto;
import pl.edu.agh.springapp.data.dto.course.CourseDto;
import pl.edu.agh.springapp.data.dto.teacher.TeacherDto;
import pl.edu.agh.springapp.data.model.*;
import pl.edu.agh.springapp.repository.CourseRepository;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class OneToOneOfferMapper {

    private StudentMapper studentMapper;
    private CourseMapper courseMapper;
    private TeacherMapper teacherMapper;
    private CourseRepository courseRepository;

    private static int courseTime = 90;

    public Offer oneToOneOfferDtoToOffer(OneToOneOfferPostDto oneToOneOfferPostDto) {
        Offer offer = new Offer();
        offer.setStudent(studentMapper.studentDtoToStudent(oneToOneOfferPostDto.getStudent()));
        offer.setGivenCourse(courseMapper.subjectGroupDtoToSubjectGroup(oneToOneOfferPostDto
                .getGivenCourse()));
        OfferConditions offerConditions = new OfferConditions();
        List<Teacher> teachers = new ArrayList<>();
        TeacherDto teacherDto = oneToOneOfferPostDto.getTakenCourse().getTeacher();
        teachers.add(teacherMapper.teacherDtoToTeacher(teacherDto));
        offerConditions.setTeachers(teachers);
        offerConditions.setOffer(offer);
        List<TimeBlock> timeBlocks = new ArrayList<>();
        LocalTime startTime = oneToOneOfferPostDto.getTakenCourse().getStartTime();
        LocalTime endTime = startTime.plusMinutes(courseTime);
        DayOfWeek day = DayOfWeek.valueOf(oneToOneOfferPostDto.getTakenCourse().getDayOfWeek());
        TimeBlock timeBlock = new TimeBlock(1L, startTime, endTime, day, offerConditions);
        timeBlocks.add(timeBlock);
        offerConditions.setTimeBlocks(timeBlocks);
        offer.setOfferConditions(offerConditions);
        return offer;
    }

    public Offer oneToOneOfferDtoToOffer(OneToOneOfferDto oneToOneOfferDto) {
        OneToOneOfferPostDto oneToOneOfferPostDto = new OneToOneOfferPostDto(oneToOneOfferDto.getStudent(),
                oneToOneOfferDto.getGivenCourse(), oneToOneOfferDto.getTakenCourse());
        Offer offer = oneToOneOfferDtoToOffer(oneToOneOfferPostDto);
        offer.setId(oneToOneOfferDto.getId());
        return offer;
    }

    public OneToOneOfferDto offerToOneToOneOfferDto(Offer offer) {
        OneToOneOfferDto oneToOneOfferDto = new OneToOneOfferDto();
        oneToOneOfferDto.setId(offer.getId());
        oneToOneOfferDto.setStudent(studentMapper.studentToStudentDto(offer.getStudent()));
        oneToOneOfferDto.setGivenCourse(courseMapper.subjectGroupToSubjectGroupDto(
                offer.getGivenCourse()));
        oneToOneOfferDto.setTakenCourse(findSubjectGroupWithOffer(offer));
        return oneToOneOfferDto;
    }

    private CourseDto findSubjectGroupWithOffer(Offer offer) {
        LocalTime searchedStartTime = offer.getOfferConditions().getTimeBlocks().get(0).getStartTime();
        Teacher searchedTeacher = offer.getOfferConditions().getTeachers().get(0);
        Course searchedGroup = courseRepository.findByStartTimeAndTeacher(searchedStartTime, searchedTeacher).get(0);
        return courseMapper.subjectGroupToSubjectGroupDto(searchedGroup);
    }

    public List<OneToOneOfferDto> offersToOneToOneOfferDtos(List<Offer> offers) {
        if (offers == null) {
            return null;
        }
        List<OneToOneOfferDto> list = new ArrayList<>(offers.size());
        for (Offer offer: offers) {
            list.add(offerToOneToOneOfferDto(offer));
        }
        return list;
    }
}
