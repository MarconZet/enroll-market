package pl.edu.agh.springapp.domein;

import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import pl.edu.agh.springapp.data.dto.DbObjectDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class BasicController {
    private final BasicService service;

    @ApiOperation(value = "An example operation", notes = "Some notes")
    @GetMapping("index")
    @ResponseStatus(HttpStatus.OK)
    public List<DbObjectDto> index() {
        return service.getAll();
    }
}
