import styled from "styled-components";

export const UploadMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--color-trans-grey);

  .product_title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
  }
`;

export const UploadForm = styled.article`
  width: 800px;
  margin: 30px 0;
  display: flex;
  flex-direction: column;

  label {
    font-size: 18px;
    font-weight: 700;
    color: #2e2e2e;
    margin-bottom: 10px;
  }

  input {
    background-color: white;
    border-radius: 15px;
    margin-bottom: 25px;
  }

  input,
  textarea {
    caret-color: var(--color-main);
    padding: 15px 25px;
    font-size: 15px;
    box-shadow: 0px 0px 4px 0px #b4b4b42d;

    &:focus {
      outline: 2px solid var(--color-main);
    }
  }

  .label_file {
    display: block;
    background-color: var(--color-lightgrey);
    height: 300px;
    margin: 0 150px;
    border-radius: 15px;
    cursor: pointer;
  }

  .input_file {
    display: none;
  }

  .btn_wrap button {
    padding: 5px 20px;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 15px;
    background-color: white;
    color: #2e2e2e;
    font-weight: 600;
    border: 1px solid var(--color-lightgrey);
  }

  .textarea_contents {
    font-family: var(--font-main);
    border-radius: 15px;
    font-size: 15px;
  }

  .btn_upload {
    background-color: var(--color-main);
    margin: 20px 0;
    padding: 15px;
    color: white;
    font-weight: 700;
    border-radius: 15px;
  }
`;

export const GroupForm = styled(UploadForm)`
  .product_list {
    background-color: white;
    margin: 20px 0;
  }

  .product_add_wrap {
    display: flex;
    flex-direction: column;
  }

  .btn_product_add {
    background-color: var(--color-main);
    color: white;
  }

  select {
    padding: 10px 15px;
    margin-bottom: 25px;
    box-shadow: 0px 0px 3px 0px #6d6d6d4e;
    border-radius: 15px;
    border: none;
    font-family: var(--font-main);
    font-size: 15px;

    &:focus-visible {
      outline: none;
    }

    &:focus,
    &:active {
      outline: 2px solid var(--color-main);
    }
  }
`;

export const AddProduct = styled.article`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  padding: 20px;
  box-shadow: 0px 0px 4px 0px #b4b4b42d;
  background-color: white;
  border-radius: 15px;

  label {
    width: 70px;
    font-size: 16px;
  }

  input {
    box-shadow: 0px 0px 4px 0px #5757572c;
  }

  .product_name {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    label {
      width: 90px;
    }

    input {
      margin-bottom: 0;
      width: 100%;
      box-sizing: border-box;
    }
  }

  .price_and_count {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;

    label {
      margin-bottom: 0;
    }

    input {
      margin-right: 20px;
      margin-bottom: 0;
    }
  }

  .btn_product_add {
    padding: 10px 20px;
    border-radius: 15px;
    width: fit-content;
    font-weight: 700;
    font-size: 15px;
    align-self: end;
  }
`;

export const ProductList = styled.article`
  padding: 10px 20px;
  margin-bottom: 30px;
  border-radius: 15px;
  background-color: white;

  .product_el {
    background-color: var(--color-trans-grey);
    padding: 10px;
    border-radius: 15px;
    margin: 10px 0;
    display: flex;
    justify-content: space-between;

    div {
      display: flex;
      align-items: center;
    }

    .product_count {
      margin-right: 20px;
    }

    .product_price {
      font-size: 18px;
      font-weight: 700;
    }

    .product_name {
      font-size: 18px;
      font-weight: 600;
    }
  }
`;
