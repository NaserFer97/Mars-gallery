import { render, fireEvent, wait } from "@testing-library/react";
import App from "./App";
import { dateToSol } from "./services/sols";
import React from "react";

describe("App", () => {
  describe("initial render", () => {
    it("Should render Sep 28 2019", () => {
      const { queryByTestId } = render(<App />);
      const dateLabel = queryByTestId("date-label");
      const dateSlider = queryByTestId("date-slider");

      expect(dateLabel.textContent).toBeDefined();
      expect(dateLabel.textContent).toBe("2019-09-28");
      expect(dateSlider).toBeDefined();
      expect(dateSlider.value).toBe(dateToSol("2019-09-28").toString());
    });
  });

  describe("Selecting a pre-curiosity day and changing criteria", () => {
    it("Should show the correct number of images", async () => {
      jest.setTimeout(10000);
      const renderedElement = render(<App />);
      const day = "2007-11-28";
      const dateLabel = renderedElement.queryByTestId("date-label");
      const dateSlider = renderedElement.queryByTestId("date-slider");
      const checkboxes = renderedElement.getAllByTestId("rover-selected");

      fireEvent.change(dateSlider, { target: { value: dateToSol(day) } });

      await wait(() => {
        expect(dateLabel.textContent).toBe(day);
        expect(dateSlider.value).toBe(dateToSol(day).toString());

        const images = renderedElement.getAllByTestId("rover-image");
        expect(images.length).toBe(8);
      });

      fireEvent.click(checkboxes[1]);
      await wait(() => {
        const images = renderedElement.getAllByTestId("rover-image");
        expect(images.length).toBe(2);
      });

      const cameraSelect = renderedElement.queryByTestId("camera-select");
      fireEvent.change(cameraSelect, {
        target: {
          value: "NAVCAM"
        }
      });
      await wait(() => {
        const images = renderedElement.getAllByTestId("rover-image");
        expect(images.length).toBe(27);
      });
    });
  });
});
