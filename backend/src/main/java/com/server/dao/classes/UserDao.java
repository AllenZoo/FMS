package com.server.dao.classes;

import com.server.dao.BaseDao;
import com.server.dao.interfaces.IUserDao;
import com.server.mapper.UserMapper;
import com.server.model.user.UserModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
public class UserDao extends BaseDao implements IUserDao {
	
    @Autowired
    PlatformTransactionManager transactionManager;

    @Autowired
    UserMapper userMapper;

    @Override
    public List<UserModel> getUser() {
        return userMapper.getAllUser();
    }

    @Override
    public UserModel getUser(int userID) {
        return userMapper.getUserByID(userID);
    }

    @Override
    @Transactional
    public void insertUser(UserModel userModel) {
        userMapper.insertUser(userModel);
    }

    @Override
    @Transactional
    public void updateUser(UserModel userModel, int userID) {
        userMapper.updateUser(userModel, userID);
    }

    @Override
    @Transactional
    public void patchUser(UserModel userModel, int userID) {
        userMapper.patchUser(userModel, userID);
    }

    @Override
    @Transactional
    public void deleteUser(int userID) {
        userMapper.deleteUser(userID);
    }
}
