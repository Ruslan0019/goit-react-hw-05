import { NavLink } from "react-router-dom";
import { List, Item } from "./Header.styled";

const Header = () => {
  return (
    <header>
      <nav>
        <List>
          <Item>
            <NavLink to="/">Home</NavLink>
          </Item>
          <li>
            <NavLink to="/movies">Movies</NavLink>
          </li>
        </List>
      </nav>
    </header>
  );
};

export default Header;
