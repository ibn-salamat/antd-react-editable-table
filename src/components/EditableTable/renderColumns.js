import React from "react";
import { Input, InputNumber, Select, Form } from "antd";

import { formTypes } from "./formTypes";

export function renderColumns(columns, mode) {
  columns.forEach((column, i, current) => {
    if (column.children) {
      renderColumns(column.children, mode);
    } else {
      current[i] = renderColumn(column, mode);
    }
  });
  return columns;
}

function renderColumn(column, mode) {
  const {
    dataIndex,
    formType,
    options,
    initialValue,
    width,
    rules = [],
    editable,
  } = column;

  let newColumn = column;

  switch (formType) {
    case formTypes.text:
      newColumn = {
        ...column,
        render: (val, col) => {
          return (
            <Form.Item
              initialValue={val || initialValue}
              name={`${col.key}__${dataIndex}`}
              rules={rules}
            >
              <Input
                disabled={mode === "view" || !editable}
                style={{ width }}
                // onChange={e => {
                //   console.log(e);
                // }}
              />
            </Form.Item>
          );
        },
      };
      break;
    case formTypes.number:
      newColumn = {
        ...column,
        render: (val, col) => {
          return (
            <Form.Item
              initialValue={val || initialValue}
              name={`${col.key}__${dataIndex}`}
              rules={rules}
            >
              <InputNumber
                disabled={mode === "view" || !editable}
                style={{ width }}
              />
            </Form.Item>
          );
        },
      };
      break;
    case formTypes.select:
      newColumn = {
        ...column,
        render: (val, col) => {
          return (
            <Form.Item
              initialValue={val || initialValue}
              name={`${col.key}__${dataIndex}`}
              rules={rules}
            >
              <Select
                disabled={mode === "view" || !editable}
                options={options}
                style={{ width }}
              />
            </Form.Item>
          );
        },
      };
      break;
    default:
      break;
  }

  return newColumn;
}
