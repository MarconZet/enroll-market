package pl.edu.agh.springapp.data.mapper;

import org.mapstruct.Mapper;
import pl.edu.agh.springapp.data.dto.OfferConditionsDto;
import pl.edu.agh.springapp.data.model.OfferConditions;

@Mapper(uses = {TeacherMapper.class, TimeBlockMapper.class})
public interface OfferConditionsMapper {
    OfferConditions offerCondtionsDtoToOfferConditions(OfferConditionsDto offerConditionsDto);
}
