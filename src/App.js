import { Divider } from "antd";
import { useEffect, useState } from "react";

import EditableTable, { formtypes } from "./components/EditableTable";

const testColumns = [
  {
    title: "№",
    key: "index",
    width: 70,
    fixed: "left",
    render: (text, record, index) => {
      // eslint-disable-next-line react/destructuring-assignment
      // (component.state.currentPage - 1) * component.state.pageSize + index + 1,
      return index + 1;
    },
  },
  {
    key: "name",
    title: "Name",
    dataIndex: "name",
    formType: formtypes.text,
    width: 120,
    initialValue: "Al",
    editable: true,
    // rules: [
    //   {
    //     required: true,
    //     message: "required",
    //   },
    // ],
  },
  {
    key: "age",
    title: "Age",
    dataIndex: "age",
    formType: formtypes.number,
    width: 120,
    editable: true,
  },
  {
    key: "adressInfo",
    title: "Adress info",
    children: [
      {
        key: "houseInfo",
        title: "House info",
        children: [
          {
            key: "houseNumber",
            title: "House number",
            dataIndex: "houseNumber",
            formType: formtypes.number,
            width: 120,
            editable: true,
          },
          {
            key: "flatNumber",
            title: "Flat number",
            dataIndex: "flatNumber",
            formType: formtypes.number,
            width: 120,
            editable: true,
          },
        ],
      },
      {
        key: "city",
        title: "City",
        dataIndex: "city",
        formType: formtypes.select,
        options: [
          { label: "Atyrau", value: "atyrau_06" },
          { label: "Almaty", value: "almaty_02" },
        ],
        initialValue: "atyrau_06",
        width: 120,
        editable: true,

        // rules: [
        //   {
        //     required: true,
        //     message: "required",
        //   },
        // ],
      },
      {
        key: "street",
        title: "Street",
        dataIndex: "street",
        formType: formtypes.text,
        width: 120,
        // rules: [
        //   {
        //     required: true,
        //     message: "required",
        //   },
        //   {
        //     len: 2,
        //     message: "min 2",
        //   },
        // ],
        editable: true,
      },
    ],
  },
];

const testData = [
  {
    age: 55,
    city: "atyrau_06",
    flatNumber: 5454,
    houseNumber: 5454,
    name: "Al",
    street: "465464",
  },
  {
    age: 654841,
    city: "almaty_02",
    flatNumber: 646445,
    houseNumber: 4186416541,
    name: "Aldssdf",
    street: "68465",
  },
];

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    setLoading(true);
    new Promise(() => {
      setTimeout(() => {
        setData(testData);
        setLoading(false);
      }, 1500);
    });
  }

  return (
    <>
      <div style={{ padding: "10px 15px" }}>
        <br />
        <h1>Edit mode</h1>
        <EditableTable columns={testColumns} />
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
