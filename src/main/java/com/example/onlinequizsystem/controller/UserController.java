package com.example.onlinequizsystem.controller;

import com.example.onlinequizsystem.domain.AppUserDetails;
import com.example.onlinequizsystem.domain.CustomHttpResponse;
import com.example.onlinequizsystem.model.User;
import com.example.onlinequizsystem.service.UserService;
import com.example.onlinequizsystem.util.JwtTokenProvider;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.NO_CONTENT;
import static org.springframework.http.HttpStatus.OK;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserController(UserService userService, AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider, BCryptPasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        authenticate(user.getEmail(), user.getPassword());
        User loginUser = userService.findUserByEmail(user.getEmail());
        AppUserDetails appUserDetails = new AppUserDetails(loginUser);
        HttpHeaders jwtHeader = getJwtHeader(appUserDetails);
        return new ResponseEntity<>(loginUser, jwtHeader, OK);
    }

    @PostMapping("/add")
    public ResponseEntity<User> addUser(@RequestParam("email") String email,
                                        @RequestParam("firstName") String firstName,
                                        @RequestParam("lastName") String lastName,
                                        @RequestParam("password") String password,
                                        @RequestParam("roleId") long roleId) {
        User registerUser = userService.addUser(firstName, lastName, email, password, roleId);
        return new ResponseEntity<>(registerUser, OK);
    }

    @PostMapping("/update")
    public ResponseEntity<User> update(@RequestParam("currentEmail") String currentEmail,
                       @RequestParam("firstName") String firstName,
                       @RequestParam("lastName") String lastName,
                       @RequestParam("roleId") long roleId) {
        User updatedUser = userService.updateUser(currentEmail, firstName, lastName, roleId);
        return new ResponseEntity<>(updatedUser, NO_CONTENT);
    }

    @PostMapping("/resetPassword")
    public ResponseEntity<User> resetPassword(@RequestParam("email") String email) {
        User user = userService.sendEmail(email);
        return new ResponseEntity<>(user, OK);
    }

    @GetMapping("/list")
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userService.getUsers();
        return new ResponseEntity<>(users, OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<CustomHttpResponse> deleteUser(@PathVariable long id) {
        this.userService.deleteUser(id);
        return new ResponseEntity<>(NO_CONTENT);
    }

    private HttpHeaders getJwtHeader(AppUserDetails appUserDetails) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Jwt-Token",jwtTokenProvider.generateJwtToken(appUserDetails));
        return headers;
    }

    private void authenticate(String email, String password) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
    }
}
