package pl.edu.agh.springapp.security.user;


/**
 * Usage example
 * <pre>{@code
 * @RequiredArgsConstructor
 * @RestController
 * public class UseExample {
 *     private final CurrentUser currentUser;
 *
 *     @GetMapping("")
 *     List<String> getInfo() {
 *         return Arrays.asList(currentUser.getFirstname(), currentUser.getSurname(), currentUser.getIndex());
 *     }
 * }
 * }</pre>
 */
public interface CurrentUser {
    String getFirstname();

    String getSurname();

    String getIndex();
}
