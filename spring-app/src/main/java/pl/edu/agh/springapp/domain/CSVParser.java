package pl.edu.agh.springapp.domain;

import com.fasterxml.jackson.databind.MappingIterator;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import pl.edu.agh.springapp.data.dto.parsingContainer.ParsingContainerDTO;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.LinkedList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CSVParser {

    private static List<ParsingContainerDTO> loadObjectList(InputStream file) {
        try {
            CsvSchema bootstrapSchema = CsvSchema.emptySchema().withHeader();
            Reader reader = new InputStreamReader(file);
            CsvMapper mapper = new CsvMapper();

            mapper.schemaFor(ParsingContainerDTO.class).withHeader();

            MappingIterator<ParsingContainerDTO> it = mapper
                    .readerFor(ParsingContainerDTO.class)
                    .with(bootstrapSchema)
                    .readValues(reader);
            return it.readAll();
        } catch (Exception e) {
            log.error("Error occurred while loading object list from file ", e);
        }
        return new LinkedList<>();
    }

    public List<ParsingContainerDTO> read(InputStream file) {
        List<ParsingContainerDTO> records = loadObjectList(file);
        return records;
    }
}
