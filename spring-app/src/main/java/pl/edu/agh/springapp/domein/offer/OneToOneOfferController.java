package pl.edu.agh.springapp.domein.offer;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.springapp.data.dto.offer.OneToOneOfferDto;
import pl.edu.agh.springapp.data.dto.offer.OneToOneOfferPostDto;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class OneToOneOfferController {
    private final OneToOneOfferService service;

    @PostMapping("/one-to-one-offers")
    public OneToOneOfferDto newOneToOneOffer(@RequestBody OneToOneOfferPostDto oneToOneOfferPostDto) {
        return service.newOneToOneOffer(oneToOneOfferPostDto);
    }

    @GetMapping("/one-to-one-offers")
    public List<OneToOneOfferDto> getAllOffers() {
        return service.getAll();
    }

    @DeleteMapping("/one-to-one-offers/{id}")
    void deleteEmployee(@PathVariable Long id) {
        service.deleteWithId(id);
    }

}
