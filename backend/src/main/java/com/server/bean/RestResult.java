package com.server.bean;


import com.fasterxml.jackson.annotation.JsonRawValue;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.server.util.parsing.UnderscoreNamingStrategy;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RestResult<T> {
    public enum Code {
        SUCCESS_OK(SUCCESS_CODE_OK),
        SUCCESS_CREATED(SUCCESS_CODE_CREATED),
        SUCCESS_ACCEPTED(SUCCESS_CODE_ACCEPTED),
        SUCCESS_NO_CONTENT(SUCCESS_CODE_NO_CONTENT),

        ERROR_BAD_REQUEST(ERROR_CODE_BAD_REQUEST),
        ERROR_UNAUTHORIZED(ERROR_CODE_UNAUTHORIZED),
        ERROR_FORBIDDEN(ERROR_CODE_FORBIDDEN),
        ERROR_NOT_FOUND(ERROR_CODE_NOT_FOUND),

        ERROR_INTERNAL_SERVER(ERROR_CODE_INTERNAL_SERVER);

        private final int value;

        Code(int s) {
            this.value = s;
        }

        public int getValue() {
            return value;
        }
    }

    private static final String SUCCESS = "success";
    private static final String ERROR = "error";
    private static final int SUCCESS_CODE_OK = 200;
    private static final int SUCCESS_CODE_CREATED = 201;
    private static final int SUCCESS_CODE_ACCEPTED = 202;
    private static final int SUCCESS_CODE_NO_CONTENT = 204;

    private static final int ERROR_CODE_BAD_REQUEST = 400;
    private static final int ERROR_CODE_UNAUTHORIZED = 401;
    private static final int ERROR_CODE_FORBIDDEN = 403;
    private static final int ERROR_CODE_NOT_FOUND = 404;

    private static final int ERROR_CODE_INTERNAL_SERVER = 500;

    private String status;
    private String message;

    @JsonRawValue
    private T data;
    private int resultCode;


    // Helper Refs
    private static final Gson gson = new GsonBuilder()
            .setFieldNamingStrategy(new UnderscoreNamingStrategy())
            .create();

    /**
     * Returns a generic 200 OK response with default 'success' msg.
     *
     * @param data
     */
    public static <T> RestResult<T> success(final T data) {
        return success(data, SUCCESS);
    }

    /**
     * Returns a generic 200 OK response with data and msg.
     *
     * @param data
     * @param msg
     * @return
     * @param <T>
     */
    public static <T> RestResult<T> success(final T data, final String msg) {
        return success(data, msg, Code.SUCCESS_OK);
    }

    /**
     * Returns response with default 'success' msg.
     *
     * @param data
     * @param successCode
     * @return
     * @param <T>
     */
    public static <T> RestResult<T> success(final T data, final Code successCode) {
        return success(data, SUCCESS, successCode);
    }

    /**
     * Returns a success response.
     *
     * @param data
     * @param msg
     * @param successCode
     * @return
     * @param <T>
     */
    public static <T> RestResult<T> success(final T data, final String msg, final Code successCode) {
        final RestResult restResult = new <T>RestResult();
        restResult.setData(gson.toJson(data));
        restResult.setStatus(SUCCESS);
        restResult.setMessage(msg);
        restResult.setResultCode(successCode.getValue());
        return restResult;
    }

    /**
     * Returns a 'fail' response with generic ERROR_BAD_REQUEST code.
     *
     * @param data
     * @param msg
     * @return
     * @param <T>
     */
    public static <T> RestResult<T> fail(final T data, final String msg) {
        return fail(data, msg, Code.ERROR_BAD_REQUEST);
    }

    /**
     * Returns a 'fail' response
     *
     * @param data
     * @param msg
     * @param failCode
     * @return
     * @param <T>
     */
    public static <T> RestResult<T> fail(final T data, final String msg, Code failCode) {
        final RestResult restResult = new <T>RestResult();
        restResult.setData(gson.toJson(data));
        restResult.setStatus(ERROR);
        restResult.setMessage(msg);
        restResult.setResultCode(failCode.getValue());
        return restResult;
    }

    /**
     * Parses a JSON string into a RestResult object.
     * @param json JSON string
     */
    public static <T> RestResult<T> parse(final String json) {
        return gson.fromJson(json, RestResult.class);
    }
}
