const SummaryTable = ({ summaryList }) => {
  return (
    <div className="container mt-3" style={{ height: "80vh" }}>
      <h1 className="text-light pb-2">Summary table</h1>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Publication Year</th>
            <th>Poem Name</th>
            <th>poet</th>
            <th>Metaphorical Count</th>
            <th>Metaphor Count</th>
          </tr>
        </thead>
        <tbody>
          {summaryList.length !== 0 &&
            summaryList.map((item, index) => (
              <tr key={index}>
                <td>{item.publication_year}</td>
                <td>{item.poem_name}</td>
                <td>{item.poet}</td>
                <td>{item.metaphorical_count}</td>
                <td>{item.metaphor_count}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default SummaryTable;
