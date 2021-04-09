package pl.edu.agh.springapp.data.mapper;

import lombok.RequiredArgsConstructor;
import org.mapstruct.ObjectFactory;
import org.mapstruct.TargetType;
import org.springframework.stereotype.Component;
import pl.edu.agh.springapp.data.model.Subject;
import pl.edu.agh.springapp.data.model.Teacher;
import pl.edu.agh.springapp.repository.SubjectRepository;
import pl.edu.agh.springapp.repository.TeacherRepository;

@Component
@RequiredArgsConstructor
public class TeacherMapperResolver {
    private final TeacherRepository teacherRepository;

    @ObjectFactory
    public Teacher resolve(Long id, @TargetType Class<Teacher> type) {
        return teacherRepository.findById(id).orElse(new Teacher());
    }
}


