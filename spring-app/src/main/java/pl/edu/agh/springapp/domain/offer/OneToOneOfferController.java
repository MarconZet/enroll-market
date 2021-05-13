package pl.edu.agh.springapp.domain.offer;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
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
    public ResponseEntity<OneToOneOfferDto> newOneToOneOffer(@RequestBody OneToOneOfferPostDto oneToOneOfferPostDto) {
        return new ResponseEntity<>(service.newOneToOneOffer(oneToOneOfferPostDto), new HttpHeaders(), HttpStatus.CREATED);
    }

    @GetMapping("/one-to-one-offers")
    @ApiOperation(value = "Get list of offers - paging work")
    public ResponseEntity<Page<OneToOneOfferDto>> getAllOffers(
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @ApiParam(value = "Used format: \n\n" +
                    "`/?search=searchCriterion:value,searchCriterion2:value`\n\n" +
                    "**Search criterion is one of:**\n" +
                    "- subject (value is id of subject)\n" +
                    "- courseType (value is one of enum: PROJECT, LABORATORY, LESSON)\n" +
                    "- teacher (value is id of teacher)\n" +
                    "- day (value is one of enum: MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY)\n\n" +
                    "**Allowed operation:**\n" +
                    "- : (Equality, =)\n" +
                    "- ! (Negation, not equal)\n\n" +
                    "**Example:**\n" +
                    "`subject:1,courseType!PROJECT,teacher!2,day!MONDAY,day!WEDNESDAY`",
                    example = "subject:1,courseType!PROJECT,teacher!2,day!MONDAY,day!WEDNESDAY"
            )
            @RequestParam(required = false) String search
    ) {
        Page<OneToOneOfferDto> list = service.getAllOneToOneOffers(search, pageNo, pageSize);
        return new ResponseEntity<>(list, new HttpHeaders(), HttpStatus.OK);
    }

    @DeleteMapping("/one-to-one-offers/{id}")
    public ResponseEntity<Boolean> deleteOneToOneOffer(@PathVariable Long id) {
        service.deleteWithId(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/one-to-one-offers/{id}")
    @ApiOperation(value = "Get offer with id")
    public ResponseEntity<OneToOneOfferDto> getOneToOneOffer(@PathVariable Long id) {
        return ResponseEntity.ok(service.findWithId(id));
    }

}
