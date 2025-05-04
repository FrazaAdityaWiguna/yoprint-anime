import { Button, Stack, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={3}
      sx={{ minHeight: "100vh", textAlign: "center", px: 2 }}
    >
      <ErrorOutlineIcon color="error" sx={{ fontSize: 80 }} />
      <Typography variant="h4" fontWeight={600}>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary">
        The page you’re looking for doesn’t exist or has been moved.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")} sx={{ mt: 2 }}>
        Back to Home
      </Button>
    </Stack>
  );
};

export default NotFoundPage;
