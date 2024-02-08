import styled from 'styled-components';

const List = styled.ul`
  display: flex;
  gap: 30px;
  list-style-type: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  padding-bottom: 30px;
`;
const Item = styled.li`
  width: 100px;
`;
export { List, Item };
