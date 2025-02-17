package com.server.dao.classes;

import com.server.dao.BaseDao;
import com.server.dao.interfaces.IAuthDao;
import com.server.mapper.AuthMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.PlatformTransactionManager;

@Component
public class AuthDao extends BaseDao implements IAuthDao {

    @Autowired
    PlatformTransactionManager transactionManager;

    @Autowired
    AuthMapper authMapper;

    @Override
    public boolean doesAccountExist(String username, String password) {
        return authMapper.doesAccountExist(username, password);
    }

    @Override
    public int getUserId(String username, String password) {
        return authMapper.getUserId(username, password);
    }
 }
