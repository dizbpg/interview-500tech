import React, {useEffect, useState, createRef} from 'react';
import ReactDOM from 'react-dom'

const DefaultTableCellComponent = ({ data }) => <span>{data}</span>;

const Grid = ({ config, data }) => {

  const theTable = createRef();
  const [columnTitles, setColumnTitles] = useState();
  const [columnFields, setColumnFields] = useState();

  useEffect(() => {

    const columnTitlesArray = [];
    const columnFieldsArray = [];

    config.map(element => {
      columnTitlesArray.push(element.title);
      const columnFieldData = {
        fieldName: element.field,
        fieldComponentType: element.component ?? DefaultTableCellComponent
      }
      columnFieldsArray.push(columnFieldData);
    })

    setColumnTitles(columnTitlesArray);
    setColumnFields(columnFieldsArray);

  }, [config, setColumnTitles, setColumnFields])

  useEffect(() => {
    if (columnTitles) {
      const tableHeadElement = theTable.current.createTHead();
      const tableHeadRow = tableHeadElement.insertRow(-1);
      columnTitles.map(columnTitle => {
        const newNode = document.createTextNode(columnTitle);
        tableHeadRow.insertCell(-1).appendChild(newNode);
      });
    }
  }, [columnTitles])

  useEffect(() => {
    if (columnFields && data) {
      const tableBody = theTable.current.tBodies[0] ? theTable.current.tBodies[0] : theTable.current.createTBody();
      data.map(element => {
        const tableBodyRow = tableBody.insertRow(-1);
        columnFields.map(columnField => {
          const latestCell = tableBodyRow.insertCell(-1);
          const columnFieldComponent = <columnField.fieldComponentType data={element[columnField.fieldName]} />;
          ReactDOM.render(columnFieldComponent, latestCell);
        })
      })
    }
  }, [columnFields, data])

  return (
    <table ref={theTable}></table>
  )

};

export default Grid;