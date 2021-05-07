package pl.edu.agh.springapp.security.user;

import org.springframework.stereotype.Component;

@Component
public class DummyUser implements CurrentUser {
    @Override
    public String getFirstname() {
        return "Galus";
    }

    @Override
    public String getSurname() {
        return "Anonimus";
    }

    @Override
    public String getIndex() {
        return "123456";
    }
}
