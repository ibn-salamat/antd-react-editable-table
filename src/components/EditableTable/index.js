/* eslint-disable camelcase */
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Form, Table, Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import { uid } from "uid";

import { renderColumns } from "./renderColumns";

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

const CEditableTable = forwardRef(
  ({ columns: propColumns, data: propData, loading, mode }, ref) => {
    const [form] = useForm();
    const [data, setData] = useState([]);
    const [columns] = useState(renderColumns([...propColumns], mode));

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

    function deleteRow() {
      setData(data.slice(0, data.length - 1));
    }

    function getTableDatas() {
      const values = form.getFieldsValue();

      const tableData = parseFormValuesToArray(values);

      return tableData;
    }

    //
    useImperativeHandle(ref, () => ({
      getTableData() {
        return getTableDatas();
      },
    }));

    // change data
    useEffect(() => {
      if (!Array.isArray(propData)) return;

      setData(
        propData.map((row) => {
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
            {Boolean(data.length) && (
              <Button onClick={deleteRow}>delete</Button>
            )}
          </>
        )}
      </>
    );
  }
);

export default CEditableTable;
