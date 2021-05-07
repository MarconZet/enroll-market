package pl.edu.agh.springapp.domain.offer;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pl.edu.agh.springapp.data.dto.offer.OneToOneOfferDto;
import pl.edu.agh.springapp.data.dto.offer.OneToOneOfferPostDto;
import pl.edu.agh.springapp.data.mapper.OneToOneOfferMapper;
import pl.edu.agh.springapp.data.model.Offer;
import pl.edu.agh.springapp.repository.OfferRepository;
import pl.edu.agh.springapp.repository.CourseRepository;

@Service
@RequiredArgsConstructor
public class OneToOneOfferService {

    private final OfferRepository offerRepository;
    private final CourseRepository courseRepository;
    private final OneToOneOfferMapper oneToOneOfferMapper;

    public OneToOneOfferDto newOneToOneOffer(OneToOneOfferPostDto oneToOneOfferPostDto) {
        Offer offer = oneToOneOfferMapper.oneToOneOfferPostDtoToOffer(oneToOneOfferPostDto);
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
