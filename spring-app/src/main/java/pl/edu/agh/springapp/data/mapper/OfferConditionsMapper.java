package pl.edu.agh.springapp.data.mapper;

import org.mapstruct.Mapper;
import pl.edu.agh.springapp.data.dto.offer.OfferConditionsDto;
import pl.edu.agh.springapp.data.model.OfferConditions;

@Mapper(
        uses = {TeacherMapper.class, TimeBlockMapper.class},
        componentModel = "spring"
)
public interface OfferConditionsMapper {
    OfferConditions offerCondtionsDtoToOfferConditions(OfferConditionsDto offerConditionsDto);
}
