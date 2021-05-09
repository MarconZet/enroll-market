package pl.edu.agh.springapp.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.edu.agh.springapp.data.model.Offer;
import pl.edu.agh.springapp.data.model.Teacher;

import java.util.List;

@Repository
public interface OfferRepository extends PagingAndSortingRepository<Offer, Long> {
    Page<Offer> findAllByIsOneToOne(boolean isOneToOne, Pageable pageable);
    List<Offer> findAllByOfferConditions_TeachersId(Long id);
    @Query("select distinct offer from Offer offer"
            + " join offer.student s"
            + " where s.indexNumber<>:studentIndex")
    Page<Offer> findOffersWhereStudentIsNot(@Param("studentIndex") String index, Pageable pageable);
}
