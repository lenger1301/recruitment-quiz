package com.example.onlinequizsystem.service;

import com.example.onlinequizsystem.domain.AppUserDetails;
import com.example.onlinequizsystem.model.User;
import com.example.onlinequizsystem.repo.UserRepo;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional
@Qualifier("userDetailsService")
public class UserService implements UserDetailsService {
    private final UserRepo userRepo;
    private final BCryptPasswordEncoder passwordEncoder;
    private final EmailSenderService emailSenderService;

    public UserService(UserRepo userRepo, BCryptPasswordEncoder passwordEncoder, EmailSenderService emailSenderService) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.emailSenderService = emailSenderService;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepo.findUserByEmail(email);
        if(user == null) {
            throw new UsernameNotFoundException("Email not found");
        }else {
            return new AppUserDetails(user);
        }
    }

    public User addUser(String firstname, String lastName, String email, String password, long roleId) {
        User user = new User();
        if(userRepo.findUserByEmail(email) != null) {
            return null;
        }
        user.setFirstName(firstname);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setPassword(encodedPassword(password));
        user.setRoleId(roleId);
        user.setCreated(new Date());
        user.setStatus(true);
        userRepo.save(user);
        return user;
    }

    public User updateUser(String currentEmail, String firstName, String lastName, long roleId) {
        User currentUser = userRepo.findUserByEmail(currentEmail);
        if(currentUser == null) {
            return null;
        }
        currentUser.setFirstName(firstName);
        currentUser.setLastName(lastName);
        currentUser.setRoleId(roleId);
        userRepo.save(currentUser);
        return currentUser;
    }

    public User sendEmail(String email) {
        User user = userRepo.findUserByEmail(email);
        if(user == null)  {
            return null;
        }
        emailSenderService.sendEmail(email, "Reset Password Form Link", "http://localhost:4200/resetPassword");
        return user;
    }

    public List<User> getUsers() {
        return userRepo.findAll();
    }

    public void deleteUser(long id) {
        userRepo.deleteById(id);
    }

    public User findUserByEmail(String email) {
        return this.userRepo.findUserByEmail(email);
    }

    private String encodedPassword(String password) {
        return passwordEncoder.encode(password);
    }
}
