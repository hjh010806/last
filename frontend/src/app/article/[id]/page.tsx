'use client'

import { updateArticle, getArticle, deleteArticle } from "@/app/API/UserAPI";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from 'react';

export default function ArticleListPage() {
    const params = useParams();
    const router = useRouter();
    const articleId = Number(params?.id);
    const [article, setArticle] = useState(null as any);
    const [articleContent, setArticleContent] = useState('');
    const [articleTitle, setArticleTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getArticle(articleId)
            .then((r) => {
                const interval = setInterval(() => { setIsLoading(true); clearInterval(interval) }, 300);
                setArticle(r);
                setArticleTitle(r.title);
                setArticleContent(r.content);
            })
            .catch(e => console.log(e));
    }, [articleId])

    const handleClick = async () => {
        setIsLoading(true);
        try {
            await updateArticle({
                id: articleId, // 'id'는 인터페이스와 일치
                title: articleTitle,
                content: articleContent,
            });
            alert('게시글 수정되었습니다.');
        } catch (error) {
            console.error('게시글 수정 중 오류 발생 : ', error);
            alert('게시글 수정에 실패했습니다.');
        }
    }

    const handleDelete = async (articleId: number) => {
        try {
            await deleteArticle(articleId);
            alert('게시글이 삭제되었습니다.');
            router.push('/');
        } catch (error) {
            console.error('게시글 삭제 중 오류 발생:', error);
            alert('게시글 삭제에 실패했습니다.');
        }
    };

    return (
        <div className="h-[953px] w-[1920px] bg-white text-black flex items-center flex-col">
            {article ? (
                <div className="w-[1000px] h-[500px] flex flex-col justify-center items-center p-4 mt-[100px] border border-black bg-blue-300">
                    <div className="w-full h-[500px] justify-start items-start">
                        <input defaultValue={articleTitle} className="w-full h-[60px] border-b bg-blue-200 border-black"
                            onChange={e => setArticleTitle(e.target.value)}
                        />
                        <input defaultValue={articleContent} className="w-full h-[400px] bg-blue-200 overflow-scroll"
                            onChange={e => setArticleContent(e.target.value)}
                        />
                    </div>
                </div>
            ) : (
                <span>Loading article details...</span>
            )}
            <button className="p-2 bg-yellow-400 rounded text-white hover:bg-yellow-500" onClick={handleClick}>수정</button>
            <button className="p-2 bg-blue-400 rounded text-white hover:bg-blue-500" onClick={() => handleDelete(article.id)}>삭제</button>
            <button className="p-2 bg-gray-400 rounded text-white hover:bg-gray-500" onClick={() => router.push('/')}>목록으로 가기</button>
        </div>
    )

}
