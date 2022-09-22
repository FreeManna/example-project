import React from "react";
import { Link } from "react-router-dom";

export const Home: React.FC = () => {
  return (
    <article>
      Welcome Home
      <Link to="/sign-in">Sign-in</Link>
    </article>
  );
};
