package pl.edu.agh.springapp.repository.specification.searchCriteria;

import lombok.Data;

@Data
public class SearchCriteria {
    SearchCriterion searchCriterion;
    SearchOperation searchOperation;
    Object value;
}
