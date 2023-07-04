import React, { useEffect, useState } from "react";
import axios from "axios";
import useStateContext from "../hooks/useStateContext";
import "../hooks/Quiz.css";

import {
  Button,
  Grid,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItemButton,
  Typography,
  Box,
  LinearProgress,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,

} from "@mui/material";
import testjson from "./test.json";

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

  const handleReset = () => {
    window.location.reload();
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
    if (tempValue[0].category ==="Intensity") {
    let apiUrl = "http://localhost:3001/api/fitness-classes/GetByIntensity";
    let params = new URLSearchParams({ intensity: category_name });
    let response = await axios.get(`${apiUrl}?${params}`);
      console.log(response.data);
     responseData = response.data;
    } else {

      const values = catname.split(",").map((value) => parseInt(value.trim()));
      const min = values[0];
      const max = values[1];
      let apiUrl =  "http://localhost:3001/api/fitness-classes/GetByCalories";
      let params = new URLSearchParams({ min: min, max: max });
      const response = await axios.get(`${apiUrl}?${params}`);
      responseData = response.data;

    } 
    // Randomly select 3 responses if there are more than 5
    const randomizedData =
      responseData.length > 5
        ? getRandomElements(responseData, 5)
        : responseData;

    
    // const randomizedDataWithLength = {
    //       data1: randomizedData,
    //       length: responseData.length
    //     };

      // console.log("RANDOM data",randomizedDataWithLength);

    setRecommendExecuted(true);
    setQns(randomizedData);
    
  };





  const getRandomElements = (array, count) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const updateAnswer = async (qnId, optionIdx, catname) => {
    console.log("first block", catname);
    const temp = [...context.selectedOptions];
    setSelectedOptionIdx(optionIdx);

    console.log("---------------------", optionIdx);
    temp.push({
      qnId,
      selected: optionIdx,
      category: catname,
    });

    setContext({ selectedOptions: temp });
    setTempValue(temp);
    if (qnIndex < 1) {
      console.log("TEMP!", temp);
      setContext({ selectedOptions: temp });
      setQnIndex(qnIndex + 1);
    } else {
      console.log("Into the else block");
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
      console.log("TEMP2", temp);
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
      console.log("dfghjkl;dfghjkdfghjk", qnIndex, tempValue);
      let responseData = [];
      if (qnIndex === 1) {
        // Call API 1 based on optionIdx
        if (selectedOptionIdx === 0) {
          console.log("Get all categories");
          const response = await axios.get(
            "http://localhost:3001/api/fitness-classes/GetCategories"
          );
          responseData = response.data.map((item) => ({
            id: item.id,
            category: item.name,
          }));

          console.log("id", responseData);
          setQns(responseData);
        } else if (selectedOptionIdx === 1) {
          console.log("TEST 1 OF 2");
          console.log(
            "BBBBBBBBBBBBBBBBB",
            qnIndex,
            selectedOptionIdx,
            tempValue
          );
          responseData = [
            { id: 1, category: "Low" },
            { id: 2, category: "High" },
          ];
          setQns(responseData);
        } else if (selectedOptionIdx === 2) {
          console.log("TEST 1 OF 2");
          responseData = [
            { id: 1, category: "Low" },
            { id: 2, category: "Medium" },
            { id: 3, category: "High" },
          ];
          setQns(responseData);
        }
      } else if (qnIndex === 2) {
        console.log("INDEX2");
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
          console.log("this is the oneeeee");
          responseData = [
            { id: 1, category: "Calories" },
            { id: 2, category: "Intensity" },
          ];
          setQns(responseData);
        }
      } else if (qnIndex === 3) {
        console.log("INDEX3");
        // Call API 3 based on optionIdx
        if (selectedOptionIdx === 0) {
          console.log("--------------------------------");
          responseData = [
            { id: 1, category: "Low" },
            { id: 2, category: "High" },
          ];
          setQns(responseData);
        } else {
          console.log("++++++++++++++++++++++++++++++++");
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
      
        console.log("MAPPING----",categoryMap);
        console.log("selected index",selectedOptionIdx)
        console.log("INDEX4444444",categoryMap["1"]);
        console.log(tempValue);
        console.log("all intensity",tempValue);

        // Call API 3 based on optionIdx
        const response = await axios.get(
          "http://localhost:3001/api/fitness-classes/Get"
        );
        const filteredData = response.data.filter((item) => {
          return item.category.includes(categoryMap["1"]) && item.intensity.includes(categoryMap["3"]);
        });
        // console.log("FILTERRRR_______", response.data);
        // console.log("FILTERRRR_______+++++++++++", filteredData);

        setQns(filteredData);
      }
    } catch (error) {
      console.error("Error fetching question and answer:", error);
    }
  };

  useEffect(() => {
    fetchQuestionAndAnswer(tempValue);
  }, [qnIndex, selectedOptionIdx, tempValue]);

  useEffect(() => {
    console.log("Updated qns:", qns);
    setRenderContent((prevContent) => prevContent + 1);
    console.log(renderContent);
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
        {qnIndex === 0 && (
          <Card
            sx={{
              maxWidth: 640,
              mx: "auto",
              mt: 5,
              "& .MuiCardHeader-action": { m: 0, alignSelf: "center" },
            }}
          >
            <CardHeader
              title={"Achieve Your Fitness Goals--- " + (qnIndex + 1)}
              action={<Typography></Typography>}
            />
            <CardHeader title={"Please Choose your preferred method.."} />

            <Box>
              <LinearProgress
                variant="determinate"
                value={((qnIndex + 1) * 100) / 5}
              />
            </Box>
            <CardContent>
              <Typography variant="h6"></Typography>
              <List>
                {qns.map((item, qnId) => (
                  <ListItemButton
                    disableRipple
                    key={item.qnId}
                    onClick={() => updateAnswer(item.qnId, qnId, item.category)}
                  >
                    <div>
                      <b>{String.fromCharCode(65 + qnId) + " . "}</b>
                      {item.category}
                    </div>
                  </ListItemButton>
                ))}
              </List>
              {/* <pre>{JSON.stringify(qns, null, 2)}</pre> */}
            </CardContent>
          </Card>
        )}

        {!recommendExecuted && qnIndex === 1 && (
          <Card
            sx={{
              maxWidth: 640,
              mx: "auto",
              mt: 5,
              "& .MuiCardHeader-action": { m: 0, alignSelf: "center" },
            }}
          >
            <CardHeader
              title={"Achieve Your Fitness Goals--- "+ (qnIndex + 1)}
              action={<Typography></Typography>}
            />
            <CardHeader title={"Set Your Desired Values/Methods....."} />
            {selectedOptionIdx === 1 ? (
              <CardContent>
                <Typography variant="h6"></Typography>
                <List>
                  {qns.map((item, idx) => (
                    <React.Fragment key={item.qnId}>
                      <TextField
                        key={item.qnId}
                        label={item.category}
                        value={qns[idx].value}
                        variant="outlined"
                        fullWidth
                        error={inputErrors[idx]}
                        helperText={inputErrors[idx] ? "Invalid number" : ""}
                        onChange={(e) => handleInputChange(e, idx)}
                      />

                      {idx === qns.length - 1 && (
                        <Button
                          variant="contained"
                          sx={{ mt: 2 }}
                          size="small"
                          onClick={() => {
                            const values = qns.map((item) => item.value); // Get values from text fields
                            console.log("KDSHFKSH", values);
                            generateRecommend(values.join(", ")); // Pass the values array
                            
                          }}
                        >
                          Submit
                        </Button>
                      )}
                    </React.Fragment>
                  ))}
                </List>
                
              </CardContent>
            ):selectedOptionIdx === 2 ? (
<CardContent>
                  <Typography variant="h6"></Typography>
                  <List>
                    {qns.map((item, id) => (
                      <ListItemButton
                        disableRipple
                        key={item.qnId}
                        onClick={() => generateRecommend(item.category)}
                      >
                        <div>
                          <b>{String.fromCharCode(65 + id) + " . "}</b>
                          {item.category}
                        </div>
                      </ListItemButton>
                    ))}
                  </List>
                </CardContent>

            )
            : (
              <>
                <Box>
                  <LinearProgress
                    variant="determinate"
                    value={((qnIndex + 1) * 100) / 5}
                  />
                </Box>
                <CardContent>
                  <Typography variant="h6"></Typography>
                  <List>
                    {qns.map((item, id) => (
                      <ListItemButton
                        disableRipple
                        key={item.qnId}
                        onClick={() => updateAnswer(item.qnId, id,item.category)}
                      >
                        <div>
                          <b>{String.fromCharCode(65 + id) + " . "}</b>
                          {item.category}
                        </div>
                      </ListItemButton>
                    ))}
                  </List>
                  {/* <pre>{JSON.stringify(qns, null, 2)}</pre> */}
                </CardContent>
              </>
            )}
          </Card>
        )}

        {qnIndex === 2 && (
          <Card
            sx={{
              maxWidth: 640,
              mx: "auto",
              mt: 5,
              "& .MuiCardHeader-action": { m: 0, alignSelf: "center" },
            }}
          >
            <CardHeader
              title={"Achieve Your Fitness Goals--- " + (qnIndex + 1)}
              action={<Typography></Typography>}
            />
            <CardHeader title={"How would you like to go further..."} />
            {selectedOptionIdx === 0 || selectedOptionIdx === 1 || selectedOptionIdx === 2 || selectedOptionIdx === 3 || selectedOptionIdx === 4|| selectedOptionIdx === 5|| selectedOptionIdx === 6 ? (
              <CardContent>
                <Typography variant="h6"></Typography>
                <List>
                  {qns.map((item, qnId) => (
                    <ListItemButton
                      disableRipple
                      key={item.qnId}
                      onClick={() =>
                        updateAnswer(item.qnId, qnId, item.category)
                      }
                    >
                      <div>
                        <b>{String.fromCharCode(65 + qnId) + " . "}</b>
                        {item.category}
                      </div>
                    </ListItemButton>
                  ))}
                </List>
              </CardContent>
            ) : (
              <>
              <CardHeader title={"Achieve Your Fitness Goals--- "} />
                <Box>
                  <LinearProgress
                    variant="determinate"
                    value={((qnIndex + 1) * 100) / 5}
                  />
                </Box>
                <CardContent>
                  <Typography variant="h6"></Typography>
                  <List>
                    {qns.map((item, id) => (
                      <ListItemButton
                        disableRipple
                        key={item.qnId}
                        onClick={() => updateAnswer(item.qnId, id,item.category)}
                      >
                        <div>
                          <b>{String.fromCharCode(65 + id) + " . "}</b>
                          {item.category}
                        </div>
                      </ListItemButton>
                    ))}
                  </List>
                
                </CardContent>
              </>
            )}
          </Card>
        )}

        {!recommendExecuted && qnIndex === 3 && (
          <Card
            sx={{
              maxWidth: 640,
              mx: "auto",
              mt: 5,
              "& .MuiCardHeader-action": { m: 0, alignSelf: "center" },
            }}
          >
            <CardHeader
              title={"Achieve Your Fitness Goals---  " + (qnIndex + 1) }
              action={<Typography></Typography>}
            />
            <CardHeader title={"Please Enter your desired values....."} />
            {selectedOptionIdx === 0 ? (
 <CardContent>
 <Typography variant="h6"></Typography>
 <List>
   {qns.map((item, idx) => (
     <React.Fragment key={item.qnId}>
       <TextField
         key={item.qnId}
         label={item.category}
         value={qns[idx].value}
         variant="outlined"
         fullWidth
         error={inputErrors[idx]}
         helperText={inputErrors[idx] ? "Invalid number" : ""}
         onChange={(e) => handleInputChange(e, idx)}
       />

       {idx === qns.length - 1 && (
         <Button
           variant="contained"
           sx={{ mt: 2 }}
           size="small"
           onClick={() => {
             const values = qns.map((item) => item.value); // Get values from text fields
             console.log("KDSHFKSH", values, <CardContent>
                <Typography variant="h6"></Typography>
                <List>
                  {qns.map((item, idx) => (
                    <React.Fragment key={item.qnId}>
                      <TextField
                        key={item.qnId}
                        label={item.category}
                        value={qns[idx].value}
                        variant="outlined"
                        fullWidth
                        error={inputErrors[idx]}
                        helperText={inputErrors[idx] ? "Invalid number" : ""}
                        onChange={(e) => handleInputChange(e, idx)}
                      />

                      {idx === qns.length - 1 && (
                        <Button
                          variant="contained"
                          sx={{ mt: 2 }}
                          size="small"
                          onClick={() => {
                            const values = qns.map((item) => item.value); // Get values from text fields
                            console.log("KDSHFKSH", values,qnIndex);
                            generateRecommend(values.join(", ")); // Pass the values array
                          
                          }}
                        >
                          Submit
                        </Button>
                      )}
                    </React.Fragment>
                  ))}
                </List>
                {/* <pre>{JSON.stringify(qns, null, 2)}</pre> */}
              </CardContent>);
             generateRecommend(values.join(", ")); // Pass the values array
           }}
         >
           Submit
         </Button>
       )}
     </React.Fragment>
   ))}
 </List>
 <pre>{JSON.stringify(qns, null, 2)}</pre>
</CardContent>
            ) : selectedOptionIdx === 1 ? (
              <>
                <Box>
                  <LinearProgress
                    variant="determinate"
                    value={((qnIndex + 1) * 100) / 5}
                  />
                </Box>
                <CardContent>
                  <Typography variant="h6"></Typography>
                  <List>
                    {qns.map((item, id) => (
                      <ListItemButton
                        disableRipple
                        key={item.qnId}
                        onClick={() =>
                          updateAnswer(item.qnId, id, item.category)
                        }
                      >
                        <div>
                          <b>{String.fromCharCode(65 + id) + " . "}</b>
                          {item.category}
                        </div>
                      </ListItemButton>
                    ))}
                  </List>
                  {/* <pre>{JSON.stringify(qns, null, 2)}</pre> */}
                </CardContent>
              </>
            ) : (
              <>
                <Box>
                  <LinearProgress
                    variant="determinate"
                    value={((qnIndex + 1) * 100) / 5}
                  />
                </Box>
                <CardContent>
                  <Typography variant="h6"></Typography>
                  <List>
                    {qns.map((item, id) => (
                      <ListItemButton
                        disableRipple
                        key={item.qnId}
                        onClick={() => updateAnswer(item.qnId, id,item.category)}
                      >
                        <div>
                          <b>{String.fromCharCode(65 + id) + " . "}</b>
                          {item.category}
                        </div>
                      </ListItemButton>
                    ))}
                  </List>
                  {/* <pre>{JSON.stringify(qns, null, 2)}</pre> */}
                </CardContent>
              </>
            )}
          </Card>
        )}

        {qnIndex === 4 && (
                   <>
           
                   {qns.length > 0 ? (
                     <TableContainer>
                       {qns.length > 4 && (
            <div style={{ textAlign: "center" }}>
           <Typography variant="h6">
             Here are 5 recommendations that you might like...
           </Typography>
         </div>
             )}
                       <Table>
                         <TableHead>
                           <TableRow>
                             <TableCell>Class Name</TableCell>
                   
                             <TableCell>Category</TableCell>
                     
                             <TableCell>Calories</TableCell>
                             <TableCell>Intensity</TableCell>
                             <TableCell>Requires Equipment</TableCell>
                           </TableRow>
                         </TableHead>
                         <TableBody>
                           {qns.map((fitnessClass) => (
                             <TableRow key={fitnessClass.className}>
                               <TableCell>{fitnessClass.className}</TableCell>
                       
                               <TableCell>
                                 {Array.isArray(fitnessClass.category)
                                   ? fitnessClass.category.join(", ")
                                   : fitnessClass.category}
                               </TableCell>
                          
                               <TableCell>{fitnessClass.calories}</TableCell>
                               <TableCell>{fitnessClass.intensity}</TableCell>
                               <TableCell>
                                 {fitnessClass.requiresEquipment ? "Yes" : "No"}
                               </TableCell>
                             </TableRow>
                           ))}
                         </TableBody>
                       </Table>
                       <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
          <Button variant="contained" onClick={handleReset}>
            Reset
          </Button>
        </div>
                     </TableContainer>
                   ) : (
                     <Table>
                       <TableHead>
                         <TableRow>
                           <TableCell align="center" colSpan={7}>
                             <Typography variant="body1">
                               No data available-----
                             </Typography>
                           </TableCell>
                         </TableRow>
                         <TableRow>
                           <TableCell align="center" colSpan={3}>
                             <Button variant="contained" onClick={handleReset}>
                               Reset
                             </Button>
                           </TableCell>
                         </TableRow>
                       </TableHead>
                     </Table>
                   )}
                 </>
          )}

      


{recommendExecuted  && (
            <>
           
              {qns.length > 0 ? (
                <TableContainer>
                  {qns.length > 4 && (
       <div style={{ textAlign: "center" }}>
      <Typography variant="h6">
        Here are 5 recommendations that you might like...
      </Typography>
    </div>
        )}
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Class Name</TableCell>
              
                        <TableCell>Category</TableCell>
                
                        <TableCell>Calories</TableCell>
                        <TableCell>Intensity</TableCell>
                        <TableCell>Requires Equipment</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {qns.map((fitnessClass) => (
                        <TableRow key={fitnessClass.className}>
                          <TableCell>{fitnessClass.className}</TableCell>
                  
                          <TableCell>
                            {Array.isArray(fitnessClass.category)
                              ? fitnessClass.category.join(", ")
                              : fitnessClass.category}
                          </TableCell>
                     
                          <TableCell>{fitnessClass.calories}</TableCell>
                          <TableCell>{fitnessClass.intensity}</TableCell>
                          <TableCell>
                            {fitnessClass.requiresEquipment ? "Yes" : "No"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Button variant="contained" onClick={handleReset}>
                    Reset
                  </Button>
                </TableContainer>
              ) : (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" colSpan={7}>
                        <Typography variant="body1">
                          No data available-----
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center" colSpan={3}>
                      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
          <Button variant="contained" onClick={handleReset}>
            Reset
          </Button>
        </div>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              )}
            </>
          )}

      </>
    </>
  );
}
