package pl.edu.agh.springapp.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import pl.edu.agh.springapp.data.model.Offer;

import java.util.List;

@Repository
public interface OfferRepository extends PagingAndSortingRepository<Offer, Long> {
    Page<Offer> findAllByIsOneToOne(boolean isOneToOne, Pageable pageable);
}
