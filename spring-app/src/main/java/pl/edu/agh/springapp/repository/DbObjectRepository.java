package pl.edu.agh.springapp.repository;

import pl.edu.agh.springapp.data.model.DbObject;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DbObjectRepository extends CrudRepository<DbObject, Long> {
}
