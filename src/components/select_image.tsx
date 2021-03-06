import React, { useCallback } from "react";
import styled from "styled-components";

import { Image, UploadImage } from "models/image";
import { pc } from "components/responsive";
import Sumbnail from "components/sumbnail";

interface Props {
  image: Image;
  setImage: (image: UploadImage) => void;
}

export default ({ image, setImage }: Props) => {
  const onImageSelected = useCallback(
    async (e) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        const image = await UploadImage.fromFile(file);
        setImage(image);
      }
    },
    [setImage]
  );

  return (
    <Container>
      <Sumbnail image={image} />
      <SelectImageRect>画像を選択する</SelectImageRect>
      <HiddenFileInput
        type="file"
        accept="image/*"
        onChange={onImageSelected}
      />
    </Container>
  );
};

const Container = styled.label`
  display: block;
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;

  ${pc(`
    margin: 0;
  `)}
`;

const SelectImageRect = styled.div`
  width: 100%;
  margin-top: 4px;
  color: #acacac;
  text-align: left;
  font-size: 12px;
  letter-spacing: 0.46px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;
