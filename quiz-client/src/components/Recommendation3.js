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
  CardMedia,
} from "@mui/material";

export default function RecommendationSection3({
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
        <CardHeader title={"How would you like to go further..."} />
        {selectedOptionIdx === 0 ||
        selectedOptionIdx === 1 ||
        selectedOptionIdx === 2 ||
        selectedOptionIdx === 3 ||
        selectedOptionIdx === 4 ||
        selectedOptionIdx === 5 ||
        selectedOptionIdx === 6 ? (
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
            </CardContent>
          </>
        )}
        <CardMedia
          component="img"
          sx={{ width: 320 }}
          image="./image_2.png"
        />
      </Card>
    );
}