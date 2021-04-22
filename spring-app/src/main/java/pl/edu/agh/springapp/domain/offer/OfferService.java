package pl.edu.agh.springapp.domain.offer;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.agh.springapp.data.dto.offer.OfferDto;
import pl.edu.agh.springapp.data.dto.offer.OfferPostDto;
import pl.edu.agh.springapp.data.dto.offer.OneToOneOfferDto;
import pl.edu.agh.springapp.data.dto.offer.OneToOneOfferPostDto;
import pl.edu.agh.springapp.data.mapper.OfferMapper;
import pl.edu.agh.springapp.data.mapper.OneToOneOfferMapper;
import pl.edu.agh.springapp.data.model.Offer;
import pl.edu.agh.springapp.repository.CourseRepository;
import pl.edu.agh.springapp.repository.OfferRepository;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class OfferService {

    private final OfferRepository offerRepository;
    private final CourseRepository courseRepository;
    private final OfferMapper offerMapper;

    public OfferDto newOffer(OfferPostDto offerPostDto) {
        Offer offer = offerMapper.offerPostDtoToOffer(offerPostDto);
        Offer savedOffer = offerRepository.save(offer);
        return offerMapper.offerToOfferDto(offer);
    }

    public List<OfferDto> getAll() {
        List<Offer> offers = StreamSupport.stream(offerRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
        return offerMapper.offersToOfferDtos(offers);
    }

    public void deleteWithId(Long id) {
        offerRepository.deleteById(id);
    }
}
