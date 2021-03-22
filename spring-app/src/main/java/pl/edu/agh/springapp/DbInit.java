package pl.edu.agh.springapp;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import pl.edu.agh.springapp.data.model.DbObject;
import pl.edu.agh.springapp.repository.DbObjectRepository;

import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DbInit implements CommandLineRunner {
    private final DbObjectRepository repository;

    @Override
    public void run(String... args) throws Exception {
        List<DbObject> dbObjects = Arrays.asList(new DbObject(0L, "a"), new DbObject(0L, "b"), new DbObject(0L, "c"));
        repository.saveAll(dbObjects);
    }
}
