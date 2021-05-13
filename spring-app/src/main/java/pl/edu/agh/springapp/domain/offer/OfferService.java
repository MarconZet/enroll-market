package pl.edu.agh.springapp.domain.offer;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import pl.edu.agh.springapp.data.dto.offer.OfferDto;
import pl.edu.agh.springapp.data.dto.offer.OfferPostDto;
import pl.edu.agh.springapp.data.mapper.OfferMapper;
import pl.edu.agh.springapp.data.model.CourseType;
import pl.edu.agh.springapp.data.model.Offer;
import pl.edu.agh.springapp.data.model.Student;
import pl.edu.agh.springapp.data.model.TimeBlock;
import pl.edu.agh.springapp.error.EntityNotFoundException;
import pl.edu.agh.springapp.error.WrongFieldsException;
import pl.edu.agh.springapp.repository.OfferRepository;
import pl.edu.agh.springapp.repository.StudentRepository;
import pl.edu.agh.springapp.repository.specification.OfferSpecifications;
import pl.edu.agh.springapp.repository.specification.searchCriteria.SearchCriteria;
import pl.edu.agh.springapp.repository.specification.searchCriteria.SearchCriteriaParser;
import pl.edu.agh.springapp.security.user.CurrentUser;

import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OfferService {

    private final OfferRepository offerRepository;
    private final StudentRepository studentRepository;
    private final OfferMapper offerMapper;
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
            List<SearchCriteria> criteria = searchCriteriaParser.parse(searchString);
            List<Specification<Offer>> specifications = searchCriteriaParser.specificationsFromSearchCriteria(criteria);
            specifications.add(OfferSpecifications.studentIndexDoesNotEqual(currentUser.getIndex()));
            Specification<Offer> spec = searchCriteriaParser.andSpecification(specifications)
                    .orElseThrow(() -> new IllegalArgumentException());
            return offerRepository.findAll(spec, paging)
                    .map(offerMapper::offerToOfferDto);
        }
        return offerRepository.findOffersWhereStudentIsNot(currentUser.getIndex(), paging).map(offerMapper::offerToOfferDto);
    }

    public void deleteWithId(Long id) {
        offerRepository.deleteById(id);
    }

    public OfferDto findWithId(Long id) {
        Offer offer = offerRepository.findById(id).orElseThrow(() -> new EntityNotFoundException(Offer.class, id));
        return offerMapper.offerToOfferDto(offer);
    }
}
