import React from "react";
import Counter from "./Counter";
//import { action } from "@storybook/addon-actions";
import "bootstrap/dist/css/bootstrap.css";

export default {
  component: Counter,
  title: "Counter"
};

export const Default = () => <Counter />;
