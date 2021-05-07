package pl.edu.agh.springapp.domain.subject;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.springapp.data.dto.subject.SubjectAllDto;
import pl.edu.agh.springapp.data.dto.subject.SubjectPostDto;
import pl.edu.agh.springapp.data.dto.subject.SubjectShortDto;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class SubjectController {
    private final SubjectService service;

    @PostMapping("/subjects")
    public SubjectShortDto newSubject(@RequestBody SubjectPostDto subjectPostDto) {
        return service.newSubject(subjectPostDto);
    }

    @GetMapping("/subjects")
    public ResponseEntity<Page<SubjectAllDto>> getAllSubjects(
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize
    ) {
        Page<SubjectAllDto> list = service.getAllSubjects(pageNo, pageSize);
        return new ResponseEntity<>(list, new HttpHeaders(), HttpStatus.OK);
    }

    @DeleteMapping("/subjects/{id}")
    void deleteSubject(@PathVariable Long id) {
        service.deleteSubjectWithId(id);
    }

}
