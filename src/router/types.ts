import { Router } from 'express';

export type RouterReturnType = [string, Router];
export type RouterFunction = () => RouterReturnType;
