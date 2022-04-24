import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";

import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";

import styled from "@mui/material/styles/styled";

import FlexColumn from "components/FlexColumn";
import FlexRow from "components/FlexRow";
import NunitoTypography from "components/NunitoTypography";

const Typography = styled(NunitoTypography)`
  font-weight: 500;
  text-decoration: ${(props) =>
    props.completed === "true" ? "line-through" : "none"};'
`;

const Layout = styled(FlexRow)`
  height: ${(props) => props.theme.spacing(10)};
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${(props) => props.theme.palette.grey["200"]};
  margin: ${(props) => props.theme.spacing(1, 0)};
  background-color: ${(props) =>
    props.completed === "true"
      ? props.theme.palette.primary.light
      : props.theme.palette.common.white};'
`;

const ThemedCheckbox = styled(Checkbox)`
  color: ${(props) => props.theme.palette.text.secondary};
`;

const ShoppingListItem = ({ item, onComplete, onDelete, onEdit }) => {
  const { completed, description, name } = item;

  return (
    <Layout completed={completed.toString()}>
      <FlexRow>
        <ThemedCheckbox
          checked={completed}
          onChange={() => onComplete && onComplete(item)}
        />
        <FlexColumn sx={{ justifyContent: "center" }}>
          <Typography completed={completed.toString()} variant="subtitle1">
            {name}
          </Typography>
          <Typography
            completed={completed.toString()}
            color="text.secondary"
            variant="body2"
          >
            {description}
          </Typography>
        </FlexColumn>
      </FlexRow>
      <div>
        <IconButton
          onClick={() => onEdit && onEdit(item)}
          sx={{ marginRight: 1 }}
        >
          <EditIcon color="action" />
        </IconButton>
        <IconButton
          onClick={() => onDelete && onDelete(item)}
          sx={{ marginRight: 2 }}
        >
          <DeleteIcon color="action" />
        </IconButton>
      </div>
    </Layout>
  );
};

export default ShoppingListItem;
