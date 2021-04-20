import EditableTable, { formtypes } from "./components/EditableTable";

const testColumns = [
  {
    title: "№",
    key: "index",
    isVisible: true,
    width: 70,
    fixed: "left",
    sorter: true,
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
    rules: [
      {
        required: true,
        message: "required",
      },
    ],
  },
  {
    key: "age",
    title: "Age",
    dataIndex: "age",
    formType: formtypes.number,
    width: 120,
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
          },
          {
            key: "flatNumber",
            title: "Flat number",
            dataIndex: "flatNumber",
            formType: formtypes.number,
            width: 120,
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
        width: 120,
        rules: [
          {
            required: true,
            message: "required",
          },
        ],
      },
      {
        key: "street",
        title: "Street",
        dataIndex: "street",
        formType: formtypes.text,
        width: 120,
        rules: [
          {
            required: true,
            message: "required",
          },
          {
            len: 2,
            message: "min 2",
          },
        ],
      },
    ],
  },
  {
    key: "phoneNumber",
    title: "phone Number",
    dataIndex: "phoneNumber",
    formType: formtypes.number,
    width: 120,
  },
  {
    key: "phoneNumber",
    title: "phone Number",
    dataIndex: "phoneNumber",
    formType: formtypes.number,
    width: 120,
  },
  {
    key: "phoneNumber",
    title: "phone Number",
    dataIndex: "phoneNumber",
    formType: formtypes.number,
    width: 120,
  },
  {
    key: "phoneNumber",
    title: "phone Number",
    dataIndex: "phoneNumber",
    formType: formtypes.number,
    width: 120,
  },
  {
    key: "phoneNumber",
    title: "phone Number",
    dataIndex: "phoneNumber",
    formType: formtypes.number,
    width: 120,
  },  {
    key: "phoneNumber",
    title: "phone Number",
    dataIndex: "phoneNumber",
    formType: formtypes.number,
    width: 120,
  },  {
    key: "phoneNumber",
    title: "phone Number",
    dataIndex: "phoneNumber",
    formType: formtypes.number,
    width: 120,
  },  {
    key: "phoneNumber",
    title: "phone Number",
    dataIndex: "phoneNumber",
    formType: formtypes.number,
    width: 120,
  },
];

function App() {
  return (
    <>
      <h1>Demo</h1>

      <br />

      <EditableTable columns={testColumns} />
    </>
  );
}

export default App;
