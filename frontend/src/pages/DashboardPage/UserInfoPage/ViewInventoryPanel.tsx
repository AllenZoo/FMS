import { useState } from "react";

// import {
//   getDataValues,
//   getTableColumns,
//   getUserTables,
// } from "@/controllers/userInfoControllers";

import styles from "./ViewInventoryPanel.module.scss";

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
/**
 * Renders the 'View Inventory' panel of User Info
 * @returns The 'View Inventory' panel.
 */
const ViewInventoryPanel = (): React.ReactElement => {
  // const [tables, setTables] = useState<string[]>([]);
  // const [columns, setColumns] = useState<string[]>([]);

  // const [selectedTable, setSelectedTable] = useState<string>("");
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  // TODO: remove the following once panel is implemented (temp here for build errors)
  setSelectedColumns([]);

  // const [data, setData] = useState<any>([]);

  // Inpsired by: https://stackoverflow.com/questions/36205673/how-do-i-create-a-dynamic-drop-down-list-with-react-bootstrap
  // const createSelectTableItems = () => {
  // let items = [];
  // for (let i = 0; i < tables.length; i++) {
  //   items.push(
  //     <option key={tables[i]} value={tables[i]}>
  //       {tables[i]}
  //     </option>
  //   );
  // }
  // return items;
  // };

  // const onSelectTable = async (e: any) => {
  // const data = await getTableColumns(e.target.value);
  // setColumns(data);
  // setSelectedTable(e.target.value);
  // setSelectedColumns([]);
  // };

  //const createSelectColumnItems = () => {
  // let items = [];
  // for (let i = 0; i < columns.length; i++) {
  //   items.push(
  //     <option key={columns[i]} value={columns[i]}>
  //       {columns[i]}
  //     </option>
  //   );
  // }
  // return items;
  //};

  // const onSelectColumn = (e: any) => {
  // let value = Array.from(
  //   e.target.selectedOptions,
  //   (option: any) => option.value
  // );

  // setSelectedColumns(value);
  // setData([]);
  // };

  // const getTables = async () => {
  // const data = await getUserTables();
  // setTables(data);
  // };

  // const getData = async () => {
  // const data = await getDataValues(selectedTable, selectedColumns);
  // setData(data);
  // };

  const createTable = () => {
    return (
      <table className={styles.Table}>
        <thead>
          <tr>
            {selectedColumns.map((column) => (
              <th>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* { data.map((row: any) => {
            return (
              <tr>
                { selectedColumns.map((column) => <td>{row[column]}</td>) }
              </tr>
            );
          })} */}
        </tbody>
      </table>
    );
  };

  // const selectOptions = useMemo(() => {
  //return createSelectColumnItems();
  // }, [columns]);

  // useEffect(() => {
  //   getTables();
  // }, []);

  // useEffect(() => {
  //   createSelectColumnItems();
  // }, [columns]);

  return (
    <div className={styles.Panel}>
      <main>
        <div className={styles.ControlPanel}>
          <h1>View Inventory</h1>
          <div className={styles.Controls}>
            {/* <select
              className={styles.Select}
              onChange={onSelectTable}
            >
              {createSelectTableItems()}
            </select>
            <select
              className={styles.Select}
              id="selectColumn"
              onChange={onSelectColumn}
              multiple={true}
            >
              {selectOptions}
            </select>
            <button className={styles.Button} onClick={getData}>
              View Selected
            </button> */}
          </div>
        </div>

        <div className={styles.DisplayPanel}>{createTable()}</div>
      </main>
    </div>
  );
};

export default ViewInventoryPanel;
