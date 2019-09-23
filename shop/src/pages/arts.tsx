import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "services/index";
import { queryArts } from "services/art";

import ArtComponent from "./arts/components/art";

export default () => {
  const arts = useSelector((state: RootState) => state.art.list);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (arts.size === 0) {
      dispatch(queryArts());
    }
  }, [arts, dispatch]);

  if (arts.size === 0) {
    return <h2>Loading</h2>;
  } else {
    return (
      <Container>
        {Array.from(arts.values()).map(art => (
          <ArtComponent key={art.id} art={art} />
        ))}
      </Container>
    );
  }
};

const Container = styled.div`
  width: 100%;
  padding: 50px;
`;
