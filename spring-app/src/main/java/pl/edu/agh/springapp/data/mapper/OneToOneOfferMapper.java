package pl.edu.agh.springapp.data.mapper;

import org.springframework.stereotype.Component;
import pl.edu.agh.springapp.data.dto.OneToOneOfferDto;
import pl.edu.agh.springapp.data.dto.OneToOneOfferPostDto;
import pl.edu.agh.springapp.data.dto.SubjectGroupDto;
import pl.edu.agh.springapp.data.dto.TeacherDto;
import pl.edu.agh.springapp.data.model.*;
import pl.edu.agh.springapp.repository.SubjectGroupRepository;

import javax.security.auth.SubjectDomainCombiner;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class OneToOneOfferMapper {

    private StudentMapper studentMapper;
    private SubjectGroupMapper subjectGroupMapper;
    private TeacherMapper teacherMapper;
    private SubjectGroupRepository subjectGroupRepository;

    private static int courseTime = 90;

    public Offer oneToOneOfferDtoToOffer(OneToOneOfferPostDto oneToOneOfferPostDto) {
        Offer offer = new Offer();
        offer.setStudent(studentMapper.studentDtoToStudent(oneToOneOfferPostDto.getStudent()));
        offer.setGivenSubjectGroup(subjectGroupMapper.subjectGroupDtoToSubjectGroup(oneToOneOfferPostDto
                .getGivenSubjectGroup()));
        OfferConditions offerConditions = new OfferConditions();
        List<Teacher> teachers = new ArrayList<>();
        TeacherDto teacherDto = oneToOneOfferPostDto.getTakenSubjectGroup().getTeacher();
        teachers.add(teacherMapper.teacherDtoToTeacher(teacherDto));
        offerConditions.setTeachers(teachers);
        offerConditions.setOffer(offer);
        List<TimeBlock> timeBlocks = new ArrayList<>();
        LocalTime startTime = oneToOneOfferPostDto.getTakenSubjectGroup().getStartTime();
        LocalTime endTime = startTime.plusMinutes(courseTime);
        DayOfWeek day = DayOfWeek.valueOf(oneToOneOfferPostDto.getTakenSubjectGroup().getDayOfWeek());
        TimeBlock timeBlock = new TimeBlock(1L, startTime, endTime, day, offerConditions);
        timeBlocks.add(timeBlock);
        offerConditions.setTimeBlocks(timeBlocks);
        offer.setOfferConditions(offerConditions);
        return offer;
    }

    public Offer oneToOneOfferDtoToOffer(OneToOneOfferDto oneToOneOfferDto) {
        OneToOneOfferPostDto oneToOneOfferPostDto = new OneToOneOfferPostDto(oneToOneOfferDto.getStudent(),
                oneToOneOfferDto.getGivenSubjectGroup(), oneToOneOfferDto.getTakenSubjectGroup());
        Offer offer = oneToOneOfferDtoToOffer(oneToOneOfferPostDto);
        offer.setId(oneToOneOfferDto.getId());
        return offer;
    }

    public OneToOneOfferDto offerToOneToOneOfferDto(Offer offer) {
        OneToOneOfferDto oneToOneOfferDto = new OneToOneOfferDto();
        oneToOneOfferDto.setId(offer.getId());
        oneToOneOfferDto.setStudent(studentMapper.studentToStudentDto(offer.getStudent()));
        oneToOneOfferDto.setGivenSubjectGroup(subjectGroupMapper.subjectGroupToSubjectGroupDto(
                offer.getGivenSubjectGroup()));
        oneToOneOfferDto.setTakenSubjectGroup(findSubjectGroupWithOffer(offer));
        return oneToOneOfferDto;
    }

    private SubjectGroupDto findSubjectGroupWithOffer(Offer offer) {
        LocalTime searchedStartTime = offer.getOfferConditions().getTimeBlocks().get(0).getStartTime();
        Teacher searchedTeacher = offer.getOfferConditions().getTeachers().get(0);
        SubjectGroup searchedGroup = subjectGroupRepository.findByStartTimeAndTeacher(searchedStartTime, searchedTeacher).get(0);
        return subjectGroupMapper.subjectGroupToSubjectGroupDto(searchedGroup);
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
