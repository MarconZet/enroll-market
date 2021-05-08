package pl.edu.agh.springapp.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import pl.edu.agh.springapp.data.model.Subject;

import java.util.List;

@Repository
public interface SubjectRepository extends PagingAndSortingRepository<Subject, Long> {
    List<Subject> findByName(String name);
}