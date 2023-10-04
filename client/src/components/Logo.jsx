import { Typography } from "@mui/material";

export function Logo({ content, variant }) {
    return (
        <Typography
        variant={variant}
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'block' },
          fontFamily: 'Ultra',
          fontWeight: 400,
          letterSpacing: '.4rem',
          color: "rgb(255, 255, 255)",
          textShadow: "0 0 4px rgb(0,0,0)",
          textDecoration: 'none',
        }}
      >
        { content }
      </Typography>
    )
}