package com.second_team.demo;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/article")
public class ArticleController {
    private final MultiService multiService;

    @PostMapping
    public ResponseEntity<?> saveArticle(@RequestBody RequestDTO requestDTO){
        try {
            ResponseDTO responseDTO = multiService.saveArticle(requestDTO);
            return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("연결 안됌");
        }
    }

    @GetMapping
    public ResponseEntity<?> getArticle(@RequestHeader("ArticleId") Long id){
        try {
            ResponseDTO responseDTO = multiService.getArticle(id);
            return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/list")
    public ResponseEntity<?> getArticleList(){
        try {
            List<ResponseDTO> responseDTOList = multiService.getArticleList();
            return ResponseEntity.status(HttpStatus.OK).body(responseDTOList);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<?> updateArticle(@RequestBody RequestDTO requestDTO){
        try {
            ResponseDTO responseDTO = multiService.updateArticle(requestDTO);
            return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping
    public ResponseEntity<?> deleteArticle(@RequestHeader("ArticleId") Long id){
        try {
            multiService.deleteArticle(id);
            return ResponseEntity.status(HttpStatus.OK).body("문제 없음");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
