package pl.edu.agh.springapp.domain.offer;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import pl.edu.agh.springapp.data.dto.offer.OfferDto;
import pl.edu.agh.springapp.data.dto.offer.OneToOneOfferDto;
import pl.edu.agh.springapp.data.dto.offer.OneToOneOfferPostDto;
import pl.edu.agh.springapp.data.mapper.OneToOneOfferMapper;
import pl.edu.agh.springapp.data.model.*;
import pl.edu.agh.springapp.error.EntityNotFoundException;
import pl.edu.agh.springapp.error.WrongFieldsException;
import pl.edu.agh.springapp.error.WrongPathVariableException;
import pl.edu.agh.springapp.repository.OfferRepository;
import pl.edu.agh.springapp.repository.CourseRepository;
import pl.edu.agh.springapp.repository.StudentRepository;
import pl.edu.agh.springapp.repository.specification.OfferSpecifications;
import pl.edu.agh.springapp.repository.specification.searchCriteria.SearchCriteriaParser;
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
        offer.setStudent(loggedStudent);
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


    public Page<OneToOneOfferDto> getAllOneToOneOffers(String searchString, Integer pageNo, Integer pageSize) {
        Pageable paging = PageRequest.of(pageNo, pageSize);
        SearchCriteriaParser searchCriteriaParser = new SearchCriteriaParser();
        Specification<Offer> isOneToOneSpec = OfferSpecifications.isOneToOne(true);
        Specification<Offer> indexIsNotEqualSpec = OfferSpecifications.studentIndexDoesNotEqual(currentUser.getIndex());
        if (searchString != null) {
            Specification<Offer> searchSpec = searchCriteriaParser.parse(searchString);
            Specification<Offer> spec = searchSpec
                    .and(isOneToOneSpec)
                    .and(indexIsNotEqualSpec);
            return offerRepository.findAll(spec, paging)
                    .map(oneToOneOfferMapper::offerToOneToOneOfferDto);
        }
        Specification<Offer> spec = isOneToOneSpec.and(indexIsNotEqualSpec);
        return offerRepository.findAll(spec, paging)
                .map(oneToOneOfferMapper::offerToOneToOneOfferDto);
    }

    public void deleteWithId(Long id) {
        offerRepository.deleteById(id);
    }

    public OneToOneOfferDto findWithId(Long id) {
        Offer offer = offerRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("One to one offer was not found for id: " + id));
        if (!offer.getIsOneToOne()) {
            throw new EntityNotFoundException("One to one offer was not found for id: " + id);
        }
        return oneToOneOfferMapper.offerToOneToOneOfferDto(offer);
    }

    public OneToOneOfferDto updateOneToOneOffer(Long id, OneToOneOfferPostDto oneToOneOfferPostDto) {
        Offer offer = offerRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("One to one offer was not found for id: " + id));
        Offer mapped = oneToOneOfferMapper.oneToOneOfferPostDtoToOffer(oneToOneOfferPostDto);
        Student loggedStudent = studentRepository.findFirstByIndexNumber(currentUser.getIndex());
        if (loggedStudent == null) {
            throw new WrongFieldsException("Logged student doesn't exist in database");
        }
        if (!offer.getStudent().getIndexNumber().equals(currentUser.getIndex())) {
            throw new WrongPathVariableException("You cannot change offer from other student!");
        }
        Course takenCourse = courseRepository.findById(oneToOneOfferPostDto.getTakenCourseId())
                .orElseThrow(() -> new WrongFieldsException("No taken course with id: " + oneToOneOfferPostDto.getTakenCourseId()));
        if (!mapped.getGivenCourse().getSubject().equals(takenCourse.getSubject())) {
            throw new WrongFieldsException("Given courses are not the same subject!",
                    "givenCourse.subject", offer.getGivenCourse().getSubject().getName(),
                    "takenCourse.subject", takenCourse.getSubject().getName()
            );
        }
        if (mapped.getGivenCourse().getType() == CourseType.LECTURE || takenCourse.getType() == CourseType.LECTURE) {
            throw new WrongFieldsException("You cannot give lecture!",
                    "givenCourse.type", offer.getGivenCourse().getType().toString(),
                    "takenCourse.type", takenCourse.getType().toString()
            );
        }
        if (!mapped.getGivenCourse().getType().equals(takenCourse.getType())) {
            throw new WrongFieldsException("Given courses do not have the same course type!",
                    "givenCourse.type", offer.getGivenCourse().getType().toString(),
                    "takenCourse.type", takenCourse.getType().toString()
            );
        }
        offer.setComment(mapped.getComment());
        offer.setOfferConditions(mapped.getOfferConditions());
        offer.setGivenCourse(mapped.getGivenCourse());
        Offer savedOffer = offerRepository.save(offer);
        return oneToOneOfferMapper.offerToOneToOneOfferDto(savedOffer);
    }
}
