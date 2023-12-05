import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function Table({ tabelContent }) {
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);

  const handleRowClick = (rowId, item) => {
    setSelectedRow(item);
    setShowModal(true);
    setSelectedRowId(rowId);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-9"></div>
        <div className="col-1 p-2">
          <label htmlFor="filterSelector" className="text-light">
            <i style={{ fontSize: "24px" }} className="fa">
              &#xf0b0;
            </i>
            Filter
          </label>
        </div>
        <div className="col-2">
          <div className="form-group">
            <select
              id="filterSelector"
              className="form-control"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="Metaphor">Metaphor</option>
              <option value="Metaphorical">Metaphorical</option>
              <option value="">Others</option>
            </select>
          </div>
        </div>
      </div>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Poem Name</th>
            <th>Poem Line</th>
            <th>Is Metaphor Present</th>
            <th>Metaphor Type</th>
          </tr>
        </thead>
        <tbody>
          {tabelContent &&
            tabelContent.map((item, index) => {
              if (filter === "all" || item.metaphor_type === filter) {
                return (
                  <tr
                    key={index}
                    onClick={() => handleRowClick(index + 1, item)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{index + 1}</td>
                    <td>{item.poem_name}</td>
                    <td>{item.poems_line}</td>
                    <td>{item.is_metaphor_present}</td>
                    <td>{item.metaphor_type}</td>
                  </tr>
                );
              }
            })}
        </tbody>
      </table>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Selected Row Id {selectedRowId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRow && (
            <div>
              <p>Poem Name: {selectedRow.poem_name}</p>
              <p>Poet: {selectedRow.poet}</p>
              <p>Poems Line: {selectedRow.poems_line}</p>
              <p>Is Metaphor Present: {selectedRow.is_metaphor_present}</p>
              <p>Count Of Metaphor: {selectedRow.count_of_metaphor}</p>
              {selectedRow.count_of_metaphor !== 0 && (
                <p>Metaphorical Terms: {selectedRow.metaphorical_terms}</p>
              )}
              {selectedRow.count_of_metaphor !== 0 && (
                <p>Souce Domain: {selectedRow.souce_domain}</p>
              )}
              {selectedRow.count_of_metaphor !== 0 && (
                <p>Target Domain: {selectedRow.target_domain}</p>
              )}
              {selectedRow.count_of_metaphor !== 0 && (
                <p>Interpretation: {selectedRow.interpretation}</p>
              )}
              {selectedRow.count_of_metaphor !== 0 && (
                <p>Mood: {selectedRow.mood}</p>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Table;
