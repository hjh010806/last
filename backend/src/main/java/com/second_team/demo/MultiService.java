package com.second_team.demo;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class MultiService {
    private final ArticleService articleService;


    @Transactional
    public ResponseDTO saveArticle(RequestDTO requestDTO) {
        Article article = articleService.save(requestDTO);
        return articleResponseDTO(article);
    }


    private ResponseDTO articleResponseDTO(Article article){
        return ResponseDTO.builder().id(article.getId()).title(article.getTitle()).content(article.getContent()).build();
    }


    @Transactional
    public ResponseDTO getArticle(Long id) {
        Article article = articleService.findById(id);
        if (article == null)
            throw new DataNotFoundException("게시물 객체 없음");
        return articleResponseDTO(article);

    }

    @Transactional
    public List<ResponseDTO> getArticleList() {
        List<ResponseDTO> responseDTOList = new ArrayList<>();
        List<Article> articles = articleService.findAll();
        for (Article article : articles){
            responseDTOList.add(articleResponseDTO(article));
        }
        return responseDTOList;
    }

    @Transactional
    public ResponseDTO updateArticle(RequestDTO requestDTO) {
        Article article = articleService.findById(requestDTO.getId());
        if (article == null)
            throw new DataNotFoundException("게시물 객체 없음");
        article = articleService.update(article, requestDTO);
        return articleResponseDTO(article);
    }

    @Transactional
    public void deleteArticle(Long id) {
        Article article = articleService.findById(id);
        if (article == null)
            throw new DataNotFoundException("게시물 객체 없음");
        articleService.delete(article);
    }
}
