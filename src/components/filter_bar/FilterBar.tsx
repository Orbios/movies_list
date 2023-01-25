import {useState} from 'react';
import {Button, Dropdown, DropdownButton} from 'react-bootstrap';
import {FaPlus} from 'react-icons/fa';

import SORT_BY from 'constants/sortBy';

import Pagination from 'components/common/Pagination';

import * as styled from './FilterBar.styled';

const sortByOptions = [
  {key: SORT_BY.TITLE, text: 'Title'},
  {key: SORT_BY.YEAR, text: 'Year'},
  {key: SORT_BY.RUNTIME, text: 'Movie runtime'}
];
interface Props {
  total: number;
  activePage: number;
  sortBy: string;
  searchStr: string;
  sortByAction: (key: string) => void;
  onSearch: (searchStr: string) => void;
  onReset: () => void;
  onPageSelection: (page: number) => void;
  onAddMovie: () => void;
}

function FilterBar({
  total,
  activePage,
  sortBy,
  searchStr,
  sortByAction,
  onSearch,
  onReset,
  onPageSelection,
  onAddMovie
}: Props) {
  const [searchStrLocal, setSearchStrLocal] = useState<string>(searchStr);

  function onSearchHandler() {
    onSearch(searchStrLocal);
  }

  function onResetHandler() {
    setSearchStrLocal('');
    onReset();
  }

  function render() {
    const pageNumber = Math.ceil(total / 10);
    const paginationVisible = total > 0;

    return (
      <styled.wrapper>
        <styled.sortByContainer xs={{span: 4, order: 1}} md={{span: 2, order: 1}} xl={{span: 2, order: 1}}>
          <DropdownButton title="Sort By: " id="sort-by-dropdown">
            {sortByOptions.map(item => {
              return (
                <Dropdown.Item key={item.key} onClick={() => sortByAction(item.key)} active={sortBy === item.key}>
                  {item.text}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </styled.sortByContainer>

        <styled.addActionContainerContainer xs={{span: 8, order: 2}} md={{span: 1, order: 3}} xl={{span: 1, order: 4}}>
          <Button variant="success" onClick={onAddMovie}>
            <FaPlus />
          </Button>
        </styled.addActionContainerContainer>

        <styled.searchContainer xs={{span: 12, order: 3}} md={{span: 9, order: 2}} xl={{span: 4, order: 2}}>
          <styled.searchInput
            type="text"
            value={searchStrLocal}
            onChange={event => {
              setSearchStrLocal(event.target.value);
            }}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                onSearchHandler();
              }
            }}
          />

          <styled.searchActionButton onClick={onSearchHandler}>Search</styled.searchActionButton>
          <styled.searchActionButton variant="secondary" onClick={onResetHandler}>
            Reset
          </styled.searchActionButton>
        </styled.searchContainer>

        <styled.paginationContainer xs={{span: 12, order: 4}} md={{span: 12, order: 4}} xl={{span: 5, order: 3}}>
          {paginationVisible && (
            <Pagination pageCount={pageNumber} activePage={activePage} onPageSelection={onPageSelection} />
          )}
        </styled.paginationContainer>
      </styled.wrapper>
    );
  }

  return render();
}

export default FilterBar;
