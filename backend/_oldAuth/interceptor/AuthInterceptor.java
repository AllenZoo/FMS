package com.server.interceptor;

import com.server.annotations.Auth;
import com.server.util.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

@Component
public class AuthInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle
            (HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        System.out.println("Pre Handle method is Calling");

        if (handler instanceof HandlerMethod) {
            Auth authAnnotation = ((HandlerMethod) handler).getMethodAnnotation(Auth.class);

            boolean isRequired = false;
            if (authAnnotation != null) {
                isRequired = authAnnotation.isRequired();
            } else {
                authAnnotation = ((HandlerMethod) handler).getBeanType().getAnnotation(Auth.class);

                if (authAnnotation != null) {
                    isRequired = authAnnotation.isRequired();
                }
            }

            if (isRequired) {
                return authenticate(request);
            }
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response,
                           Object handler, ModelAndView modelAndView) throws Exception {

        System.out.println("Post Handle method is Calling");
    }
    @Override
    public void afterCompletion
            (HttpServletRequest request, HttpServletResponse response, Object
                    handler, Exception exception) throws Exception {

        System.out.println("Request and Response is completed");
    }

    private boolean authenticate(HttpServletRequest request) {
        boolean isAuthenticated = true;
        String jwtToken = request.getHeader("Authorization");
        if (!JwtUtils.validateToken(jwtToken)) {
            isAuthenticated = false;
        }
        return isAuthenticated;
    }
}
