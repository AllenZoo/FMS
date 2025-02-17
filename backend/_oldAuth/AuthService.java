package com.server.service.classes;

import com.server.dao.interfaces.IAuthDao;
import com.server.dto.AuthDto;
import com.server.dto.UserDto;
import com.server.service.BaseService;
import com.server.service.interfaces.IAuthService;
import com.server.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService extends BaseService implements IAuthService {

    @Autowired
    private IAuthDao authDao;

    @Autowired
    private UserService userService;

    @Override
    public AuthDto login(String username, String password) {
        int userId = authDao.getUserId(username, password);

        if (userId != -1) {
            UserDto userDto = userService.getUser(userId);
            String accessToken = JwtUtils.generateToken(
                userDto.getUsername() + " " +
                userDto.getUserID() + " " +
                userDto.getRole()
            );
            String refreshToken = JwtUtils.generateToken(
                userDto.getUsername() + " " +
                userDto.getUserID() + " " +
                userDto.getRole() + " " +
                "refresh"
            );
            return AuthDto.builder()
                    .userID(userId)
                    .username(username)
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .build();
        }

        return null;
    }

    @Override
    // TODO: implement
    public AuthDto logout() {
        return null;
    }

    @Override
    // TODO: implement
    public String refreshToken(String token) {
        return null;
    }
}
