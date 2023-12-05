import React, { useEffect, useState } from "react";
function PoemSelectionForm({
  mapping,
  moodList,
  formData,
  onFormChange,
  onFilter,
  isButtonDisabled,
}) {
  // const [mood, setMood] = useState("");
  // const [poet, setPoet] = useState("");
  // const [poem, setPoem] = useState("");
  const [uniqueMoods, setUniqueMoods] = useState([]);
  const [uniquePoemNames, seUniquePoemNames] = useState([]);

  useEffect(() => {
    const tempUniquePoemNames = mapping.reduce((accumulator, currentPoet) => {
      currentPoet.poems.forEach((poem) => {
        if (!accumulator.includes(poem.name)) {
          accumulator.push(poem.name);
        }
      });
      return accumulator;
    }, []);
    seUniquePoemNames(tempUniquePoemNames);
    setUniqueMoods(moodList);
  }, [mapping, moodList]);

  useEffect(() => {
    if (formData.poet === "") {
      const tempUniquePoemNames = mapping.reduce((accumulator, currentPoet) => {
        currentPoet.poems.forEach((poem) => {
          if (!accumulator.includes(poem.name)) {
            accumulator.push(poem.name);
          }
        });
        return accumulator;
      }, []);
      seUniquePoemNames(tempUniquePoemNames);
      if (formData.poem === "") {
        setUniqueMoods(moodList);
      } else {
        /// have to code
        const tempMoodList = mapping
          .map((poetData) => poetData.poems)
          .flat()
          .filter((poemData) => poemData.name === formData.poem);
        setUniqueMoods(tempMoodList[0].moods);
      }
    } else {
      const poemsBySelectedPoet = mapping
        .filter((poetData) => poetData.poet === formData.poet)
        .map((poetData) => poetData.poems)
        .flat();

      const uniquePoemNames = Array.from(
        new Set(poemsBySelectedPoet.map((poem) => poem.name))
      );
      uniquePoemNames.unshift("");
      seUniquePoemNames(uniquePoemNames);

      const uniqueMoods = Array.from(
        new Set(poemsBySelectedPoet.flatMap((poem) => poem.moods))
      );
      setUniqueMoods(uniqueMoods);
    }
  }, [mapping, moodList, formData.poem, formData.poet]);

  return (
    <div className="container">
      <div className="custom-form-container pb-4 mt-4">
        <h2
          style={{ fontFamily: "montserrat" }}
          className="text-light mt-2 mb-2 font-weight-bold"
        >
          Poem and Poet Selection
        </h2>
        <form>
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-3">
              <div className="form-group m-2">
                <label htmlFor="poetSelect" className="text-light">
                  Select a Poet:
                </label>
                <select
                  id="poetSelect"
                  className="form-control"
                  name="poet"
                  value={formData.poet}
                  onChange={onFormChange}
                >
                  {mapping &&
                    mapping.map((option, index) => (
                      <option key={index} value={option.poet}>
                        {option.poet}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="col-md-2"></div>
            <div className="col-md-3">
              <div className="form-group m-2">
                <label htmlFor="poemSelect" className="text-light">
                  Select a Poem:
                </label>
                <select
                  id="poemSelect"
                  className="form-control"
                  name="poem"
                  value={formData.poem}
                  onChange={onFormChange}
                >
                  {uniquePoemNames &&
                    uniquePoemNames.map((poem, index) => (
                      <option key={index} value={poem}>
                        {poem}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <div className="form-group m-2">
                <label htmlFor="moodSelect" className="text-light">
                  Select a mood:
                </label>
                <select
                  id="moodSelect"
                  className="form-control"
                  name="mood"
                  value={formData.mood}
                  onChange={onFormChange}
                >
                  {uniqueMoods &&
                    uniqueMoods.map((poem, index) => (
                      <option key={index} value={poem}>
                        {poem}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="col-md-4"></div>
          </div>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4 pt-3">
              <button
                className={`btn btn-primary custom-button ${
                  isButtonDisabled ? "disabled" : "enabled"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  onFilter();
                }}
                disabled={isButtonDisabled}
              >
                Search
              </button>
            </div>
            <div className="col-md-4"></div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PoemSelectionForm;
