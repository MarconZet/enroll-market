package pl.edu.agh.springapp.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.edu.agh.springapp.data.model.Offer;

@Repository
public interface OfferRepository extends CrudRepository<Offer, Long> {
}
