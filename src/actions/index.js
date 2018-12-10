import { ADD_ARTICLE, CHANGE_PRINCIPAL } from "../constants/action-types";

export const addArticle = article => ({ 
    type: ADD_ARTICLE, 
    payload: article 
});

export const changePrincipal = principal => ({
    type: CHANGE_PRINCIPAL,
    payload: principal
});