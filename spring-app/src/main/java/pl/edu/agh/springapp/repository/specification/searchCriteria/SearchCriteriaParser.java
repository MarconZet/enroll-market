package pl.edu.agh.springapp.repository.specification.searchCriteria;

import org.springframework.data.jpa.domain.Specification;
import pl.edu.agh.springapp.data.model.CourseType;
import pl.edu.agh.springapp.data.model.DayOfWeek;
import pl.edu.agh.springapp.data.model.Offer;
import pl.edu.agh.springapp.error.WrongPathVariableEnumValueException;
import pl.edu.agh.springapp.error.WrongPathVariableException;
import pl.edu.agh.springapp.repository.specification.OfferSpecifications;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class SearchCriteriaParser {
    private static String wordRegex = "[a-zA-Z]\\w*";
    private static String valueRegex = "\\w+";
    private static String operatorRegex = "(:|!)";
    private static String fullRegex = "(" + wordRegex + ")" + operatorRegex + "(" + valueRegex + ")?,";
    private static final Pattern searchPattern = Pattern.compile(fullRegex);

    public List<Specification<Offer>> specificationsFromSearchCriteria(List<SearchCriteria> searchCriteriaList) {
        List<Specification<Offer>> result = new ArrayList<>();
        for (SearchCriteria criteria: searchCriteriaList) {
            switch (criteria.searchCriterion) {
                case DAY:
                    result.add(OfferSpecifications
                            .compareGivenCourseDayOfWeek((DayOfWeek) criteria.getValue(), criteria.getSearchOperation()));
                    break;
                case TEACHER:
                    result.add(OfferSpecifications
                            .compareGivenCourseTeacherId((Long) criteria.getValue(), criteria.getSearchOperation()));
                    break;
                case SUBJECT:
                    result.add(OfferSpecifications
                            .compareGivenCourseSubjectId((Long) criteria.getValue(), criteria.getSearchOperation()));
                    break;
                case COURSE_TYPE:
                    result.add(OfferSpecifications
                            .compareGivenCourseType((CourseType) criteria.getValue(), criteria.getSearchOperation()));
                    break;
            }
        }
        return result;
    }

    public List<SearchCriteria> parse(String searchString) {
        List<SearchCriteria> searchCriterias = new ArrayList<>();
        if (searchString != null) {
            Matcher matcher = searchPattern.matcher(searchString + ",");
            while (matcher.find()) {
                SearchCriteria searchCriteria = new SearchCriteria();
                SearchCriterion criterion = SearchCriterion.fromString(matcher.group(1)).orElseThrow(() -> new WrongPathVariableException(true, matcher.group(1)));
                searchCriteria.setSearchCriterion(criterion);

                SearchOperation operation = SearchOperation.fromString(matcher.group(2)).orElseThrow(() -> new WrongPathVariableException(true, matcher.group(2)));
                searchCriteria.setSearchOperation(operation);

                parseValue(searchCriteria, criterion, matcher.group(3));

                searchCriterias.add(searchCriteria);
            }
        }
        return searchCriterias;
    }

    private void parseValue(SearchCriteria criteria, SearchCriterion criterion, String value) {
        switch (criterion) {
            case DAY:
                DayOfWeek day = DayOfWeek.fromString(value).orElseThrow(() -> new WrongPathVariableEnumValueException(value, DayOfWeek.values()));
                if (day == null) {
                    throw new WrongPathVariableException(false, value);
                }
                criteria.setValue(day);
                break;
            case COURSE_TYPE:
                CourseType type = CourseType.fromString(value).orElseThrow(() -> new WrongPathVariableEnumValueException(value, CourseType.values()));
                if (type == CourseType.LECTURE) {
                    throw new WrongPathVariableException(false, value);
                }
                criteria.setValue(type);
                break;
            case SUBJECT:
            case TEACHER:
                try {
                    Long id = Long.parseLong(value);
                    criteria.setValue(id);
                } catch (NumberFormatException e) {
                    throw new WrongPathVariableException(false, value + " is not id!");
                }
                break;
        }
    }

    public <T, V extends Specification<T>> Optional<Specification<T>> andSpecification(List<V> criteria) {
        Iterator<V> itr = criteria.iterator();
        if (itr.hasNext()) {
            Specification<T> spec = Specification.where(itr.next());
            while (itr.hasNext()) {
                spec = spec.and(itr.next());
            }
            return Optional.of(spec);
        }
        return Optional.empty();
    }
}
