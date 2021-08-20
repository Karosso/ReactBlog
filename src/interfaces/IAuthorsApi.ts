import { AxiosResponse } from "axios";
import { IAuthorResponse, IAddAuthorRequest } from "./IAuthor";

export interface IAuthorsApi {
  getAuthors: () => Promise<AxiosResponse<IAuthorResponse[]>>;
  addAuthor: (author: IAddAuthorRequest) => Promise<AxiosResponse<IAuthorResponse>>;
  removeAuthor: (authorId: number) => Promise<AxiosResponse<any>>;
}