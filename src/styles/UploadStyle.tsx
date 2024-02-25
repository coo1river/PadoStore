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

export const ImgWrap = styled.div`
  width: 800px;
  border-radius: 50%;
  margin: 0 auto;

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
`;

export const UploadForm = styled.article`
  width: 800px;
  margin: 30px 0;
  display: flex;
  flex-direction: column;

  .add_switch_wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;

    p {
      font-size: 16px;
    }
  }

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

  textarea {
    margin-bottom: 30px;
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
  article {
    margin-bottom: 20px;
    background-color: white;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0px 0px 4px 0px #b4b4b42d;
  }

  input {
    box-shadow: 0px 0px 4px 0px #5757572c;
  }

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

  .sale_period_wrap {
    font-weight: 500;
    input {
      margin-left: 10px;

      &:nth-child(2) {
        margin-right: 30px;
      }
    }
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

export const SalePeriod = styled.article``;

export const UserAccount = styled.article`
  display: flex;
  flex-direction: column;

  label {
    margin-right: 20px;
    font-weight: 600;
    font-size: 16px;
  }

  #account-name {
    margin-right: 20px;
  }
`;

export const AddProduct = styled.article`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  label {
    width: 70px;
    font-size: 16px;
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

export const AddInputList = styled.article`
  #input_switch {
    padding: 0;
    position: absolute;
    /* hidden */
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;

    &:focus {
      outline: none;
    }
  }

  .switch_label {
    margin-bottom: 0;
    position: relative;
    cursor: pointer;
    display: inline-block;
    width: 58px;
    height: 28px;
    background: #fff;
    border: 2px solid var(--color-main);
    border-radius: 20px;
    transition: 0.2s;
  }
  .switch_label:hover {
    background: #efefef;
  }
  .onf_btn {
    position: absolute;
    top: 4px;
    left: 3px;
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background: var(--color-main);
    transition: 0.2s;
  }

  /* checking style */
  #input_switch:checked + .switch_label {
    background: var(--color-main);
    border: 2px solid var(--color-main);
  }

  #input_switch:checked + .switch_label:hover {
    background: var(--color-main);
  }

  /* move */
  #input_switch:checked + .switch_label .onf_btn {
    left: 34px;
    background: #fff;
    box-shadow: 1px 2px 3px #00000020;
  }

  .add_input_el {
    background-color: var(--color-trans-grey);
    margin: 10px 0 20px 0;
    border-radius: 15px;
    padding: 10px;
  }

  .input_list_wrap {
    display: flex;
    flex-direction: column;
  }

  .btn_add_input {
    background-color: var(--color-main);
    color: white;
    padding: 10px 20px;
    border-radius: 15px;
    width: fit-content;
    font-weight: 600;
    align-self: end;
  }
`;
