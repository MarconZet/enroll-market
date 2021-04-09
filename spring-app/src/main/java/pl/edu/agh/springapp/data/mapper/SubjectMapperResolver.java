package pl.edu.agh.springapp.data.mapper;

import lombok.RequiredArgsConstructor;
import org.mapstruct.ObjectFactory;
import org.mapstruct.TargetType;
import org.springframework.stereotype.Component;
import pl.edu.agh.springapp.data.model.Subject;
import pl.edu.agh.springapp.repository.SubjectRepository;

@Component
@RequiredArgsConstructor
public class SubjectMapperResolver {
    private final SubjectRepository subjectRepository;

    @ObjectFactory
    public Subject resolve(Long id, @TargetType Class<Subject> type) {
        return subjectRepository.findById(id).orElse(new Subject());
    }
}


