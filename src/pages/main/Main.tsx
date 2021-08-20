import React, { useEffect } from "react";
import { AuthorsApi } from "../../services/authors/AuthorsApi";
import { PostsApi } from "../../services/posts/PostsApi";

function Main() {
  const { addAuthor, getAuthors, removeAuthor } = AuthorsApi();
  const { addPost, getPosts, removePost } = PostsApi();

  useEffect(() => {
    const servicesTest = async () => {
      try {
        console.log("***Teste de integração de serviços***");
        const author = await addAuthor({
          name: "Jorge Vercilo",
          nickname: "Vercilo",
          birthDate: "1945-05-19",
        });
        console.log("Author created: ", author.data);

        const authorsList = await getAuthors();
        console.log("Authors List: ", authorsList.data);
        
        const post1 = await addPost(author.data.id, {
          title: "Post 1",
          body: "Body of Post 1",
        });
        console.log("Post 1: ", post1.data);
        
        const post2 = await addPost(author.data.id, {
          title: "Post 2",
          body: "Body of Post 2",
        });
        console.log("Post 2: ", post2.data);
        
        const postList = await getPosts();
        console.log("Post List: ", postList.data);
        
        console.log("Delete Post 2!");
        await removePost(post2.data.id);
        
        const postList2 = await getPosts();
        console.log("Post List 2: ", postList2.data);
        
        console.log("Delete Author: ", author.data.name);
        await removeAuthor(author.data.id);
        
        const authorsList2 = await getAuthors();
        console.log("Authors List: ", authorsList2.data);

        console.log("***Teste de integração de serviços***");

      } catch (error) {
        console.log('[ERROR]', error)
      }
    };
    servicesTest();
  }, []);

  return <div>Página inicial</div>;
}

export default Main;
