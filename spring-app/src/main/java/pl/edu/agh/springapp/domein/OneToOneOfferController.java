package pl.edu.agh.springapp.domein;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.springapp.data.dto.OneToOneOfferDto;
import pl.edu.agh.springapp.data.dto.OneToOneOfferPostDto;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class OneToOneOfferController {
    private final OneToOneOfferService service;

    @PostMapping("/one-to-one-offers")
    public OneToOneOfferDto newOneToOneOffer(OneToOneOfferPostDto oneToOneOfferPostDto) {
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
