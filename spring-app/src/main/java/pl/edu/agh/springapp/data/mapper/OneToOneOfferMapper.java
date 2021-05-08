package pl.edu.agh.springapp.data.mapper;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import pl.edu.agh.springapp.data.dto.offer.OneToOneOfferDto;
import pl.edu.agh.springapp.data.dto.offer.OneToOneOfferPostDto;
import pl.edu.agh.springapp.data.dto.course.CourseDto;
import pl.edu.agh.springapp.data.model.*;
import pl.edu.agh.springapp.error.WrongFieldsException;
import pl.edu.agh.springapp.repository.CourseRepository;
import pl.edu.agh.springapp.repository.OfferConditionsRepository;
import pl.edu.agh.springapp.repository.StudentRepository;
import pl.edu.agh.springapp.repository.TimeBlockRepository;
import pl.edu.agh.springapp.security.user.CurrentUser;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Component
@AllArgsConstructor
public class OneToOneOfferMapper {

    private final StudentMapper studentMapper;
    private final CourseMapper courseMapper;
    private final CourseRepository courseRepository;
    private final StudentRepository studentRepository;
    private final CurrentUser currentUser;

    private static int courseTime = 90;

    public Offer oneToOneOfferPostDtoToOffer(OneToOneOfferPostDto oneToOneOfferPostDto) {
        Offer offer = new Offer();
        Student student = studentRepository.findFirstByIndexNumber(currentUser.getIndex());
        if (student == null) {
            throw new WrongFieldsException("Logged student doesn't exist in database");
        }
        offer.setStudent(student);

        Course givenCourse = courseRepository.findById(oneToOneOfferPostDto.getGivenCourseId())
                .orElseThrow(() -> new WrongFieldsException("No given course with id: " + oneToOneOfferPostDto.getGivenCourseId()));
        offer.setGivenCourse(givenCourse);

        OfferConditions offerConditions = new OfferConditions();
        Course takenCourse = courseRepository.findById(oneToOneOfferPostDto.getTakenCourseId())
                .orElseThrow(() -> new WrongFieldsException("No taken course with id: " + oneToOneOfferPostDto.getTakenCourseId()));
        offerConditions.getTeachers().add(takenCourse.getTeacher());

        TimeBlock timeBlock = new TimeBlock();
        timeBlock.setStartTime(takenCourse.getStartTime());
        timeBlock.setEndTime(takenCourse.getStartTime().plusMinutes(courseTime));
        timeBlock.setDay(takenCourse.getDay());
        timeBlock.setOfferConditions(offerConditions);

        offerConditions.getTimeBlocks().add(timeBlock);

        offer.setOfferConditions(offerConditions);
        offer.setOneToOne(true);
        return offer;
    }

    public OneToOneOfferDto offerToOneToOneOfferDto(Offer offer) {
        OneToOneOfferDto oneToOneOfferDto = new OneToOneOfferDto();
        oneToOneOfferDto.setId(offer.getId());
        oneToOneOfferDto.setStudent(studentMapper.studentToStudentDto(offer.getStudent()));
        oneToOneOfferDto.setGivenCourse(courseMapper.courseToCourseDto(
                offer.getGivenCourse()));
        oneToOneOfferDto.setTakenCourse(findSubjectGroupWithOffer(offer));
        return oneToOneOfferDto;
    }

    private CourseDto findSubjectGroupWithOffer(Offer offer) {
        LocalTime searchedStartTime = offer.getOfferConditions().getTimeBlocks().get(0).getStartTime();
        DayOfWeek day = offer.getOfferConditions().getTimeBlocks().get(0).getDay();
        Teacher searchedTeacher = offer.getOfferConditions().getTeachers().get(0);
        Course searchedGroup = courseRepository.findByStartTimeAndTeacherAndDay(searchedStartTime, searchedTeacher, day).get(0);
        return courseMapper.courseToCourseDto(searchedGroup);
    }

    public List<Offer> oneToOneOfferPostDtosToOffers(List<OneToOneOfferPostDto> oneToOneOfferPostDtos) {
        if (oneToOneOfferPostDtos == null) {
            return null;
        }
        List<Offer> list = new ArrayList<>(oneToOneOfferPostDtos.size());
        for (OneToOneOfferPostDto dto: oneToOneOfferPostDtos) {
            list.add(oneToOneOfferPostDtoToOffer(dto));
        }
        return list;
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
