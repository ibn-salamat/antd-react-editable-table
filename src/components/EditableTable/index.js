/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import { Input, InputNumber, Select, Form, Table, Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import { uid } from "uid";

import { formtypes } from "./utils";

let globalMode;

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
    case formtypes.text:
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
                disabled={globalMode === "view" || !editable}
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
        render: (val, col) => {
          return (
            <Form.Item
              initialValue={val || initialValue}
              name={`${col.key}__${dataIndex}`}
              rules={rules}
            >
              <InputNumber
                disabled={globalMode === "view" || !editable}
                style={{ width }}
              />
            </Form.Item>
          );
        },
      };
      break;
    case formtypes.select:
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
                disabled={globalMode === "view" || !editable}
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

function parseFormValuesToArray(values) {
  const tableData = Object.keys(values).reduce((acc = [], key) => {
    const separatorIndex = key.indexOf("__");
    const id = key.substring(0, separatorIndex);
    const name = key.substring(separatorIndex + 2);

    const currentObj = acc.find((el) => el.id === id);
    if (!currentObj) {
      acc.push({ id, [name]: values[key] });
    } else {
      currentObj[name] = values[key];
    }

    return acc;
  }, []);

  return tableData;
}

function CEditableTable({
  columns: propColumns,
  data: propData,
  loading,
  mode,
}) {
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

  function getTableData() {
    const values = form.getFieldsValue();

    const tableData = parseFormValuesToArray(values);
    console.log(tableData);
  }

  // didMount
  useEffect(() => {
    if (mode === "view") {
      globalMode = "view";
    }
  }, []);

  // change data
  useEffect(() => {
    if (!Array.isArray(propData)) return;

    setData(
      propData.map((row, i) => {
        return {
          ...row,
          key: uid(),
        };
      })
    );
  }, [propData]);

  return (
    <>
      <Form form={form}>
        <Table
          loading={loading}
          id="custom-antd-editable-table"
          columns={columns}
          dataSource={data}
          sticky
          className="custom-antd-editable-table"
          scroll={{ x: "max-content" }}
          pagination={false}
        />
      </Form>

      <br />

      {mode !== "view" && (
        <>
          <Button onClick={addRow}>add</Button>
          <Button onClick={getTableData}>get table data in console</Button>
        </>
      )}
    </>
  );
}

export { formtypes };
export default CEditableTable;
