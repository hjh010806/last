package com.second_team.demo;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class ArticleService {
    private final ArticleRepository articleRepository;


    public Article save(RequestDTO requestDTO) {
        return articleRepository.save(Article.builder()//
                .title(requestDTO.getTitle())//
                .content(requestDTO.getContent())//
                .build());
    }

    public Article findById(Long id) {
        return articleRepository.findById(id).orElse(null);
    }

    public List<Article> findAll() {
        return articleRepository.findAll();
    }

    public Article update(Article article ,RequestDTO requestDTO) {
        article.setTitle(requestDTO.getTitle());
        article.setContent(requestDTO.getContent());
        return articleRepository.save(article);
    }

    public void delete(Article article) {
        articleRepository.delete(article);
    }
}
