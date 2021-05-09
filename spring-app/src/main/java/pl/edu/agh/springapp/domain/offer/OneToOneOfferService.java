package pl.edu.agh.springapp.domain.offer;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pl.edu.agh.springapp.data.dto.offer.OneToOneOfferDto;
import pl.edu.agh.springapp.data.dto.offer.OneToOneOfferPostDto;
import pl.edu.agh.springapp.data.mapper.OneToOneOfferMapper;
import pl.edu.agh.springapp.data.model.Course;
import pl.edu.agh.springapp.data.model.CourseType;
import pl.edu.agh.springapp.data.model.Offer;
import pl.edu.agh.springapp.data.model.Student;
import pl.edu.agh.springapp.error.WrongFieldsException;
import pl.edu.agh.springapp.repository.OfferRepository;
import pl.edu.agh.springapp.repository.CourseRepository;
import pl.edu.agh.springapp.repository.StudentRepository;
import pl.edu.agh.springapp.security.user.CurrentUser;

@Service
@RequiredArgsConstructor
public class OneToOneOfferService {

    private final OfferRepository offerRepository;
    private final CourseRepository courseRepository;
    private final StudentRepository studentRepository;
    private final OneToOneOfferMapper oneToOneOfferMapper;
    private final CurrentUser currentUser;

    public OneToOneOfferDto newOneToOneOffer(OneToOneOfferPostDto oneToOneOfferPostDto) {
        Offer offer = oneToOneOfferMapper.oneToOneOfferPostDtoToOffer(oneToOneOfferPostDto);
        Student loggedStudent = studentRepository.findFirstByIndexNumber(currentUser.getIndex());
        if (loggedStudent == null) {
            throw new WrongFieldsException("Logged student doesn't exist in database");
        }
        Course takenCourse = courseRepository.findById(oneToOneOfferPostDto.getTakenCourseId())
                .orElseThrow(() -> new WrongFieldsException("No taken course with id: " + oneToOneOfferPostDto.getTakenCourseId()));
        if (!offer.getGivenCourse().getSubject().equals(takenCourse.getSubject())) {
            throw new WrongFieldsException("Given courses are not the same subject!",
                    "givenCourse.subject", offer.getGivenCourse().getSubject().getName(),
                    "takenCourse.subject", takenCourse.getSubject().getName()
                    );
        }
        if (offer.getGivenCourse().getType() == CourseType.LECTURE || takenCourse.getType() == CourseType.LECTURE) {
            throw new WrongFieldsException("You cannot give lecture!",
                    "givenCourse.type", offer.getGivenCourse().getType().toString(),
                    "takenCourse.type", takenCourse.getType().toString()
            );
        }
        if (!offer.getGivenCourse().getType().equals(takenCourse.getType())) {
            throw new WrongFieldsException("Given courses do not have the same course type!",
                    "givenCourse.type", offer.getGivenCourse().getType().toString(),
                    "takenCourse.type", takenCourse.getType().toString()
            );
        }
        offer.setStudent(loggedStudent);
        Offer savedOffer = offerRepository.save(offer);
        return oneToOneOfferMapper.offerToOneToOneOfferDto(savedOffer);
    }


    public Page<OneToOneOfferDto> getAllOneToOneOffers(Integer pageNo, Integer pageSize) {
        Pageable paging = PageRequest.of(pageNo, pageSize);

        return offerRepository.findAllByIsOneToOne(true, paging).map(oneToOneOfferMapper::offerToOneToOneOfferDto);
    }

    public void deleteWithId(Long id) {
        offerRepository.deleteById(id);
    }
}
