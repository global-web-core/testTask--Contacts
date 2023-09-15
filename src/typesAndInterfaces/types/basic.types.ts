import { namePages, controllers, methodHttp, codeAnswer } from "../../globals/constants/constants";

export type Pages = keyof typeof  namePages;
export type Controllers = keyof typeof  controllers;
export type MethodHttp = keyof typeof methodHttp;
export type CodeAnswer = (typeof codeAnswer)[keyof typeof codeAnswer];