import React from "react";
import Select from "react-select";
export default ({ onChange, options, value, className }) => {
  console.log(options);
  const items = options?.map((item) => ({
    value: item.id,
    label: item.firstname + " " + item.lastname,
  }));
  // //console.log(options);
  //console.log(items);
  // const defaultValue = (items, value) => {
  //   return items ? items.find((option) => option.value === value) : "";
  // };

  // //   console.log(defaultValue(items, value));
  return (
    <div className={className}>
      <Select
        value={items.value}
        onChange={(value) => onChange(value)}
        options={items}
        placeholder="Select User..."
      />
    </div>
  );
};

//  {
//    options?.length <= 0 ? (
//      <h2>No transaction Found</h2>
//    ) : (
//      options?.map((item) => (
//        <option value={item.id}>
//          {item.fname} {item.lname}
//        </option>
//      ))
//    );
//  }
