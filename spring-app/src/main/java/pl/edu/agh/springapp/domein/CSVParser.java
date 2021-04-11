package pl.edu.agh.springapp.domein;

import com.fasterxml.jackson.databind.MappingIterator;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

public class CSVParser {

    public CSVParser() {
        ;
    }

    private static List<Object> loadObjectList(InputStream file) {
        try {
            CsvSchema bootstrapSchema = CsvSchema.emptySchema().withHeader();
            Reader reader = new InputStreamReader(file);
            CsvMapper mapper = new CsvMapper();

            MappingIterator<ParsingContainerDTO> it = mapper
                    .readerFor(ParsingContainerDTO.class)
                    .with(bootstrapSchema)
                    .readValues(reader);
            return Collections.singletonList(it.readAll());
        } catch (Exception e) {
//            logger.error("Error occurred while loading object list from file ", e);
        }
        return new LinkedList<>();
    }

    public List<Object> read(InputStream file) {
        List<Object> objects = loadObjectList(file);
        return objects.stream().map(obj -> {
            Pool pool = obj.toEmptyPool();
            pool.setTools(toolsForPool(obj, pool).toJavaList());
            return pool;
        });
    }
}
