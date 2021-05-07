package pl.edu.agh.springapp.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import pl.edu.agh.springapp.data.model.Student;

@Repository
public interface StudentRepository extends PagingAndSortingRepository<Student, Long> {
}