import React, { useState, useEffect } from "react";

export const WebsiteItem = ({ website, handleSelectChange, search }) => {
  const { id, selected, name } = website;
  const [checked, setChecked] = useState(selected);

  useEffect(() => {
    setChecked(selected);
  }, [selected]);

  const handleChange = () => {
    handleSelectChange(id);
    setChecked(!checked);
  };

  const val = name.replace(
    new RegExp(search, "gi"),
    (match) => `<mark>${match}</mark>`,
  );

  return (
    <div key={id} className={`website-item ${checked ? "checked" : ""}`}>
      <input
        type="checkbox"
        name=""
        id=""
        checked={checked}
        onChange={handleChange}
        className="checkbox"
      />
      <span dangerouslySetInnerHTML={{ __html: val }}></span>
    </div>
  );
};
