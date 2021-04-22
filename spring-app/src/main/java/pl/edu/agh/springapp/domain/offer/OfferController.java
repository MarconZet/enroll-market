package pl.edu.agh.springapp.domain.offer;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.springapp.data.dto.offer.OfferDto;
import pl.edu.agh.springapp.data.dto.offer.OfferPostDto;
import pl.edu.agh.springapp.data.dto.offer.OneToOneOfferDto;
import pl.edu.agh.springapp.data.dto.offer.OneToOneOfferPostDto;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class OfferController {
    private final OfferService service;

    @PostMapping("/offers")
    public OfferDto newOffer(@RequestBody OfferPostDto offerPostDto) {
        return service.newOffer(offerPostDto);
    }

    @GetMapping("/offers")
    public List<OfferDto> getAllOffers() {
        return service.getAll();
    }

    @DeleteMapping("/offers/{id}")
    void deleteEmployee(@PathVariable Long id) {
        service.deleteWithId(id);
    }

}
