/**
 * @jest-environment jsdom
 */

import React from "react";
import {  screen } from "@testing-library/react";
import { getPage } from 'next-page-tester';

describe("Home", () => {
  it("renders a heading", async () => {
    const { render } = await getPage({
      route: '/',
    });
    render();

    const heading = screen.getByRole("heading", {
      name: /Home page/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
