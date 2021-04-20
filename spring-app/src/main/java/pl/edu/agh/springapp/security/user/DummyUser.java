package pl.edu.agh.springapp.security.user;

import org.springframework.stereotype.Component;

@Component
public class DummyUser implements CurrentUser {
    @Override
    public String getFirstname() {
        return "";
    }

    @Override
    public String getSurname() {
        return "";
    }

    @Override
    public String getIndex() {
        return "";
    }
}
