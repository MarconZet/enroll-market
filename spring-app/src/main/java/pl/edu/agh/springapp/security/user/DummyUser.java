package pl.edu.agh.springapp.security.user;

import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;
import org.springframework.web.context.annotation.SessionScope;

@RequestScope
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
