import React, { useEffect, useState } from "react";
import axios from "axios";
import useStateContext from "../hooks/useStateContext";
import { AppBar, Toolbar } from "@mui/material";
import RecommendationSection1 from "./Rec1";
import RecommendationSection2 from "./Recommendation2";
import RecommendationSection3 from "./Recommendation3";
import RecommendationSection4 from "./Recommendation4";
import TableDisplay from "./TableData";
import DisplayTable from "./DisplayTable";
import { useNavigate } from 'react-router';

import {
  Typography,
  Box,
  Button,

} from "@mui/material";
import testjson from "./loader.json";

const initialState = {
  qns: [],
  qnIndex: 0,
};

export default function Recommendation() {
  const [qns, setQns] = useState(initialState.qns);
  const [qnIndex, setQnIndex] = useState(initialState.qnIndex);
  const { context, setContext } = useStateContext();
  const [resultData, setResultData] = useState(null);
  const [renderContent, setRenderContent] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState(null);
  const [tempValue, setTempValue] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [recommendExecuted, setRecommendExecuted] = useState(false);
  const navigate = useNavigate();

  const handleReset = () => {
    window.location.reload();
  };
  const handleLogout = () => {
    navigate("/")
  };

  useEffect(() => {
    if (qnIndex === 0) {
      setContext({
        selectedOptions: [],
      });

      setQns(testjson);
    }
  }, []);

  const generateRecommend = async (catname) => {
    let currentRecommendation = null;
    let currentResult = null;
    if (!catname) {
      console.error("catname is undefined or null");
      return;
    }
    const category_name = catname;
    let responseData = "";

    if (tempValue[0].category === "Intensity") {
      let apiUrl = "http://localhost:3001/api/fitness-classes/GetByIntensity";
      let params = new URLSearchParams({ intensity: category_name });
      let response = await axios.get(`${apiUrl}?${params}`);
    
      responseData = response.data;
    } else {
      const values = catname.split(",").map((value) => parseInt(value.trim()));
      const min = values[0];
      const max = values[1];
      let apiUrl = "http://localhost:3001/api/fitness-classes/GetByCalories";
      let params = new URLSearchParams({ min: min, max: max });
      const response = await axios.get(`${apiUrl}?${params}`);
      responseData = response.data;
    }

    if (tempValue.length === 3) {
      responseData = responseData.filter((item) => {
        return item.category.includes(tempValue[1].category);
      });
    }

    // Randomly select 5 responses if there are more than 5
    const randomizedData =
      responseData.length > 5
        ? getRandomElements(responseData, 5)
        : responseData;

    setRecommendExecuted(true);
    setQns(randomizedData);
  };

  const getRandomElements = (array, count) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const updateAnswer = async (qnId, optionIdx, catname) => {
    
    const temp = [...context.selectedOptions];
    setSelectedOptionIdx(optionIdx);


    temp.push({
      qnId,
      selected: optionIdx,
      category: catname,
    });

    setContext({ selectedOptions: temp });
    setTempValue(temp);
    if (qnIndex < 1) {
     
      setContext({ selectedOptions: temp });
      setQnIndex(qnIndex + 1);
    } else {
      
      setSelectedOptionIdx(optionIdx);
      const temp = [...context.selectedOptions];
      temp.push({
        qnId,
        selected: optionIdx,
        category: catname,
      });
      setContext({ selectedOptions: temp });
      setTempValue(temp);
      // setContext({ selectedOptions: temp });
     
      try {
        setQnIndex(qnIndex + 1);

        // Clear the result data and quiz completion flag
        setResultData(null);
      } catch (error) {
        console.error("Error fetching next question:", error);
      }
    }
    if (qnIndex === 0) {
      setSelectedOptionIdx(optionIdx);
      // setTempValue(temp);
      setContext({ selectedOptions: temp });
      setTempValue(temp);

      fetchQuestionAndAnswer(temp);
    }
  };

  const fetchQuestionAndAnswer = async (tempValue) => {
    try {
      let responseData = [];
      if (qnIndex === 1) {
        // Call API 1 based on optionIdx
        if (selectedOptionIdx === 0) {
          
          const response = await axios.get(
            "http://localhost:3001/api/fitness-classes/GetCategories"
          );
          responseData = response.data.map((item) => ({
            id: item.id,
            category: item.name,
          }));

          
          setQns(responseData);
        } else if (selectedOptionIdx === 1) {
         
          responseData = [
            { id: 1, category: "Low" },
            { id: 2, category: "High" },
          ];
          setQns(responseData);
        } else if (selectedOptionIdx === 2) {
          
          responseData = [
            { id: 1, category: "Low" },
            { id: 2, category: "Medium" },
            { id: 3, category: "High" },
          ];
          setQns(responseData);
        }
      } else if (qnIndex === 2) {
       
        // Call API 2 based on optionIdx
        if (selectedOptionIdx === 0) {
          // const response = await axios.get(
          //   "http://localhost:3001/api/fitness-classes/Get"
          // );
          responseData = [
            { id: 1, category: "Calories" },
            { id: 2, category: "Intensity" },
          ];
          setQns(responseData);
        } else {
         
          responseData = [
            { id: 1, category: "Calories" },
            { id: 2, category: "Intensity" },
          ];
          setQns(responseData);
        }
      } else if (qnIndex === 3) {
     
        // Call API 3 based on optionIdx
        if (selectedOptionIdx === 0) {
          
          responseData = [
            { id: 1, category: "Low" },
            { id: 2, category: "High" },
          ];
          setQns(responseData);
        } else {
         
          responseData = [
            { id: 1, category: "Low" },
            { id: 2, category: "Medium" },
            { id: 3, category: "High" },
          ];
          setQns(responseData);
        }
      } else if (qnIndex === 4) {
        const categoryNames = tempValue.map((item, index) => {
          return item.category;
        });

        // Map category names to numbers
        const categoryMap = {};
        categoryNames.forEach((index, category) => {
          categoryMap[category] = index;
        });

  
        const response = await axios.get(
          "http://localhost:3001/api/fitness-classes/Get"
        );
        const filteredData = response.data.filter((item) => {
          return (
            item.category.includes(categoryMap["1"]) &&
            item.intensity.includes(categoryMap["3"])
          );
        });

        
        const randomizedData =
          filteredData.length > 5
            ? getRandomElements(filteredData, 5)
            : filteredData;


        setQns(randomizedData);
      }
    } catch (error) {
      console.error("Error fetching question and answer:", error);
    }
  };

  useEffect(() => {
    fetchQuestionAndAnswer(tempValue);
  }, [qnIndex, selectedOptionIdx, tempValue]);

  useEffect(() => {
    
    setRenderContent((prevContent) => prevContent + 1);
    
  }, [qns]);

  const [inputValues, setInputValues] = useState(Array(qns.length).fill(""));
  const [inputErrors, setInputErrors] = useState(Array(qns.length).fill(false));

  const handleInputChange = (e, idx) => {
    const value = e.target.value;
    //   // Perform validation
    const isValidNumber = /^-?\d+\.?\d*$/.test(value); // Validate number format
    const number = parseFloat(value);
    const isValidRange = number >= 100 && number <= 10000; // Validate number range
    setInputErrors((prevInputErrors) => {
      const updatedErrors = [...prevInputErrors];
      updatedErrors[idx] = !isValidNumber || !isValidRange;
      return updatedErrors;
    });
    setQns((prevQns) =>
      prevQns.map((item, index) => (index === idx ? { ...item, value } : item))
    );
  };

  return (
    <>
      <>
      <AppBar position="static" sx={{ backgroundColor: "#509151" }}>
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src="./fitness-logo.png"
              alt="Logo"
              style={{ height: "60px", marginRight: "20px" }}
            />
            <Typography variant="h6">Fitness Club...</Typography>
          </Box>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
        {qnIndex === 0 && (
          <RecommendationSection1
            qns={qns}
            updateAnswer={updateAnswer}
            handleReset={handleReset}
            qnIndex={qnIndex}
          />
        )}

        {!recommendExecuted && qnIndex === 1 && (
          <RecommendationSection2
            qns={qns}
            updateAnswer={updateAnswer}
            handleReset={handleReset}
            qnIndex={qnIndex}
            selectedOptionIdx={selectedOptionIdx}
            generateRecommend={generateRecommend}
            inputErrors={inputErrors}
            handleInputChange={handleInputChange}
          />
        )}

        {qnIndex === 2 && (
          <RecommendationSection3
            qns={qns}
            updateAnswer={updateAnswer}
            handleReset={handleReset}
            qnIndex={qnIndex}
            selectedOptionIdx={selectedOptionIdx}
            generateRecommend={generateRecommend}
            inputErrors={inputErrors}
            handleInputChange={handleInputChange}
          />
        )}

        {!recommendExecuted && qnIndex === 3 && (
          <RecommendationSection4
            qns={qns}
            updateAnswer={updateAnswer}
            handleReset={handleReset}
            qnIndex={qnIndex}
            selectedOptionIdx={selectedOptionIdx}
            generateRecommend={generateRecommend}
            inputErrors={inputErrors}
            handleInputChange={handleInputChange}
          />
        )}

        {qnIndex === 4 && (
          <TableDisplay
            qns={qns}
            updateAnswer={updateAnswer}
            handleReset={handleReset}
            qnIndex={qnIndex}
            selectedOptionIdx={selectedOptionIdx}
            generateRecommend={generateRecommend}
            inputErrors={inputErrors}
            handleInputChange={handleInputChange}
          />
        )}

        {recommendExecuted && (
          <DisplayTable
            qns={qns}
            updateAnswer={updateAnswer}
            handleReset={handleReset}
            qnIndex={qnIndex}
            selectedOptionIdx={selectedOptionIdx}
            generateRecommend={generateRecommend}
            inputErrors={inputErrors}
            handleInputChange={handleInputChange}
          />
        )}
      </>
    </>
  );
}
