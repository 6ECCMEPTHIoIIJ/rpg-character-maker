import Slide from "@mui/material/Slide";
import AppBar, { AppBarProps } from "@mui/material/AppBar";
import { FC } from "react";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import backgroundImage from "/background.jpg";

export type ScrollableAppBarProps = AppBarProps;

export const ScrollableAppBar: FC<ScrollableAppBarProps> = ({
  children,
  sx,
  ...rest
}) => {
  const trigger = useScrollTrigger({ threshold: 100 });
  return (
    <Slide appear={true} direction="down" in={!trigger}>
      <AppBar
        {...rest}
        sx={{
          ...sx,
          zIndex: 1,
          position: "sticky",
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            filter: "blur(1px) brightness(0.7) saturate(0.7)",
            zIndex: -1,
            boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.5)",
            transition: "all 2s",
            backgroundPosition: "top",
          },
          "&:hover:before": {
            backgroundPosition: "center",
            filter: "blur(0.5px) brightness(0.9) saturate(1.3)",
          },
        }}
      >
        <Toolbar>
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="space-between"
            p={6}
            sx={{ width: "100%" }}
          >
            {children}
          </Box>
        </Toolbar>
      </AppBar>
    </Slide>
  );
};

export default ScrollableAppBar;