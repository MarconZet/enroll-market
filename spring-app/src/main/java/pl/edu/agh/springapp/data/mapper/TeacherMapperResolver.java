package pl.edu.agh.springapp.data.mapper;

import lombok.RequiredArgsConstructor;
import org.mapstruct.ObjectFactory;
import org.mapstruct.TargetType;
import org.springframework.stereotype.Component;
import pl.edu.agh.springapp.data.model.Teacher;
import pl.edu.agh.springapp.error.WrongFieldsException;
import pl.edu.agh.springapp.repository.TeacherRepository;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class TeacherMapperResolver {
    private final TeacherRepository teacherRepository;

    @ObjectFactory
    public Teacher resolve(Long id, @TargetType Class<Teacher> type) {
        Optional<Teacher> teacher = teacherRepository.findById(id);
        if (teacher.isPresent()) {
            return teacher.get();
        } else {
            throw new WrongFieldsException("No teacher with id: " + id);
        }
    }
}


