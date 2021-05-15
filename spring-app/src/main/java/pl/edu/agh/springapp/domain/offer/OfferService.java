package pl.edu.agh.springapp.domain.offer;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import pl.edu.agh.springapp.data.dto.course.CourseDto;
import pl.edu.agh.springapp.data.dto.offer.OfferDto;
import pl.edu.agh.springapp.data.dto.offer.OfferPostDto;
import pl.edu.agh.springapp.data.mapper.CourseMapper;
import pl.edu.agh.springapp.data.mapper.OfferMapper;
import pl.edu.agh.springapp.data.mapper.OneToOneOfferMapper;
import pl.edu.agh.springapp.data.model.*;
import pl.edu.agh.springapp.error.EntityNotFoundException;
import pl.edu.agh.springapp.error.WrongFieldsException;
import pl.edu.agh.springapp.error.WrongPathVariableException;
import pl.edu.agh.springapp.repository.CourseRepository;
import pl.edu.agh.springapp.repository.OfferRepository;
import pl.edu.agh.springapp.repository.StudentRepository;
import pl.edu.agh.springapp.repository.specification.OfferSpecifications;
import pl.edu.agh.springapp.repository.specification.searchCriteria.SearchCriteriaParser;
import pl.edu.agh.springapp.security.user.CurrentUser;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class OfferService {

    private final OfferRepository offerRepository;
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;
    private final OfferMapper offerMapper;
    private final CourseMapper courseMapper;
    private final CurrentUser currentUser;

    public OfferDto createOffer(OfferPostDto offerPostDto) {
        Offer offer = offerMapper.offerPostDtoToOffer(offerPostDto);
        Student loggedStudent = studentRepository.findFirstByIndexNumber(currentUser.getIndex());
        if (loggedStudent == null) {
            throw new WrongFieldsException("Logged student doesn't exist in database");
        }
        offer.setStudent(loggedStudent);
        for (TimeBlock timeBlock: offer.getOfferConditions().getTimeBlocks()) {
            if (checkTimeBlocks(timeBlock)) {
                throw new WrongFieldsException("End time is not after start time.",
                        "startTime", timeBlock.getStartTime().format(DateTimeFormatter.ofPattern("HH:mm")),
                        "endTime", timeBlock.getEndTime().format(DateTimeFormatter.ofPattern("HH:mm")));

            }
        }
        if (!loggedStudent.getCourses().contains(offer.getGivenCourse())) {
            throw new WrongFieldsException("Given course doesn't belong to logged student!");
        }
        if (offer.getGivenCourse().getType() == CourseType.LECTURE) {
            throw new WrongFieldsException("You cannot give lecture!");
        }
        Offer savedOffer = offerRepository.save(offer);
        return offerMapper.offerToOfferDto(savedOffer);
    }

    private boolean checkTimeBlocks(TimeBlock timeBlock) {
        return !timeBlock.isSetWholeDay() && !timeBlock.getStartTime().isBefore(timeBlock.getEndTime());
    }

    public Page<OfferDto> getAllOffers(String searchString, Integer pageNo, Integer pageSize) {
        Pageable paging = PageRequest.of(pageNo, pageSize);
        SearchCriteriaParser searchCriteriaParser = new SearchCriteriaParser();
        if (searchString != null) {
            Specification<Offer> searchSpec = searchCriteriaParser.parse(searchString);
            Specification<Offer> spec = searchSpec
                    .and(OfferSpecifications.studentIndexDoesNotEqual(currentUser.getIndex()));
            return offerRepository.findAll(spec, paging)
                    .map(offerMapper::offerToOfferDto);
        }
        return offerRepository.findOffersWhereStudentIsNot(currentUser.getIndex(), paging)
                .map(offerMapper::offerToOfferDto);
    }

    public void deleteWithId(Long id) {
        offerRepository.deleteById(id);
    }

    public OfferDto findWithId(Long id) {
        Offer offer = offerRepository.findById(id).orElseThrow(() -> new EntityNotFoundException(Offer.class, id));
        return offerMapper.offerToOfferDto(offer);
    }

    public boolean acceptOffer(Long offerId, Long courseId) {
        Offer offer = offerRepository.findById(offerId).orElseThrow(() -> new EntityNotFoundException(Offer.class, offerId));
        Course givenCourse = courseRepository.findById(courseId).orElseThrow(() -> new EntityNotFoundException(Course.class, courseId));
        List<Course> coursesOfStudent = courseRepository.findCoursesOfStudent(currentUser.getIndex());
        List<Course> matchingCourses = filterCoursesStreamToMatchingOffer(coursesOfStudent.stream(), offer)
                .collect(Collectors.toList());
        if (!matchingCourses.contains(givenCourse)) {
            throw new WrongPathVariableException("Course with id: " + courseId + " doesn't match offer conditions!");
        }
        if (!checkConflictedCourses(coursesOfStudent.stream(), offer.getGivenCourse())) {
            throw new WrongPathVariableException("Course given in offer is in collision with your plan!");
        }
        List<Course> coursesOfGiver = courseRepository.findCoursesOfStudent(offer.getStudent().getIndexNumber());
        if (!checkConflictedCourses(coursesOfGiver.stream(), givenCourse)) {
            throw new WrongPathVariableException("Taken course is in collision with plan of offer giver!");
        }
        Course takenCourse = offer.getGivenCourse();
        Student giver = offer.getStudent();
        Student taker = studentRepository.findFirstByIndexNumber(currentUser.getIndex());
        if (taker == null) {
            throw new WrongFieldsException("Logged student doesn't exist in database");
        }
        giver.getCourses().add(givenCourse);
        giver.getCourses().remove(takenCourse);
        taker.getCourses().add(takenCourse);
        taker.getCourses().remove(givenCourse);
        studentRepository.save(giver);
        studentRepository.save(taker);
        return true;
    }

    public boolean checkIfCanAcceptOffer(Long id) {
        Offer offer = offerRepository.findById(id).orElseThrow(() -> new EntityNotFoundException(Offer.class, id));
        List<Course> coursesOfStudent = courseRepository.findCoursesOfStudent(currentUser.getIndex());
        List<Course> matchingCourses = filterCoursesStreamToMatchingOffer(coursesOfStudent.stream(), offer)
                .collect(Collectors.toList());
        if (matchingCourses.size() != 1) {
            return false;
        }
        List<Course> coursesOfGiver = courseRepository.findCoursesOfStudent(offer.getStudent().getIndexNumber());
        return checkConflictedCourses(coursesOfStudent.stream(), offer.getGivenCourse())
                || checkConflictedCourses(coursesOfGiver.stream(), matchingCourses.get(0));
    }

    private boolean checkConflictedCourses(Stream<Course> courseStream, Course takenCourse) {
        List<Course> conflictedCourses = courseStream
                .filter(course -> course.getDay() == takenCourse.getDay())
                .filter(course -> !course.getSubject().equals(takenCourse.getSubject()))
                .filter(course -> {
                    boolean colidateWeeks = false;
                    switch (takenCourse.getWeekType()) {
                        case A:
                            colidateWeeks = course.getWeekType() != WeekType.B;
                            break;
                        case B:
                            colidateWeeks = course.getWeekType() != WeekType.A;
                            break;
                        case AB:
                            colidateWeeks = true;
                            break;
                    }
                    return takenCourse.getStartTime().equals(course.getStartTime()) && colidateWeeks;
                })
                .collect(Collectors.toList());
        return conflictedCourses.size() == 0;
    }

    public List<CourseDto> getCoursesMatchingOffer(Long id) {
        Offer offer = offerRepository.findById(id).orElseThrow(() -> new EntityNotFoundException(Offer.class, id));
        List<Course> coursesOfStudent = courseRepository.findCoursesOfStudent(currentUser.getIndex());
        return filterCoursesStreamToMatchingOffer(coursesOfStudent.stream(), offer)
                .map(courseMapper::courseToCourseDto)
                .collect(Collectors.toList());
    }

    private Stream<Course> filterCoursesStreamToMatchingOffer(Stream<Course> courseStream, Offer offer) {
        OfferConditions offerConditions = offer.getOfferConditions();
        return courseStream
                .filter( course -> course.getSubject().equals(offer.getGivenCourse().getSubject()))
                .filter( course -> course.getType().equals(offer.getGivenCourse().getType()))
                .filter( course -> {
                    List<TimeBlock> timeBlocks = offerConditions.getTimeBlocks();
                    return timeBlocks.stream().map( timeBlock -> {
                        LocalTime startTime = course.getStartTime();
                        LocalTime endTime = course.getStartTime().plusMinutes(OneToOneOfferMapper.courseTime);
                        boolean dayCheck = timeBlock.getDay().equals(course.getDay());
                        boolean startTimeCheck = true;
                        boolean endTimeCheck = true;
                        if (timeBlock.getStartTime() != null && timeBlock.getEndTime() != null) {
                            startTimeCheck = startTime.compareTo(timeBlock.getStartTime()) <= 0;
                            endTimeCheck = endTime.compareTo(timeBlock.getEndTime()) >= 0;
                        }
                        return dayCheck && startTimeCheck && endTimeCheck;
                    }).reduce(false, (a, b) -> a || b);
                })
                .filter( course -> offerConditions.getTeachers().contains(course.getTeacher()))
                .filter( course -> course.getStudents().size() < course.getMaxStudentCount() + 1 );
    }
}
