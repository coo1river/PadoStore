import React from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import styled from "styled-components";
import ModalFilter from "../modal/modalFilter";

export interface AddressData {
  zonecode: string;
  address: string;
  addressType: "R" | "J";
  bname: string;
  buildingName: string;
}

interface PostcodeProps {
  onComplete: (data: AddressData) => void;
}

const DaumPostcode: React.FC<PostcodeProps> = ({ onComplete, ...props }) => {
  const handleComplete = (data: AddressData) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    onComplete(data);
  };

  return (
    <PostCodeModal>
      <DaumPostcodeEmbed onComplete={handleComplete} {...props} />
    </PostCodeModal>
  );
};

export default DaumPostcode;

const PostCodeModal = styled.div`
  width: 500px;
  box-shadow: 0px 0px 4px 0px #0000002f;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 200;
`;
