package pl.edu.agh.springapp.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.edu.agh.springapp.data.model.DbObject;
import pl.edu.agh.springapp.data.model.SubjectGroup;
import pl.edu.agh.springapp.data.model.Teacher;

import java.time.LocalTime;
import java.util.List;

@Repository
public interface SubjectGroupRepository extends CrudRepository<SubjectGroup, Long> {
    List<SubjectGroup> findByStartTimeAndTeacher(LocalTime startTime, Teacher teacher);
}