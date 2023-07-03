import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItemButton,
  Typography,
  Box,
  LinearProgress,
  TextField,
} from "@mui/material";

export default function RecommendationSection2({
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
        ) : selectedOptionIdx === 2 ? (
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
        )}
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
      </Card>
    );
}