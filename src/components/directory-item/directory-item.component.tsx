import { useNavigate } from "react-router-dom";
import {
  DirectoryItemContainer,
  BackgroundImage,
  Body,
} from "./directory-item.styles";
import { Category } from "../../store/categories/category.types";

type DirectoryItemProps = {
  category: Category;
};

function DirectoryItem({ category }: DirectoryItemProps) {
  const { title, imageUrl, route } = category;
  const navigate = useNavigate();

  function onNavigateHandler() {
    navigate(route);
  }

  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageurl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
}

export default DirectoryItem;
