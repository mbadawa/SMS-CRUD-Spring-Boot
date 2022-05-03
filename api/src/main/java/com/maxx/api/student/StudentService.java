package com.maxx.api.student;

import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.Month;
import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    private final StudentRepo studentRepo;

    public StudentService(StudentRepo studentRepo) {
        this.studentRepo = studentRepo;
    }



    public List<Student> getStudents(){
        return studentRepo.findAll();
    }

    public void addStudent(Student student) {
        Optional<Student> studentByEmail = studentRepo.findStudentByEmail(student.getEmail());
        if (studentByEmail.isPresent()) {
            // throws an illegal argument exception
            throw new IllegalStateException("Student with email " + student.getEmail() + " already exists");
        }
        studentRepo.save(student);
        System.out.println("Student added");
    }

    public void deleteStudent(Long studentId) {
    boolean exists = studentRepo.existsById(studentId);
    if (!exists) {
        throw new IllegalStateException("Student with id " + studentId + " does not exist");
    }
    studentRepo.deleteById(studentId);
    }
    @Transactional
    public void updateStudent(Long studentId, String name, String email){
    Student student = studentRepo.findById(studentId).orElseThrow(() -> new IllegalStateException("Student with id " + studentId + " does not exist"));
    if (name!=null && name.length()>0){
        student.setName(name);
    }
    if (email!=null && email.length()>0 && !email.equals(student.getEmail())){
        Optional<Student> studentOptional = studentRepo.findStudentByEmail(email);
        if (studentOptional.isPresent()){
            throw new IllegalStateException("Student with email " + email + " already exists");
        }
        student.setEmail(email);
    }
}

    public Student getStudentById(Long studentId) {
        return studentRepo.findById(studentId).orElseThrow(() -> new IllegalStateException("Student with id " + studentId + " does not exist"));
    }
}
