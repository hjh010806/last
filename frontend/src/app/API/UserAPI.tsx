import { getAPI } from './AxiosAPI';


export const UserApi = getAPI();

interface saveArtilce {
    title: string;
    content: string;
}

export const postArticle = async (data: saveArtilce) => {
    const response = await UserApi.post('api/article', data);
    return response.data;
}

export const getArticleList = async () => {
    const response = await UserApi.get('/api/article/list');
    return response.data;
}

export const getArticle = async (data: number) => {
    const response = await UserApi.get('/api/article', { headers: { 'ArticleId': data } });
    return response.data
}
interface updateArtilce {
    id : number;
    title: string;
    content: string;

}

export const updateArticle = async (data: updateArtilce) => {
    const response = await UserApi.put('/api/article', data);
    return response.data;
}
export const deleteArticle = async (data: number) => {
    await UserApi.delete('/api/article', { headers: { 'ArticleId': data } });
}
