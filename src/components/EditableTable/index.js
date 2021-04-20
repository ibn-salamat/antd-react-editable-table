/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import { Input, InputNumber, Select, Form, Table } from "antd";
import { useForm } from "antd/lib/form/Form";
import { uid } from "uid";

export const formtypes = {
  text: "text",
  number: "number",
  select: "select",
  datePicker: "datePicker",
  rangePicker: "rangePicker",
};

function renderColumns(columns) {
  columns.forEach((column, i, current) => {
    if (column.children) {
      renderColumns(column.children);
    } else {
      current[i] = renderColumn(column);
    }
  });
  return columns;
}

function renderColumn(column) {
  const { dataIndex, formType, options, width, rules = [] } = column;

  let newColumn = column;

  switch (formType) {
    case formtypes.text:
      newColumn = {
        ...column,
        render: (a, col) => {
          return (
            <Form.Item name={`${col.key}__${dataIndex}`} rules={rules}>
              <Input
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
    case formtypes.number:
      newColumn = {
        ...column,
        render: (a, col) => {
          return (
            <Form.Item name={`${col.key}__${dataIndex}`} rules={rules}>
              <InputNumber style={{ width }} />
            </Form.Item>
          );
        },
      };
      break;
    case formtypes.select:
      newColumn = {
        ...column,
        render: (a, col) => {
          return (
            <Form.Item name={`${col.key}__${dataIndex}`} rules={rules}>
              <Select options={options} style={{ width }} />
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

function CEditableTable({ columns: propColumns }) {
  const [form] = useForm();
  const [data, setData] = useState([]);
  const [columns] = useState(renderColumns([...propColumns]));

  async function addRow() {
    await form.validateFields();

    const newData = {
      key: uid(),
    };

    columns.forEach((column) => {
      const { dataIndex, initialValue = null } = column;

      newData[dataIndex] = initialValue;
    });

    setData([...data, newData]);
  }

  return (
    <>
      <h1>Editable Table</h1>

      <Form form={form}>
        <Table
          id="custom-antd-editable-table"
          columns={columns}
          dataSource={data}
          sticky
          className="custom-antd-editable-table"
          scroll={{ x: "max-content" }}
          pagination={false}
        />
      </Form>

      <button onClick={addRow}>add</button>
      <button
        onClick={() => {
          console.log(form.getFieldsValue());
        }}
      >
        console
      </button>
    </>
  );
}

// function flatColumns(columns) {
//   function checkChildren(obj, outputArr) {
//     if (obj.children) {
//       obj.children.forEach((child) => {
//         checkChildren(child, outputArr);
//       });

//       // eslint-disable-next-line no-param-reassign
//       delete obj.children;
//       outputArr.push(obj);
//     } else {
//       outputArr.push(obj);
//     }
//   }

//   return columns.reduce((acc, column) => {
//     const arr = [];
//     checkChildren(column, arr);

//     return [...acc, ...arr];
//   }, []);
// }

export default CEditableTable;
