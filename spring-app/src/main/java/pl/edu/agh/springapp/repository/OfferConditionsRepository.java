package pl.edu.agh.springapp.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.edu.agh.springapp.data.model.OfferConditions;

@Repository
public interface OfferConditionsRepository extends CrudRepository<OfferConditions, Long> {
}