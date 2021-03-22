package pl.edu.agh.springapp.domein;

import pl.edu.agh.springapp.repository.DbObjectRepository;
import pl.edu.agh.springapp.data.dto.DbObjectDto;
import pl.edu.agh.springapp.data.model.DbObject;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class BasicService {
    private final DbObjectRepository dbObjectRepository;

    public List<DbObjectDto> getAll() {
        Iterable<DbObject> it = dbObjectRepository.findAll();
        return StreamSupport.stream(it.spliterator(), false).map(x -> new DbObjectDto(x.getS())).collect(Collectors.toList());
    }
}
