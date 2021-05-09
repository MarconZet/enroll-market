package pl.edu.agh.springapp.domain.offer;

import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.springapp.data.dto.offer.OfferDto;
import pl.edu.agh.springapp.data.dto.offer.OfferPostDto;

@RestController
@RequiredArgsConstructor
public class OfferController {
    private final OfferService service;

    @PostMapping("/offers")
    public ResponseEntity<OfferDto> newOffer(
            @ApiParam("You can post time block with field startTime and endTime setting as null. \n" +
                    "That would mean that whole day is good for you")
            @RequestBody OfferPostDto offerPostDto) {
        OfferDto createdOffer = service.createOffer(offerPostDto);
        return new ResponseEntity<>(createdOffer, new HttpHeaders(), HttpStatus.CREATED);
    }

    @GetMapping("/offers")
    public ResponseEntity<Page<OfferDto>> getAllOffers(
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize
    ) {
        Page<OfferDto> list = service.getAllOffers(pageNo, pageSize);
        return new ResponseEntity<>(list, new HttpHeaders(), HttpStatus.OK);
    }

    @DeleteMapping("/offers/{id}")
    public ResponseEntity<Boolean> deleteOffer(@PathVariable Long id) {
        service.deleteWithId(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/offers/{id}")
    public OfferDto getOffer(@PathVariable Long id) {
        return service.findWithId(id);
    }
}
