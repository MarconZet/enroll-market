package pl.edu.agh.springapp.security.user;

import org.springframework.stereotype.Component;

@Component
public class DummyUser implements CurrentUser {
    @Override
    public String getFirstname() {
        return "Gal";
    }

    @Override
    public String getSurname() {
        return "Anonim";
    }

    @Override
    public String getIndex() {
        return "666";
    }
}
