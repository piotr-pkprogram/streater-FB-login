import React, { forwardRef } from 'react';
import { Wrapper } from './SearchResultsListItem.styles';

type Props = {
  textValue?: string;
  highlighted?: boolean;
  city?: string;
};

const SearchResultsListItem = forwardRef((props: Props, ref) => (
  <>
    <Wrapper highlighted={props.highlighted} ref={ref} {...props}>
      <span>{props.textValue}</span>
      <span className="text-gray-400 font-normal text-xs">{props.city}</span>
    </Wrapper>
  </>
));

export default SearchResultsListItem;
