package pl.edu.agh.springapp.domein;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FileUploadService {

    private final CSVParser fileParser;

    public FileUploadService(CSVParser fileParser) {
        this.fileParser = fileParser;
    }

    public void loadFile(MultipartFile file) throws IOException {
        save(parse(file));
    }

    public List<Object> parse(MultipartFile file) throws IOException {
        return fileParser.read(file.getInputStream());
    }

    public void save(List<Object> subjects) {
        poolRepository.saveAll(subjects);
    }
}
