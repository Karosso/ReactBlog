import { Button } from "@material-ui/core";
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useBlogContext } from "../../contexts/blog/BlogContext";
import { IAuthorResponse } from "../../interfaces/IAuthor";
import { AuthorsApi } from "../../services/authors/AuthorsApi";

export const UseHeader = () => {
  const [open, setOpen] = useState(false);
  const [authorsList, setAuthorsList] = useState<IAuthorResponse[]>([]);
  const { getAuthors } = AuthorsApi();
  const [currentRoute, setCurrentRoute] = useState("/");
  const history = useHistory();
  const loading = open && authorsList.length === 0;
  const { filterAuthors } = useBlogContext();

  useEffect(() => {
    setCurrentRoute(history.location.pathname);
  }, [history.location]);

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      try {
        const { data } = await getAuthors();
        if (active) {
          setAuthorsList(data);
        }
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setAuthorsList([]);
    }
  }, [open]);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const getOptionSelected = (
    option: IAuthorResponse,
    value: IAuthorResponse
  ) => {
    return option.name === value.name;
  };

  const getOptionLabel = (option: IAuthorResponse) => option.name;

  const onChangeAuthor = (
    _event: React.ChangeEvent<{}>,
    value: string | IAuthorResponse | null,
    _reason: AutocompleteChangeReason,
    _details?: AutocompleteChangeDetails<IAuthorResponse> | undefined
  ) => {
    if (typeof value === "object") {
      if (value === null) {
        filterAuthors({} as IAuthorResponse);
      } else {
        filterAuthors(value);
      }
    }
  };

  const goToAuthors = () => {
    history.push("autores");
  };

  const goBack = () => {
    history.goBack();
  };

  const actionButton = (route: string) => {
    if (route === "/") {
      return (
        <Button variant="contained" onClick={goToAuthors}>
          Ver Autores
        </Button>
      );
    }
    if (route === "/autores") {
      return (
        <Button variant="contained" onClick={goBack}>
          Voltar
        </Button>
      );
    }
  };

  return {
    open,
    authorsList,
    loading,
    onOpen,
    onClose,
    getOptionSelected,
    getOptionLabel,
    onChangeAuthor,
    actionButton,
    currentRoute,
  };
};
