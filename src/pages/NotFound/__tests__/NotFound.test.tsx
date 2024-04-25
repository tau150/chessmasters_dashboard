import { expect } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { NotFound } from "../NotFound";

describe("NotFound page", () => {
  it("should match with snapshot", () => {
    const { container } = render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
