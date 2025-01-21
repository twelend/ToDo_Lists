import { Dispatch, SetStateAction } from "react";
export declare function useLS<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>];
