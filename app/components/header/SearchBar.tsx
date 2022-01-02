import { Search, SearchIconWrapper, StyledInputBase } from './StyledComponents';
import { Search as SearchIcon } from '@mui/icons-material';

export const SearchBar = () => {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder='Search…'
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
};
