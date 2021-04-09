package pl.edu.agh.springapp.domein;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.agh.springapp.data.dto.OneToOneOfferDto;
import pl.edu.agh.springapp.data.dto.OneToOneOfferPostDto;
import pl.edu.agh.springapp.data.mapper.OneToOneOfferMapper;
import pl.edu.agh.springapp.data.model.Offer;
import pl.edu.agh.springapp.repository.OfferRepository;
import pl.edu.agh.springapp.repository.CourseRepository;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class OneToOneOfferService {

    private final OfferRepository offerRepository;
    private final CourseRepository courseRepository;
    private final OneToOneOfferMapper oneToOneOfferMapper;

    public OneToOneOfferDto newOneToOneOffer(OneToOneOfferPostDto oneToOneOfferPostDto) {
        Offer offer = oneToOneOfferMapper.oneToOneOfferDtoToOffer(oneToOneOfferPostDto);
        Offer savedOffer = offerRepository.save(offer);
        OneToOneOfferDto result = oneToOneOfferMapper.offerToOneToOneOfferDto(savedOffer);
        result.setTakenCourse(oneToOneOfferPostDto.getTakenCourse());
        return result;
    }

    public List<OneToOneOfferDto> getAll() {
        List<Offer> offers = StreamSupport.stream(offerRepository.findAll().spliterator(), false)
                .filter(offer -> offer.getOfferConditions().getTeachers().size() == 1
                        && offer.getOfferConditions().getTimeBlocks().size() == 1)
                .collect(Collectors.toList());
        return oneToOneOfferMapper.offersToOneToOneOfferDtos(offers);
    }

    public void deleteWithId(Long id) {
        offerRepository.deleteById(id);
    }
}
