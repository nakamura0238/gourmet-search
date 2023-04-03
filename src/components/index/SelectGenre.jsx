import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select} from '@mui/material';

/**
 * ジャンル選択
 * @param {props} props
 * @property {array} genreList
 * @property {string} genre
 * @property {dispatch} setGenre
 * @return {Component}
 */
const SelectGenre = (props) => {
  const genre = props.genre;
  const genreList = props.genreList;

  return (
    <FormControl fullWidth>
      <InputLabel id="search-genre-label">ジャンル</InputLabel>
      <Select
        labelId="search-genre-label"
        id="search-genre"
        defaultValue=''
        value={genre}
        label="Genre"
        onChange={(val) => props.setGenre(val.target.value)}
      >
        <MenuItem value=''>指定なし</MenuItem>
        {genreList.map((val, i) => {
          return (
            <MenuItem key={i} value={val.code}>{val.name}</MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SelectGenre;
