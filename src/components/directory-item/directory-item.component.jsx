import { Link } from "react-router-dom";
import {
  DirectoryItemContainer,
  BackgroundImage,
  Body,
} from "./directory-item.styles";

const DirectoryItem = ({ category }) => {
  const { imageUrl, title } = category;
  return (
    <DirectoryItemContainer>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <Link to={`shop/${title}`}>
          <p>Shop Now</p>{" "}
        </Link>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
