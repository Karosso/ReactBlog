import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  AutocompleteRenderInputParams,
} from "@material-ui/lab/Autocomplete";
import React from "react";
import reactIcon from "../../assets/icons/react_icon.svg";
import style from "./Header.module.scss";
import { UseHeader } from "./UseHeader";

function Header() {
  const {
    loading,
    open,
    authorsList,
    onClose,
    onOpen,
    getOptionLabel,
    getOptionSelected,
    onChangeAuthor,
    actionButton,
    currentRoute,
  } = UseHeader();

  const renderTextField = (params: AutocompleteRenderInputParams) => (
    <TextField
      {...params}
      label="Filtrar por Autor"
      variant="outlined"
      color="primary"
      InputLabelProps={{
        classes: {
          focused: style.focused,
          root: style.root,
        },
      }}
      InputProps={{
        ...params.InputProps,
        classes: {
          root: style.root,
          notchedOutline: style.input,
        },
        endAdornment: (
          <>
            {loading && <CircularProgress color="inherit" size={20} />}
            {params.InputProps.endAdornment}
          </>
        ),
      }}
    />
  );

  return (
    <div id={style.container}>
      <div>
        <img src={reactIcon} alt="React-icon" />
        <h1>React Blog</h1>
      </div>
      <div>
        <Autocomplete
          freeSolo
          open={open}
          onOpen={onOpen}
          onClose={onClose}
          getOptionSelected={getOptionSelected}
          getOptionLabel={getOptionLabel}
          options={authorsList}
          loading={loading}
          onChange={onChangeAuthor}
          classes={{ focused: style.focused, endAdornment: style.endAdornment }}
          renderInput={renderTextField}
        />
        {actionButton(currentRoute)}
      </div>
    </div>
  );
}

export default Header;
