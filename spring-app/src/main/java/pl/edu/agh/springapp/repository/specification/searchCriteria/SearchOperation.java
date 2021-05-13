package pl.edu.agh.springapp.repository.specification.searchCriteria;

import java.util.Optional;

public enum SearchOperation {
    EQUALITY(":"), NEGATION("!");

    private String text;

    SearchOperation(String text) {
        this.text = text;
    }

    public static final String[] SIMPLE_OPERATION_SET = {":", "!"};

    public static Optional<SearchOperation> fromString(String value) {
        for (SearchOperation operation: SearchOperation.values()) {
            if (operation.text.equals(value)) {
                return Optional.of(operation);
            }
        }
        return Optional.empty();
    }
}