import { Box, Pagination } from "@mui/material";

function ExplorerPagination({
  page,
  totalPages,
  setPage,
}) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      mt={4}
    >
      <Pagination
        color="primary"
        page={page}
        count={totalPages}
        onChange={(event, value) =>
          setPage(value)
        }
      />
    </Box>
  );
}

export default ExplorerPagination;