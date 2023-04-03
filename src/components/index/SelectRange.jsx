import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select} from '@mui/material';

/**
 * 検索範囲選択
 * @param {props} props
 * @property {number} range
 * @property {dispatch} setRange
 * @return {Component}
 */
const SelectRange = (props) => {
  const range = props.range;

  return (
    <FormControl fullWidth>
      <InputLabel id="search-range-label">検索範囲</InputLabel>
      <Select
        labelId="search-range-label"
        id="search-range"
        defaultValue={3}
        value={range}
        label="Range"
        onChange={(val) => props.setRange(val.target.value)}
      >
        <MenuItem value={1}>300m</MenuItem>
        <MenuItem value={2}>500m</MenuItem>
        <MenuItem value={3}>1000m</MenuItem>
        <MenuItem value={4}>2000m</MenuItem>
        <MenuItem value={5}>3000m</MenuItem>
      </Select>
    </FormControl>);
};

export default SelectRange;
