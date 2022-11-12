import org.assertj.core.api.Assertions.fail
import org.junit.jupiter.api.Test


class SimpleMessageContract {
    @Test
    fun `list messages`(){
        fail<Nothing>("interact with server http://localhost:8080/:userId/messages and user id 1")
    }
}