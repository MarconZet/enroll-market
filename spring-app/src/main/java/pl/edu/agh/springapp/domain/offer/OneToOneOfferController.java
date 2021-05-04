package pl.edu.agh.springapp.domain.offer;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.springapp.data.dto.offer.OfferDto;
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
    public ResponseEntity<Page<OneToOneOfferDto>> getAllOffers(
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize
    ) {
        Page<OneToOneOfferDto> list = service.getAllOneToOneOffers(pageNo, pageSize);
        return new ResponseEntity<>(list, new HttpHeaders(), HttpStatus.OK);
    }

    @DeleteMapping("/one-to-one-offers/{id}")
    void deleteEmployee(@PathVariable Long id) {
        service.deleteWithId(id);
    }

}
