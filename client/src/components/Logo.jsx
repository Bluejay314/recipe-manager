import { Typography } from "@mui/material";

export function Logo({ content, variant }) {
    return (
        <Typography
        variant={variant}
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'Ultra',
          fontWeight: 400,
          letterSpacing: '.4rem',
          color: "rgb(64,64,64)",
          textShadow: "0px 0px 4px rgb(200,100,100)",
          textDecoration: 'none',
        }}
      >
        { content }
      </Typography>
    )
}