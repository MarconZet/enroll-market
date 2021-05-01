package pl.edu.agh.springapp.domain.offer;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pl.edu.agh.springapp.data.dto.course.CourseDto;
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
    private final OfferMapper offerMapper;

    public OfferDto newOffer(OfferPostDto offerPostDto) {
        Offer offer = offerMapper.offerPostDtoToOffer(offerPostDto);
        Offer savedOffer = offerRepository.save(offer);
        return offerMapper.offerToOfferDto(offer);
    }

    public Page<OfferDto> getAllOffers(Integer pageNo, Integer pageSize) {
        Pageable paging = PageRequest.of(pageNo, pageSize);

        return offerRepository.findAll(paging).map(offerMapper::offerToOfferDto);
    }

    public void deleteWithId(Long id) {
        offerRepository.deleteById(id);
    }
}
