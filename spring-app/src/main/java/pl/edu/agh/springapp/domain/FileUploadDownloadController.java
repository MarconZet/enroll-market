package pl.edu.agh.springapp.domain;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.io.InputStream;

@RestController
@RequiredArgsConstructor
@Slf4j
public class FileUploadDownloadController {

    private final FileUploadDownloadService fileUploadDownloadService;

    @GetMapping("/enroll/download/all")
    public ResponseEntity<String> handleFileDownloadAll() {

        // create file to send
        String fileContent = fileUploadDownloadService.getFileWithAll();

        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + "enroll_groups.csv" + "\"").body(fileContent);
    }

    @GetMapping("/enroll/download/student/{index}")
    public ResponseEntity<String> handleFileDownloadStudentPlan(@PathVariable("index") String index) {
        String fileContent = fileUploadDownloadService.getFileForStudent(index);

        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + "student_groups.csv" + "\"").body(fileContent);
    }

    @GetMapping("/enroll/download/teacher/{id}")
    public ResponseEntity<String> handleFileDownloadTeacherPlan(@PathVariable("id") Long id) {

        String fileContent = fileUploadDownloadService.getFileForTeacher(id);

        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + "teacher_groups.csv" + "\"").body(fileContent);
    }

    @PostMapping("/enroll/upload")
    public ResponseEntity<Void> handleFileUpload(InputStream dataStream) throws IOException {
        fileUploadDownloadService.loadFile(dataStream);
        return ResponseEntity.ok().build();
    }
}
