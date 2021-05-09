package pl.edu.agh.springapp.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.edu.agh.springapp.data.model.Subject;
import pl.edu.agh.springapp.data.model.Teacher;

import java.util.List;

import java.util.List;

@Repository
public interface SubjectRepository extends PagingAndSortingRepository<Subject, Long> {
    List<Subject> findByName(String name);
    @Query("select distinct t from Teacher t"
            + " join t.courses c"
            + " join c.subject s"
            + " where s.id=:subjectId")
    List<Teacher> findTeachersOf(@Param("subjectId") Long id);
}
