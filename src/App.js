import { useEffect, useState, useRef } from "react";
import { Divider, Button } from "antd";

import EditableTable from "./components/EditableTable";
import { testColumns, testData } from "./components/EditableTable/utils";

function App() {
  const tableRef = useRef();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  function getData() {
    setLoading(true);
    new Promise(() => {
      setTimeout(() => {
        setData(testData);
        setLoading(false);
      }, 1500);
    });
  }

  function getTableData() {
    const tableData = tableRef.current.getTableData();

    console.log(tableData);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div style={{ padding: "10px 15px" }}>
        <br />
        <h1>Edit mode</h1>
        <EditableTable columns={testColumns} ref={tableRef} />
        <Button onClick={getTableData}>Get data</Button>
      </div>

      <Divider />
      <div style={{ padding: "10px 15px" }}>
        <h1>View mode with props data</h1>
        <EditableTable
          columns={testColumns}
          data={data}
          loading={loading}
          mode="view"
        />
      </div>
    </>
  );
}

export default App;
