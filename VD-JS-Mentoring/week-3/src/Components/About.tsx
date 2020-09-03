import React, { FunctionComponent, useState } from "react";

const getName = async (handler: Function) => {
  const get = await import(/* webpackChunkName:"lodash" */ "lodash/get");
  handler(get.default({ name: "Michael" }, "name"));
};

export const About: FunctionComponent = () => {
  const [name, setName] = useState("");
  getName(setName);

  return <h1>My Name is {name}</h1>;
};
