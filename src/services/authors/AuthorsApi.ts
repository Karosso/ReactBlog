import { IAddAuthorRequest, IAuthorResponse } from "../../interfaces/IAuthor";
import { IAuthorsApi } from "../../interfaces/IAuthorsApi";
import { api } from "../api/Api"

export const AuthorsApi = (): IAuthorsApi => {

  /**
   * @returns List of Authors
   */
  const getAuthors = async () => {
    return await api.get<IAuthorResponse[]>('api/v1/authors');
  }

  /**
   * @param author Author name, nickname and birthDate
   * @returns author saved data
   */
  const addAuthor = async (author: IAddAuthorRequest) => {
    return await api.post<IAuthorResponse>('api/v1/authors', {...author});
  }

  /**
   * @param authorId number
   * @returns Promise<void>
   */
  const removeAuthor = async (authorId: number) => {
    return await api.delete(`api/v1/authors/${authorId}`);
  }


  return {
    addAuthor,
    getAuthors,
    removeAuthor,
  }
}

