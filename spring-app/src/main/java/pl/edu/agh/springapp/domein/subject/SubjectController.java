package pl.edu.agh.springapp.domein.subject;

import lombok.RequiredArgsConstructor;
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
    public List<SubjectAllDto> getAllSubjects() {
        return service.getAllSubjects();
    }

    @DeleteMapping("/subjects/{id}")
    void deleteSubject(@PathVariable Long id) {
        service.deleteSubjectWithId(id);
    }

}
