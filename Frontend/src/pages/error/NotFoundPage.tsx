import { Box, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h3" mb={1}>
        404
      </Typography>
      <Typography variant="h6" mb={3}>
        Page not found
      </Typography>

      <Button
        variant="contained"
        component={RouterLink}
        to="/login"
      >
        Go to Login
      </Button>
    </Box>
  );
};

export default NotFoundPage;
