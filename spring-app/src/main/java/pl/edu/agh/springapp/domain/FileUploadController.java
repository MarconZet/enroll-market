package pl.edu.agh.springapp.domain;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.io.IOException;
import java.io.InputStream;

@RestController
@RequiredArgsConstructor
@Slf4j
public class FileUploadController {

    private final FileUploadService fileUploadService;

    @GetMapping("/enroll/download")
    public ResponseEntity<String> handleFileDownload() {

        // create file to send
        String fileContent = fileUploadService.getFile();

        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + "enroll_groups" + "\"").body(fileContent);
    }

    @PostMapping("/enroll/upload")
    public ResponseEntity<Void> handleFileUpload(InputStream dataStream) throws IOException {
        fileUploadService.loadFile(dataStream);
        return ResponseEntity.ok().build();
    }
}
