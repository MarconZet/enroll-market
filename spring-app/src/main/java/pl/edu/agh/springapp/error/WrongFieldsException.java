package pl.edu.agh.springapp.error;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.IntStream;

public class WrongFieldsException extends RuntimeException {

    public WrongFieldsException(String message, String... wrongParams) {
        super(WrongFieldsException.generateMessage(message, toMap(String.class, String.class, wrongParams)));
    }

    private static String generateMessage(String message, Map<String, String> searchParams) {
        if (searchParams.size() > 0) {
            return message + " Wrong fields: " + searchParams;
        } else {
            return message;
        }
    }

    private static <K, V> Map<K, V> toMap(
            Class<K> keyType, Class<V> valueType, Object... entries) {
        if (entries.length % 2 == 1)
            throw new IllegalArgumentException("Invalid entries");
        return IntStream.range(0, entries.length / 2).map(i -> i * 2)
                .collect(HashMap::new,
                        (m, i) -> m.put(keyType.cast(entries[i]), valueType.cast(entries[i + 1])),
                        Map::putAll);
    }

}