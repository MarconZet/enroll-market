package pl.edu.agh.springapp.domain.offer;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.springapp.data.dto.course.CourseDto;
import pl.edu.agh.springapp.data.dto.offer.OfferDto;
import pl.edu.agh.springapp.data.dto.offer.OfferPostDto;
import pl.edu.agh.springapp.data.dto.offer.OneToOneOfferDto;
import pl.edu.agh.springapp.data.dto.offer.OneToOneOfferPostDto;
import pl.edu.agh.springapp.security.user.CurrentUser;
import pl.edu.agh.springapp.security.user.KeycloakUser;

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
    public ResponseEntity<Page<OfferDto>> getAllOffers(
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize
    ) {
        Page<OfferDto> list = service.getAllOffers(pageNo, pageSize);
        return new ResponseEntity<>(list, new HttpHeaders(), HttpStatus.OK);
    }

    @DeleteMapping("/offers/{id}")
    void deleteEmployee(@PathVariable Long id) {
        service.deleteWithId(id);
    }

}
