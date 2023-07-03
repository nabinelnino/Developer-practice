import React from "react";
import {
  Button,
  TableContainer,
  Typography,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,


} from "@mui/material";

export default function TableDisplay({
  qns,
  updateAnswer,
  handleReset,
  qnIndex,
  selectedOptionIdx,
  generateRecommend,
  inputErrors,
  handleInputChange,

})
{
    return(
        <>
        {qns.length > 0 ? (
          <TableContainer>
            {qns.length > 4 && (
              <div style={{ textAlign: "center" }}>
                <Typography variant="h6">
                  <span style={{ fontWeight: "bold", color: "#cfcf42" }}>
                    Here are five handpicked suggestions just for you:
                  </span>
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
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
                    <span style={{ fontWeight: "bold", color: "blue" }}>
                      Sorry, we couldn't find any results matching your
                      input for recommendations.
                    </span>
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <Button variant="contained" onClick={handleReset}>
                    Reset
                  </Button>
                </div>
              </TableRow>
            </TableHead>
          </Table>
        )}
      </>
    );
}