import { expect } from "vitest";
import { render } from "@testing-library/react";

import { LoadingSection } from "../LoadingSection";

describe("LoadingSection component", () => {
  it("should render properly", () => {
    const { container } = render(<LoadingSection />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
