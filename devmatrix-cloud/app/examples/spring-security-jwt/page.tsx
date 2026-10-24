"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Key,
  Users,
  Database,
  FileCode,
  CheckCircle,
  ChevronRight,
  Copy,
  Check,
  Terminal,
  BookOpen,
  Server,
  Settings
} from "lucide-react";

export default function SpringSecurityJwtExample() {
  const [activeSection, setActiveSection] = useState("intro");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const sections = [
    { id: "intro", title: "Overview & Dependencies", icon: <ShieldCheck className="w-5 h-5" /> },
    { id: "properties", title: "Configuration", icon: <Settings className="w-5 h-5" /> },
    { id: "entity", title: "Entity & Repository", icon: <Database className="w-5 h-5" /> },
    { id: "security", title: "Security Configuration", icon: <Lock className="w-5 h-5" /> },
    { id: "jwt", title: "JWT Utility & Filter", icon: <Key className="w-5 h-5" /> },
    { id: "service", title: "UserDetailsService", icon: <Users className="w-5 h-5" /> },
    { id: "controller", title: "Controllers & Flow", icon: <Server className="w-5 h-5" /> },
    { id: "exception", title: "Exception Handling", icon: <CheckCircle className="w-5 h-5" /> },
    { id: "testing", title: "Testing APIs", icon: <Terminal className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-black text-purple-50 font-sans selection:bg-purple-500/30 selection:text-purple-100">

      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[100px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto pt-24 pb-20 px-4 sm:px-6 lg:px-8">

        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-purple-400 mb-8 font-medium">
          <Link href="/examples" className="hover:text-purple-300 transition-colors">Examples</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-purple-200">Spring Security JWT</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300">
                Spring Security 6 + JWT
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-200/70 max-w-4xl mx-auto leading-relaxed">
              A complete, production-ready guide to securing a Spring Boot 3 API with stateless JSON Web Tokens (JWT), Role-Based Access Control, and MySQL.
            </p>
          </motion.div>

          {/* Stats / Tech Stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            {["Spring Boot 3.x", "Spring Security 6", "Java 17+", "MySQL", "JJWT", "Lombok"].map((tech) => (
              <span key={tech} className="px-4 py-2 rounded-full bg-purple-900/30 border border-purple-500/20 text-purple-300 text-sm font-semibold shadow-[0_0_15px_rgba(168,85,247,0.1)] backdrop-blur-sm">
                {tech}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="hidden lg:block space-y-2 sticky top-24 h-fit">
            <h3 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-4 px-3">Table of Contents</h3>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left ${
                  activeSection === section.id
                    ? "bg-indigo-600/20 text-indigo-100 border border-indigo-500/30 shadow-lg shadow-indigo-900/20"
                    : "text-purple-400 hover:bg-purple-900/10 hover:text-purple-200"
                }`}
              >
                <div className={`${activeSection === section.id ? "text-indigo-300" : "opacity-50"}`}>
                  {section.icon}
                </div>
                <span className="font-medium text-sm">{section.title}</span>
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-24">

            {/* Section 1: Introduction & Dependencies */}
            <section id="intro" className="scroll-mt-32">
              <ContentCard title="Overview & Dependencies" icon={<ShieldCheck />}>
                <div className="prose prose-invert prose-purple max-w-none">
                  <p className="text-lg text-purple-100/90 leading-relaxed mb-6">
                    This example demonstrates a clean architecture approach to implementing stateless authentication using <strong>Spring Boot 3</strong> and <strong>Spring Security 6</strong>. We replace the deprecated `WebSecurityConfigurerAdapter` with a modern `SecurityFilterChain` component.
                  </p>
                  <p className="text-purple-200/80 mb-6">
                    <strong>The Flow:</strong> A user logs in via a POST request. The server verifies the credentials against a MySQL database. If valid, the server generates a JWT containing the user's roles and signs it. For all subsequent requests, the client sends this JWT in the `Authorization` header. Our custom filter intercepts the request, validates the token, and populates the `SecurityContext`.
                  </p>

                  <h3 className="text-xl font-bold text-purple-100 mt-8 mb-4">pom.xml Dependencies</h3>
                  <p className="text-purple-200/80 mb-4">
                    Add the required dependencies for Spring Web, Security, Data JPA, MySQL, Lombok, and the JJWT library for token generation/validation.
                  </p>

                  <CodeBlock
                    language="xml"
                    title="pom.xml"
                    code={`<!-- Spring Boot Starters -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<!-- Database -->
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>

<!-- Lombok -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>

<!-- JWT Dependencies (JJWT 0.12.x) -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.12.5</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.12.5</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.12.5</version>
    <scope>runtime</scope>
</dependency>`}
                    onCopy={copyToClipboard}
                    copiedId={copiedCode}
                    id="pom-xml"
                  />
                </div>
              </ContentCard>
            </section>

            {/* Section 2: Properties */}
            <section id="properties" className="scroll-mt-32">
              <ContentCard title="Application Properties" icon={<Settings />}>
                <div className="prose prose-invert prose-purple max-w-none">
                  <p className="text-purple-200/80 mb-4">
                    Configure your MySQL connection and define the secret key and expiration time for your JWTs.
                  </p>

                  <CodeBlock
                    language="properties"
                    title="application.properties"
                    code={`# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/security_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root

# Hibernate Settings
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# JWT Configuration
# MUST be at least 256 bits (32 bytes) long for HS256
app.jwt.secret=your_super_secret_key_which_must_be_long_enough_for_hmac_sha256
app.jwt.expiration-ms=86400000`}
                    onCopy={copyToClipboard}
                    copiedId={copiedCode}
                    id="app-properties"
                  />
                  <div className="mt-4 p-4 bg-indigo-900/10 rounded-xl border border-indigo-500/20">
                     <p className="text-sm text-indigo-200/70">
                        <strong>Note:</strong> `spring.jpa.hibernate.ddl-auto=update` is used here for convenience during development to automatically create tables. In a real production environment, use a database migration tool like Flyway or Liquibase.
                     </p>
                  </div>
                </div>
              </ContentCard>
            </section>

            {/* Section 3: Entity & Repository */}
            <section id="entity" className="scroll-mt-32">
              <ContentCard title="User Entity & Repository" icon={<Database />}>
                <div className="prose prose-invert prose-purple max-w-none">
                  <p className="text-purple-200/80 mb-4">
                    We define a `User` entity to map to the `users` table and a `Role` enum for authorization. We implement Spring Security's `UserDetails` interface directly on our entity for simplicity, though mapping to a separate DTO is also common.
                  </p>

                  <CodeBlock
                    language="java"
                    title="entity/Role.java"
                    code={`package com.example.security.entity;

public enum Role {
    USER,
    ADMIN
}`}
                    onCopy={copyToClipboard}
                    copiedId={copiedCode}
                    id="role-enum"
                  />

                  <CodeBlock
                    language="java"
                    title="entity/User.java"
                    code={`package com.example.security.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    // --- UserDetails Methods ---

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return true; }
}`}
                    onCopy={copyToClipboard}
                    copiedId={copiedCode}
                    id="user-entity"
                  />

                  <CodeBlock
                    language="java"
                    title="repository/UserRepository.java"
                    code={`package com.example.security.repository;

import com.example.security.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);
}`}
                    onCopy={copyToClipboard}
                    copiedId={copiedCode}
                    id="user-repository"
                  />
                </div>
              </ContentCard>
            </section>

             {/* Section 4: Security Configuration */}
             <section id="security" className="scroll-mt-32">
              <ContentCard title="Security Configuration (Spring 6)" icon={<Lock />}>
                <div className="prose prose-invert prose-purple max-w-none">
                  <p className="text-purple-200/80 mb-4">
                    This is the heart of the setup. We configure a `SecurityFilterChain` bean to define authorization rules, disable CSRF (since we use tokens, not cookies), and set session management to `STATELESS`. We also expose `AuthenticationManager` and `PasswordEncoder` as beans.
                  </p>

                  <CodeBlock
                    language="java"
                    title="config/SecurityConfig.java"
                    code={`package com.example.security.config;

import com.example.security.service.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final CustomUserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/**", "/api/public/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/user/**").hasAnyRole("USER", "ADMIN")
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authenticationProvider(authenticationProvider())
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}`}
                    onCopy={copyToClipboard}
                    copiedId={copiedCode}
                    id="security-config"
                  />
                </div>
              </ContentCard>
            </section>

             {/* Section 5: JWT Utility & Filter */}
             <section id="jwt" className="scroll-mt-32">
              <ContentCard title="JWT Utility & Filter" icon={<Key />}>
                <div className="prose prose-invert prose-purple max-w-none">
                  <p className="text-purple-200/80 mb-4">
                    `JwtUtil` handles token creation and validation. `JwtAuthenticationFilter` intercepts HTTP requests, extracts the token, validates it, and sets the Spring `SecurityContext`.
                  </p>

                  <CodeBlock
                    language="java"
                    title="util/JwtUtil.java"
                    code={`package com.example.security.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    @Value("\${app.jwt.secret}")
    private String secretKey;

    @Value("\${app.jwt.expiration-ms}")
    private long jwtExpirationMs;

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        // Add roles to claims
        claims.put("roles", userDetails.getAuthorities());
        return createToken(claims, userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .claims(claims)
                .subject(subject)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(getSignInKey())
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private SecretKey getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}`}
                    onCopy={copyToClipboard}
                    copiedId={copiedCode}
                    id="jwt-util"
                  />

                  <CodeBlock
                    language="java"
                    title="config/JwtAuthenticationFilter.java"
                    code={`package com.example.security.config;

import com.example.security.service.CustomUserDetailsService;
import com.example.security.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        jwt = authHeader.substring(7);
        try {
            username = jwtUtil.extractUsername(jwt);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

                if (jwtUtil.isTokenValid(jwt, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        } catch (Exception e) {
            // Handle specific JWT exceptions (expired, invalid signature) here if needed
            logger.error("Cannot set user authentication: {}", e);
        }

        filterChain.doFilter(request, response);
    }
}`}
                    onCopy={copyToClipboard}
                    copiedId={copiedCode}
                    id="jwt-filter"
                  />
                </div>
              </ContentCard>
            </section>

             {/* Section 6: UserDetailsService */}
             <section id="service" className="scroll-mt-32">
              <ContentCard title="CustomUserDetailsService" icon={<Users />}>
                <div className="prose prose-invert prose-purple max-w-none">
                  <p className="text-purple-200/80 mb-4">
                    We implement `UserDetailsService` to tell Spring Security how to load user data from our MySQL database via the `UserRepository`.
                  </p>

                  <CodeBlock
                    language="java"
                    title="service/CustomUserDetailsService.java"
                    code={`package com.example.security.service;

import com.example.security.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }
}`}
                    onCopy={copyToClipboard}
                    copiedId={copiedCode}
                    id="user-details-service"
                  />
                </div>
              </ContentCard>
            </section>

             {/* Section 7: Controllers */}
             <section id="controller" className="scroll-mt-32">
              <ContentCard title="Controllers & DTOs" icon={<Server />}>
                <div className="prose prose-invert prose-purple max-w-none">
                  <p className="text-purple-200/80 mb-4">
                    We define `AuthController` for registration and login, and `TestController` to verify our role-based access control. First, the DTOs (Data Transfer Objects):
                  </p>

                  <CodeBlock
                    language="java"
                    title="dto/AuthDTOs.java (Grouped)"
                    code={`package com.example.security.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

// --- RegisterRequest ---
@Data @Builder @AllArgsConstructor @NoArgsConstructor
public class RegisterRequest {
    private String username;
    private String password;
}

// --- LoginRequest ---
@Data @Builder @AllArgsConstructor @NoArgsConstructor
public class LoginRequest {
    private String username;
    private String password;
}

// --- AuthResponse ---
@Data @Builder @AllArgsConstructor @NoArgsConstructor
public class AuthResponse {
    private String token;
    private String message;
}`}
                    onCopy={copyToClipboard}
                    copiedId={copiedCode}
                    id="auth-dtos"
                  />

                  <h3 className="text-xl font-bold text-purple-100 mt-8 mb-4">Auth Controller</h3>
                  <CodeBlock
                    language="java"
                    title="controller/AuthController.java"
                    code={`package com.example.security.controller;

import com.example.security.dto.AuthResponse;
import com.example.security.dto.LoginRequest;
import com.example.security.dto.RegisterRequest;
import com.example.security.entity.Role;
import com.example.security.entity.User;
import com.example.security.repository.UserRepository;
import com.example.security.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(AuthResponse.builder().message("Username already exists").build());
        }

        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER) // Default role
                .build();

        userRepository.save(user);

        String jwtToken = jwtUtil.generateToken(user);
        return ResponseEntity.ok(AuthResponse.builder()
                .token(jwtToken)
                .message("User registered successfully")
                .build());
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        // This will authenticate against CustomUserDetailsService
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        var user = userRepository.findByUsername(request.getUsername()).orElseThrow();
        String jwtToken = jwtUtil.generateToken(user);

        return ResponseEntity.ok(AuthResponse.builder()
                .token(jwtToken)
                .message("Login successful")
                .build());
    }
}`}
                    onCopy={copyToClipboard}
                    copiedId={copiedCode}
                    id="auth-controller"
                  />

                  <h3 className="text-xl font-bold text-purple-100 mt-8 mb-4">Protected API Controller</h3>
                  <CodeBlock
                    language="java"
                    title="controller/UserController.java"
                    code={`package com.example.security.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {

    @GetMapping("/public")
    public ResponseEntity<String> publicEndpoint() {
        return ResponseEntity.ok("Public endpoint accessed.");
    }

    @GetMapping("/user")
    public ResponseEntity<String> userEndpoint() {
        return ResponseEntity.ok("User endpoint accessed. You have USER or ADMIN role.");
    }

    @GetMapping("/admin")
    public ResponseEntity<String> adminEndpoint() {
        return ResponseEntity.ok("Admin endpoint accessed. You have ADMIN role.");
    }
}`}
                    onCopy={copyToClipboard}
                    copiedId={copiedCode}
                    id="user-controller"
                  />
                </div>
              </ContentCard>
            </section>

            {/* Section 8: Exception Handling */}
            <section id="exception" className="scroll-mt-32">
              <ContentCard title="Global Exception Handling" icon={<CheckCircle />}>
                <div className="prose prose-invert prose-purple max-w-none">
                  <p className="text-purple-200/80 mb-4">
                    To handle unauthorized access and invalid tokens gracefully, we implement an `AuthenticationEntryPoint` and a `@ControllerAdvice` for global exception handling. First, update `SecurityConfig.java` to use the entry point:
                  </p>

                  <CodeBlock
                    language="java"
                    title="config/JwtAuthenticationEntryPoint.java"
                    code={`package com.example.security.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
    }
}`}
                    onCopy={copyToClipboard}
                    copiedId={copiedCode}
                    id="jwt-auth-entry-point"
                  />

                  <p className="text-purple-200/80 mb-4 mt-6">
                    Then, add the `GlobalExceptionHandler` to catch exceptions like `BadCredentialsException`.
                  </p>

                  <CodeBlock
                    language="java"
                    title="exception/GlobalExceptionHandler.java"
                    code={`package com.example.security.exception;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Map<String, String>> handleBadCredentialsException(BadCredentialsException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("error", "Invalid username or password");
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<Map<String, String>> handleExpiredJwtException(ExpiredJwtException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("error", "JWT token has expired");
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(SignatureException.class)
    public ResponseEntity<Map<String, String>> handleSignatureException(SignatureException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("error", "Invalid JWT signature");
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGlobalException(Exception ex) {
        Map<String, String> error = new HashMap<>();
        error.put("error", "An unexpected error occurred");
        error.put("details", ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}`}
                    onCopy={copyToClipboard}
                    copiedId={copiedCode}
                    id="global-exception-handler"
                  />
                </div>
              </ContentCard>
            </section>

            {/* Section 9: Testing */}
            <section id="testing" className="scroll-mt-32">
              <ContentCard title="Testing with cURL" icon={<Terminal />}>
                <div className="prose prose-invert prose-purple max-w-none">
                  <p className="text-purple-200/80 mb-4">
                    Once your application is running, you can test the endpoints using cURL or Postman.
                  </p>

                  <CodeBlock
                    language="bash"
                    title="1. Register a new user"
                    code={`curl -X POST http://localhost:8080/auth/register \\
-H "Content-Type: application/json" \\
-d '{"username":"johndoe", "password":"password123"}'`}
                    onCopy={copyToClipboard}
                    copiedId={copiedCode}
                    id="curl-register"
                  />

                  <CodeBlock
                    language="bash"
                    title="2. Login to get JWT"
                    code={`curl -X POST http://localhost:8080/auth/login \\
-H "Content-Type: application/json" \\
-d '{"username":"johndoe", "password":"password123"}'

# Output:
# {"token":"eyJhbGciOiJIUzI1NiJ9...","message":"Login successful"}`}
                    onCopy={copyToClipboard}
                    copiedId={copiedCode}
                    id="curl-login"
                  />

                  <CodeBlock
                    language="bash"
                    title="3. Access Protected Endpoint"
                    code={`curl -X GET http://localhost:8080/api/user \\
-H "Authorization: Bearer <YOUR_JWT_TOKEN_HERE>"`}
                    onCopy={copyToClipboard}
                    copiedId={copiedCode}
                    id="curl-protected"
                  />

                </div>
              </ContentCard>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Components

function ContentCard({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) {
  return (
    <div
      className="bg-gray-900/40 backdrop-blur-md border border-indigo-500/20 rounded-2xl p-8 overflow-hidden relative group"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-[80px] group-hover:bg-indigo-600/10 transition-colors duration-700" />

      <div className="flex items-center gap-4 mb-8 border-b border-indigo-500/10 pb-6 relative z-10">
        <div className="p-3 bg-indigo-900/30 rounded-lg text-indigo-300 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
          {icon}
        </div>
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-100 to-indigo-300">
          {title}
        </h2>
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

function CodeBlock({ title, code, onCopy, copiedId, id }: {
  language: string,
  title: string,
  code: string,
  onCopy: (code: string, id: string) => void,
  copiedId: string | null,
  id: string
}) {
  return (
    <div className="my-6 rounded-xl overflow-hidden border border-indigo-500/30 bg-[#0d1117] shadow-xl">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 border-b border-gray-700/50 backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
          </div>
          <span className="text-xs font-mono text-gray-400 ml-2">{title}</span>
        </div>
        <button
          onClick={() => onCopy(code, id)}
          className="text-xs flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-white/5"
        >
          {copiedId === id ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          {copiedId === id ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="p-4 overflow-x-auto custom-scrollbar">
        <pre className="font-mono text-sm leading-relaxed text-blue-100">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
