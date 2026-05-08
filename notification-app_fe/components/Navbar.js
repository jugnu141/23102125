import Link from "next/link";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
        >
          Campus Notifications
        </Typography>

        <Link href="/">
          <Button color="inherit">
            All Notifications
          </Button>
        </Link>

        <Link href="/priority">
          <Button color="inherit">
            Priority Inbox
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}