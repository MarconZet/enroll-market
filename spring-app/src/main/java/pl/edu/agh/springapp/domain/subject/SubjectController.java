package pl.edu.agh.springapp.domain.subject;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.springapp.data.dto.IdListDto;
import pl.edu.agh.springapp.data.dto.subject.SubjectAllDto;
import pl.edu.agh.springapp.data.dto.subject.SubjectPostDto;
import pl.edu.agh.springapp.data.dto.subject.SubjectShortDto;
import pl.edu.agh.springapp.data.dto.teacher.TeacherDto;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class SubjectController {
    private final SubjectService service;

    @PostMapping("/subjects")
    public ResponseEntity<SubjectShortDto> newSubject(@RequestBody SubjectPostDto subjectPostDto) {
        SubjectShortDto subject = service.newSubject(subjectPostDto);
        return new ResponseEntity<>(subject, new HttpHeaders(), HttpStatus.CREATED);
    }

    @GetMapping("/subjects")
    public ResponseEntity<Page<SubjectAllDto>> getAllSubjects(
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize
    ) {
        Page<SubjectAllDto> list = service.getAllSubjects(pageNo, pageSize);
        return new ResponseEntity<>(list, new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping("/subjects/{id}")
    public ResponseEntity<SubjectAllDto> getSubject(@PathVariable Long id) {
        return new ResponseEntity<>(service.getSubjectWithId(id), new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping("/subjects/{id}/teachers")
    public ResponseEntity<IdListDto> getTeachersOfSubject(@PathVariable Long id) {
        IdListDto teachersIds = service.getTeachersOfSubject(id);
        return new ResponseEntity<>(teachersIds, new HttpHeaders(), HttpStatus.OK);
    }
}
