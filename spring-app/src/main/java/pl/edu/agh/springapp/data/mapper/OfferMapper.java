package pl.edu.agh.springapp.data.mapper;

import org.mapstruct.Mapper;
import pl.edu.agh.springapp.data.dto.OfferDto;
import pl.edu.agh.springapp.data.model.Offer;

@Mapper(uses = {CourseMapper.class, OfferConditionsMapper.class})
public interface OfferMapper {
    Offer offerDtoToOffer(OfferDto offerDto);
}
