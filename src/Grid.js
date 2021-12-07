import React, {useEffect, useState, createRef} from 'react';
import ReactDOM from 'react-dom'

const DefaultTableCellComponent = ({ data }) => <span>{data}</span>;

const Grid = ({ config, data }) => {

  const theTable = createRef();

  useEffect(() => {
    const tableHeadElement = theTable.current.createTHead();
    const tableHeadRow = tableHeadElement.insertRow(-1);
    const tableBody = theTable.current.tBodies[0] ? theTable.current.tBodies[0] : theTable.current.createTBody();

    config.map(element => {
      const newNode = document.createTextNode(element.title);
      tableHeadRow.insertCell(-1).appendChild(newNode);
    })
    
    data.map(datum => {
      const tableBodyRow = tableBody.insertRow(-1);

      config.map(element => {
        const latestCell = tableBodyRow.insertCell(-1);
        const columnFieldComponent = element.component ? <element.component data={datum[element.field]} /> : <DefaultTableCellComponent data={datum[element.field]} />;
        ReactDOM.render(columnFieldComponent, latestCell);
      })

    })
  }, [config, data])


  return (
    <table ref={theTable}></table>
  )

};

export default Grid;