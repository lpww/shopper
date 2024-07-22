import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  const setup = (props = {}) => render(<Button {...props} />);

  test("should render it's children", () => {
    setup();
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  test("should handle clicks", () => {
    const onClickMock = jest.fn();

    setup({ onClick: onClickMock });

    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
