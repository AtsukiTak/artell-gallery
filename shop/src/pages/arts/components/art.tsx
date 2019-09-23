import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Art } from "artell-models";

interface Props {
  art: Art;
}

export default ({ art }: Props) => {
  return <Container to={`/art/${art.id}`} src={art.thumbnail.getUrl()} />;
};

const Container = styled(Link)<{ src: string }>`
  display: inline-block;
  width: 300px;
  height: 300px;
  margin-top: 50px;
  margin-left: 50px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
`;
