package pl.edu.agh.springapp.domain.offer;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.springapp.data.dto.course.CourseDto;
import pl.edu.agh.springapp.data.dto.offer.OfferDto;
import pl.edu.agh.springapp.data.dto.offer.OfferPostDto;

import java.util.ArrayList;
import java.util.List;

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
    @ApiOperation(value = "Get list of offers - paging work, filtering (searching) - not")
    public ResponseEntity<Page<OfferDto>> getAllOffers(
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
        Page<OfferDto> list = service.getAllOffers(pageNo, pageSize);
        System.out.println(search);
        return new ResponseEntity<>(list, new HttpHeaders(), HttpStatus.OK);
    }

    @DeleteMapping("/offers/{id}")
    public ResponseEntity<Boolean> deleteOffer(@PathVariable Long id) {
        service.deleteWithId(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/offers/{id}")
    public ResponseEntity<OfferDto> getOffer(@PathVariable Long id) {
        return ResponseEntity.ok(service.findWithId(id));
    }

    @GetMapping("offers/{id}/can-accept")
    @ApiOperation(value = "Check if you can accept offer - without logic")
    public ResponseEntity<Boolean> canAcceptOffer(@PathVariable Long id) {
        return ResponseEntity.ok(false);
    }

    @GetMapping("offers/{id}/courses")
    @ApiOperation(value = "Get list of matching offers - without logic")
    public ResponseEntity<List<CourseDto>> getCoursesMatchingOffer(@PathVariable Long id) {
        return ResponseEntity.ok(new ArrayList<>());
    }

    @PostMapping("offers/{id}/accept")
    @ApiOperation(value = "Accept offer - without logic")
    public ResponseEntity<Boolean> acceptOffer(@PathVariable Long offerId,
                                               @RequestParam(required = true) Long courseId) {
        return ResponseEntity.ok(true);
    }
}
