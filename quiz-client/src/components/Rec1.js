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
} from "@mui/material";

export default function RecommendationSection1({
  qns,
  updateAnswer,
  handleReset,
  qnIndex,
}){
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
          title={"Achieve Your Fitness Goals---" + (qnIndex + 1)}
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
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={120} // Adjust the height as needed
        >
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
        </Box>
      </Card>
    );
}