import { FilterList } from './Filter.styled';
import { useDispatch } from 'react-redux';
import { setFilter } from 'redux/filterSlice';
import { useSelector } from 'react-redux';
import { selectFilter } from 'redux/selectors'; 

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const changeFilterValue = event => dispatch(setFilter(event.currentTarget.value));

  return (
    <FilterList>
      <h3>Find contacts by name</h3>
      <input type="text"
        value={filter}
        onChange={changeFilterValue} ></input>
    </FilterList>
  );
};

