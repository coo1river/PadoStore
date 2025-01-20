import { KeyboardEvent, useState } from "react";

interface TagInputProps {
  tagList: string;
  setTagList: React.Dispatch<React.SetStateAction<string>>;
}

const TagInput: React.FC<TagInputProps> = ({ tagList, setTagList }) => {
  const [tagValue, setTagValue] = useState<string>("#");

  const handleAddTag = () => {
    const currentTagCount = tagList.split(" ").length;

    if (currentTagCount < 3 && tagValue.trim() !== "") {
      setTagList((prevTagList) => {
        if (prevTagList !== "") {
          return prevTagList + " " + tagValue.trim();
        } else {
          return tagValue.trim();
        }
      });

      // input 값 초기화
      setTagValue("#");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // 공백 제거
    const noSpaceValue = value.replace(/\s/g, "");

    if (!noSpaceValue.startsWith("#")) {
      setTagValue("#" + value);
    } else {
      setTagValue(value);
    }
  };

  // 태그 삭제
  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTagList = tagList
      .split(" ")
      .filter((tag) => tag !== tagToRemove)
      .join(" ");
    setTagList(updatedTagList);
  };

  // enter 키로 태그 추가하기
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div>
      <label htmlFor="product-tag">상품 태그(3개)</label>
      <div className="tag_wrap">
        <input
          type="text"
          value={tagValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleAddTag}>추가</button>
      </div>
      <ul className="tag_list">
        {tagList
          ? tagList.split(" ").map((tag, index) => (
              <li key={index}>
                {tag}
                <button onClick={() => handleRemoveTag(tag)} />
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default TagInput;
