import { render } from "@testing-library/react";

import Page from "@/app/page";

describe("Page", () => {
  it("renders a hello world", () => {
    render(<Page />);
  });
});
