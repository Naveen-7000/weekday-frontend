import { useState } from "react";
import { connect, useDispatch } from 'react-redux';
import PropTypes from "prop-types";
import { Clear, ExpandMore } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Chip,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { updateFilterOptions } from "../../redux/actions";

const StyledAutocomplete = styled(Autocomplete)(() => ({
  "& .MuiChip-root": {
    borderRadius: "4px",
    fontSize: "14px"
  },
  "& button.MuiButtonBase-root": {
    visibility: "visible",
    paddingRight: "4px",
  },
  "& .MuiChip-deleteIcon": {
    color: "black",
    height: "100%",
    width: "auto",
    padding: "6px",
    margin: "0",
  },
  "& .MuiChip-deleteIcon:hover": {
    color: "#FF474D",
    backgroundColor: "#FFADB0",
    borderRadius: "4px",
  },
}));

const AutoComplete = ({id, placeholder, options, label,multiple }) => {
    const [selectedValues, setSelectedValues] = useState(multiple ? [] : null);
    const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setSelectedValues(newValue);
    dispatch(updateFilterOptions({ filterType: id, options: newValue }));
  };

  return (
    <Box>
      {multiple && selectedValues.length > 0 && (
        <Typography variant="body1" component="div" sx={{ position: 'absolute', top: '-42%', left: '2', fontSize:"14px" }}>
          {label}
        </Typography>
      )}
      {!multiple && selectedValues !== null && (
        <Typography variant="body1" component="div" sx={{ position: 'absolute', top: '-44%', left: '2', fontSize:"14px" }}>
          {label}
        </Typography>
      )}
      <StyledAutocomplete
        multiple={multiple}
        id="multiple-limit-tags"
        options={options}
        value={selectedValues}
        onChange={handleChange}
        size="small"
        getOptionLabel={(option) => option?.title || ''}
        renderInput={(params) => (
          <TextField
            {...params}
            label=""
            placeholder={
              params.InputProps?.startAdornment?.length ? "" : placeholder
            }
            sx={{
                minWidth: "200px",
                fontSize: "14px",
            }}
          />
        )}
        popupIcon={
          <ExpandMore
            sx={{
              borderLeft: "1px solid gray",
              paddingLeft: "4px",
              borderRadius: "0",
            }}
          />
        }
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "4px",
          padding:'0',
          margin: '0',
          minHeight:'20px',
          fontSize: "14px"
        }}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              key={index}
              label={option.title}
              {...getTagProps({ index })}
              deleteIcon={<Clear />} // Set the desired delete icon
              sx={{ mr: 0.5, mt: 0.5 }}
            />
          ))
        }
      />
    </Box>
  );
};

AutoComplete.propTypes = {
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired,
    multiple: PropTypes.bool.isRequired,
  };

  const mapStateToProps = (state) => ({
    filters: state.filters,
  });
  
  export default connect(mapStateToProps)(AutoComplete);
