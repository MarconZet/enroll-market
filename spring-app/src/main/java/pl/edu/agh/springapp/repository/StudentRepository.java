package pl.edu.agh.springapp.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.edu.agh.springapp.data.model.Student;
import pl.edu.agh.springapp.data.model.Teacher;

import java.util.List;

import java.util.List;

@Repository
public interface StudentRepository extends PagingAndSortingRepository<Student, Long> {
    Student findFirstByIndexNumber(String indexNumber);
    boolean existsByIndexNumber(String indexNumber);
}
