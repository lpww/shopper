import { fireEvent, render, screen } from "@testing-library/react";
import ShoppingListItem from "./ShoppingListItem";

const item = {
  completed: false,
  description: "loose",
  name: "carrots",
};

describe("ShoppingListItem", () => {
  const setup = (overrideProps) => { 
    const defaultProps = { item };
    const props = { ...defaultProps, ...overrideProps };
    return render(<ShoppingListItem {...props} />);
  };

  test("should render a completed checkbox", () => {
    setup();

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  test("should render the item name", () => {
    setup();

    const name  = screen.getByText(item.name);
    expect(name).toBeInTheDocument();
  });

  test("should render the item description", () => {
    setup();

    const description  = screen.getByText(item.description);
    expect(description).toBeInTheDocument();
  });

  test("should handle event completion", () => {
    const onCompleteMock = jest.fn();
    setup({ onComplete: onCompleteMock });

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(onCompleteMock).toHaveBeenCalledTimes(1);
    expect(onCompleteMock).toHaveBeenCalledWith(item);
  });

  test("should handle item editing", () => {
    const onEditMock = jest.fn();
    setup({ onEdit: onEditMock });

    const [button] = screen.getAllByRole("button");
    fireEvent.click(button);

    expect(onEditMock).toHaveBeenCalledTimes(1);
    expect(onEditMock).toHaveBeenCalledWith(item);
  });

  test("should handle item deletion", () => {
    const onDeleteMock = jest.fn();
    setup({ onDelete: onDeleteMock });

    const [, button] = screen.getAllByRole("button");
    fireEvent.click(button);

    expect(onDeleteMock).toHaveBeenCalledTimes(1);
    expect(onDeleteMock).toHaveBeenCalledWith(item);
  });
});
