package pl.edu.agh.springapp.domein;

import pl.edu.agh.springapp.data.dto.DbObjectDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class BasicController {
    private final BasicService service;

    @GetMapping("index")
    public List<DbObjectDto> index() {
        return service.getAll();
    }
}
