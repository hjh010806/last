'use client'

import { postArticle } from "@/app/API/UserAPI";
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

    }, [])

    const handleClick = async () => {
        setIsLoading(true);
        try {
            await postArticle({
                title: articleTitle,
                content: articleContent,
            });
            alert('게시글 생성되었습니다.');
            router.push("/");
        } catch (error) {
            console.error('게시글 생성 중 오류 발생 : ', error);
            alert('게시글 수정에 실패했습니다.');
        }
    }



    return (
        <div className="h-[953px] w-[1920px] bg-white text-black flex items-center flex-col">
            <div className="w-[1000px] h-[500px] flex flex-col justify-center items-center p-4 mt-[100px] border border-black bg-blue-300">
                <div className="w-full h-[500px] justify-start items-start">
                    <input className="w-full h-[60px] border-b bg-blue-200 border-black"
                        onChange={e => setArticleTitle(e.target.value)}
                    />
                    <input className="w-full h-[400px] bg-blue-200 overflow-scroll"
                        onChange={e => setArticleContent(e.target.value)}
                    />
                </div>
            </div>
            <button className="p-2 bg-yellow-400 rounded text-white hover:bg-yellow-500" onClick={handleClick}>수정</button>
        </div>
    )

}
