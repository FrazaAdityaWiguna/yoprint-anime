import { Box, Container, Typography } from "@mui/material";
import { Link, Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

export default function MainLayout() {
  return (
    <>
      <Box sx={{ backgroundColor: "#6640B3", p: "16px" }}>
        <Typography
          component={Link}
          to="/"
          color="#fff"
          variant="h1"
          sx={{ fontWeight: 500, fontSize: "1.5rem", textDecoration: "none" }}
        >
          Anime Search App
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ mt: "16px", mb: "32px" }}>
        <Outlet />
      </Container>

      <ToastContainer position="top-right" autoClose={4000} theme="colored" />
    </>
  );
}
