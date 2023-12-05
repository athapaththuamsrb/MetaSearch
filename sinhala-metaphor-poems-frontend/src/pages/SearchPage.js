import React, { useState, useEffect } from "react";
import PoemSelectionForm from "./../components/PoemSelectionForm";
import Loader from "./../components/Loader";
import PoemTable from "./../components/PoemTable";

const SearchPage = () => {
  const [tabelContent, setTabelContent] = useState([]);
  const [tempTabelContent, setTempTabelContent] = useState([]);

  const [moodList, setMoodList] = useState([]);

  const [mapping, setMapping] = useState([]);

  const [isTabelContentLoaded, setIsTabelContentLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [formData, setFormData] = useState({
    poet: "",
    poem: "",
    mood: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/getAll")
      .then((response) => response.json())
      .then((data) => {
        setTabelContent(data.allData);
        setTempTabelContent(data.allData);
        setMoodList(data.moods);
        setMapping(data.mapping);
        setIsTabelContentLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const keyList = ["poem", "poet", "mood"];
    let isDisabled = true;
    for (let index = 0; index < keyList.length; index++) {
      if (name === keyList[index]) {
        isDisabled = value === "";
      } else {
        isDisabled = formData[keyList[index]] === "";
      }
      if (!isDisabled) break;
    }
    setIsButtonDisabled(isDisabled);
  };

  const handleFilter = () => {
    if (formData.poet === "" && formData.poem === "" && formData.mood === "") {
      setIsError(true);
    } else if (
      formData.poet !== "" &&
      formData.poem !== "" &&
      formData.mood !== ""
    ) {
      const selectByPoet = tabelContent.filter(
        (ele) =>
          ele.poem_name === formData.poem &&
          ele.poet === formData.poet &&
          ele.mood === formData.mood
      );
      setTempTabelContent(selectByPoet);
    } else if (
      formData.poet !== "" &&
      formData.poem !== "" &&
      formData.mood === ""
    ) {
      const selectByPoet = tabelContent.filter(
        (ele) => ele.poem_name === formData.poem && ele.poet === formData.poet
      );
      setTempTabelContent(selectByPoet);
    } else if (
      formData.poet !== "" &&
      formData.poem === "" &&
      formData.mood !== ""
    ) {
      const selectByPoet = tabelContent.filter(
        (ele) => ele.poet === formData.poet && ele.mood === formData.mood
      );
      setTempTabelContent(selectByPoet);
    } else if (
      formData.poet === "" &&
      formData.poem !== "" &&
      formData.mood !== ""
    ) {
      const selectByPoet = tabelContent.filter(
        (ele) => ele.poem_name === formData.poem && ele.mood === formData.mood
      );
      setTempTabelContent(selectByPoet);
    } else if (
      formData.poet !== "" &&
      formData.poem === "" &&
      formData.mood === ""
    ) {
      const selectByPoet = tabelContent.filter(
        (ele) => ele.poet === formData.poet
      );
      setTempTabelContent(selectByPoet);
    } else if (
      formData.poet === "" &&
      formData.poem !== "" &&
      formData.mood === ""
    ) {
      const selectByPoet = tabelContent.filter(
        (ele) => ele.poem_name === formData.poem
      );
      setTempTabelContent(selectByPoet);
    } else if (
      formData.poet === "" &&
      formData.poem === "" &&
      formData.mood !== ""
    ) {
      const selectByPoet = tabelContent.filter(
        (ele) => ele.mood === formData.mood
      );
      setTempTabelContent(selectByPoet);
    }
  };

  return (
    <div>
      {!isTabelContentLoaded && <Loader></Loader>}
      {isTabelContentLoaded && (
        <PoemSelectionForm
          mapping={mapping}
          moodList={moodList}
          formData={formData}
          onFormChange={handleFormChange}
          onFilter={handleFilter}
          isButtonDisabled={isButtonDisabled}
        ></PoemSelectionForm>
      )}
      {isTabelContentLoaded && (
        <PoemTable tabelContent={tempTabelContent}></PoemTable>
      )}
    </div>
  );
};

export default SearchPage;
