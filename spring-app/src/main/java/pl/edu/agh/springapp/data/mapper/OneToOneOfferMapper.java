package pl.edu.agh.springapp.data.mapper;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import pl.edu.agh.springapp.data.dto.offer.OneToOneOfferDto;
import pl.edu.agh.springapp.data.dto.offer.OneToOneOfferPostDto;
import pl.edu.agh.springapp.data.dto.course.CourseDto;
import pl.edu.agh.springapp.data.model.*;
import pl.edu.agh.springapp.repository.CourseRepository;
import pl.edu.agh.springapp.repository.OfferConditionsRepository;
import pl.edu.agh.springapp.repository.StudentRepository;
import pl.edu.agh.springapp.repository.TimeBlockRepository;

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
    private final TimeBlockRepository timeBlockRepository;
    private final OfferConditionsRepository offerConditionsRepository;

    private static int courseTime = 90;

    public Offer oneToOneOfferPostDtoToOffer(OneToOneOfferPostDto oneToOneOfferPostDto) {
        Offer offer = new Offer();
        Student student = studentRepository.findById(oneToOneOfferPostDto.getStudentId()).orElse(null);
        if (student == null) {
            return null;
        }
        offer.setStudent(student);

        Course givenCourse = courseRepository.findById(oneToOneOfferPostDto.getGivenCourseId()).orElse(null);
        if (givenCourse == null) {
            return null;
        }
        offer.setGivenCourse(givenCourse);

        OfferConditions offerConditions = new OfferConditions();
        Course takenCourse = courseRepository.findById(oneToOneOfferPostDto.getTakenCourseId()).orElse(null);
        if (takenCourse == null) {
            return null;
        }
        offerConditions.getTeachers().add(takenCourse.getTeacher());

        TimeBlock timeBlock = new TimeBlock();
        timeBlock.setStartTime(takenCourse.getStartTime());
        timeBlock.setEndTime(takenCourse.getStartTime().plusMinutes(courseTime));
        timeBlock.setDay(takenCourse.getDay());
        timeBlock.setOfferConditions(offerConditions);

        offerConditions.getTimeBlocks().add(timeBlock);

        offer.setOfferConditions(offerConditions);
        return offer;
    }

    public Offer oneToOneOfferDtoToOffer(OneToOneOfferDto oneToOneOfferDto) {
        OneToOneOfferPostDto oneToOneOfferPostDto = new OneToOneOfferPostDto(oneToOneOfferDto.getStudent().getId(),
                oneToOneOfferDto.getGivenCourse().getId(), oneToOneOfferDto.getTakenCourse().getId());
        Offer offer = oneToOneOfferPostDtoToOffer(oneToOneOfferPostDto);
        offer.setId(oneToOneOfferDto.getId());
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
