// @ts-ignore
import styled from 'styled-components';

export const Wrapper = styled.div.attrs({
  className:
    'text-lightBlack font-semibold border-solid border-t border-t-lightBlack gap-2 p-3 transition-colors first:border-none cursor-pointer grid grid-flow-col items-center'
})`
  background-color: ${({ highlighted }: { highlighted: boolean }) =>
    highlighted ? 'rgb(243 244 246)' : 'transparent'};
  grid-template-columns: max-content;
`;
