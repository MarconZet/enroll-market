package pl.edu.agh.springapp.data.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import pl.edu.agh.springapp.data.dto.offer.OfferDto;
import pl.edu.agh.springapp.data.dto.offer.OfferPostDto;
import pl.edu.agh.springapp.data.dto.offer.OfferWithoutStudentDto;
import pl.edu.agh.springapp.data.model.Offer;

import java.util.List;

@Mapper(
        uses = {CourseMapper.class, OfferConditionsMapper.class},
        componentModel = "spring"
)
public interface OfferMapper {
    Offer offerDtoToOffer(OfferDto offerDto);
    @Mapping(source = "givenCourseId", target = "givenCourse")
    Offer offerPostDtoToOffer(OfferPostDto offerPostDto);
    OfferDto offerToOfferDto(Offer offer);
    OfferWithoutStudentDto offerToOfferWithoutStudentDto(Offer offer);
    List<OfferDto> offersToOfferDtos(List<Offer> offers);
}
