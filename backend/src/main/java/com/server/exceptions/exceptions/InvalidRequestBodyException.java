package com.server.exceptions.exceptions;

public class InvalidRequestBodyException extends RuntimeException {
    public InvalidRequestBodyException(String message) {
        super(message);
    }

    public InvalidRequestBodyException(String message, Throwable cause) {
        super(message, cause);
    }
}
