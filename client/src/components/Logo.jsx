import { Typography } from "@mui/material";

export function Logo({ content, variant }) {
    return (
        <Typography
        variant={variant}
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'raleway',
          fontWeight: 800,
          letterSpacing: '.4rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        { content }
      </Typography>
    )
}