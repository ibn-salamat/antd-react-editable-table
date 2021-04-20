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
  return columns.map((column) => {
    return renderColumn(column);
  });
}

function renderColumn(column) {
  const { dataIndex, formType, options, width, rules = [] } = column;

  let newColumn = { ...column };

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
      return column;
  }

  return newColumn;
}

function CEditableTable({ columns: propColumns }) {
  const [form] = useForm();
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setColumns(renderColumns(propColumns, data));
  }, [data]);

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

  console.log(form.getFieldsValue());

  return (
    <>
      <h1>Editable Table</h1>

      <Form form={form}>
        <Table
          columns={columns}
          dataSource={data}
          sticky
          className="custom-antd-editable-table"
          scroll={{ x: "max-content" }}
        />
      </Form>

      <button onClick={addRow}>add</button>
    </>
  );
}

function flatColumns(columns) {
  function checkChildren(obj, outputArr) {
    if (obj.children) {
      obj.children.forEach((child) => {
        checkChildren(child, outputArr);
      });

      // eslint-disable-next-line no-param-reassign
      delete obj.children;
      outputArr.push(obj);
    } else {
      outputArr.push(obj);
    }
  }

  return columns.reduce((acc, column) => {
    const arr = [];
    checkChildren(column, arr);

    return [...acc, ...arr];
  }, []);
}

export default CEditableTable;
