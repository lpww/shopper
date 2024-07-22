import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  const setup = (props = {}) => render(<Header {...props} />);

  test("should render the title", () => {
    setup();
    const title = screen.getByText("Shopping List");
    expect(title).toBeInTheDocument();
  });
});
