import { useCallback, useEffect, useMemo, useState, type FC } from "react";
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TablePagination,
  Typography,
} from "@mui/material";
import SkeletonCardAnime from "../../components/Skeleton/CardAnime";
import listApi from "../../axios/listApi";
import { useDebounceCallback } from "../../utils";
import { Anime } from "../../type/typeApi";
import { Link } from "react-router";
import SearchIcon from "@mui/icons-material/Search";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { toast } from "react-toastify";

const Home: FC = () => {
  const [isLoading, setisLoading] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const [pagination, setpagination] = useState({
    limit: 10,
    page: 1,
    count: 0,
    total: 0,
  });

  const [listAnime, setListAnime] = useState<Anime[]>([]);

  const _getAnimeSearch = useCallback(
    (value: string, paginationArgs: { limit: number; page: number }) => {
      setisLoading(true);

      const params = {
        q: value,
        limit: paginationArgs.limit,
        page: paginationArgs.page,
      };

      listApi.anime
        .getAnimeSearch(params)
        .then((res) => {
          setisLoading(false);
          const { data, pagination } = res.data;

          setListAnime(data);

          setpagination((prev) => ({
            ...prev,
            ...pagination?.items,
          }));
        })
        .catch((err) => {
          setisLoading(false);
          console.error(err);
          toast.error(err);
        });
    },
    []
  );

  const debouncedSearch = useDebounceCallback(_getAnimeSearch, 250);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);

    const tempPagination = {
      limit: pagination.limit,
      page: 1,
    };

    setpagination((prev) => ({ ...prev, ...tempPagination }));

    debouncedSearch(e.target.value, tempPagination);
  };

  const handleChangePage = useCallback(
    (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      console.log(newPage);
      const tempPagination = {
        limit: pagination.limit,
        page: newPage + 1,
      };

      setpagination((prev) => ({
        ...prev,
        ...tempPagination,
      }));

      _getAnimeSearch(searchVal, tempPagination);
    },
    [_getAnimeSearch, pagination.limit, searchVal]
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const tempPagination = {
        limit: parseInt(event.target.value, 10),
        page: pagination.page,
      };
      setpagination((prev) => ({
        ...prev,
        ...tempPagination,
      }));

      _getAnimeSearch(searchVal, tempPagination);
    },
    [_getAnimeSearch, pagination.page, searchVal]
  );

  useEffect(() => {
    const tempPagination = {
      limit: pagination.limit,
      page: pagination.page,
    };

    _getAnimeSearch(searchVal, tempPagination);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderListAnime = useMemo(() => {
    return listAnime.map((item, idx) => {
      return (
        <Grid
          component={Link}
          to={`detail/${item.mal_id}`}
          key={`${item.mal_id}_${idx}`}
          size={{ sm: 4, md: 3 }}
          sx={{
            textDecoration: "none",
            minHeight: "300px",
            boxShadow: "0px 2px 11px -2px rgba(0,0,0,0.65)",
            borderRadius: "5px",
            width: "100%",
            transition: "0.3s",
            color: "#000",
            "&:hover": {
              color: "#0076ff",
              cursor: "pointer",
              transform: "scale(1.01)",
            },
          }}
        >
          <Stack spacing={2}>
            <img
              src={item.images.webp.image_url}
              alt={item.title}
              style={{
                width: "100%",
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px",
              }}
              loading="lazy"
            />
            <Typography
              variant="h4"
              sx={{
                fontSize: "1rem",
                fontWeight: 500,
                p: "16px",
              }}
            >
              {item.title}
            </Typography>
          </Stack>
        </Grid>
      );
    });
  }, [listAnime]);

  const renderNoData = useMemo(() => {
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ py: 8, color: "text.secondary" }}
      >
        <SearchOffIcon sx={{ fontSize: 64 }} />
        <Typography variant="h6">No results found</Typography>
        <Typography variant="body2">
          Try a different keyword or check your spelling.
        </Typography>
      </Stack>
    );
  }, []);

  return (
    <Stack spacing={2}>
      <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Search</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={"text"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          label="Search"
          value={searchVal}
          onChange={onInputChange}
        />
      </FormControl>

      <Box>
        <Grid container spacing={3}>
          {isLoading &&
            [1, 2, 3, 4, 5, 6, 7, 8].map((val) => (
              <Grid
                key={val}
                size={{ sm: 4, md: 3 }}
                sx={{
                  minHeight: "300px",
                  boxShadow: "0px 2px 11px -2px rgba(0,0,0,0.65)",
                  borderRadius: "5px",
                  width: "100%",
                }}
              >
                <SkeletonCardAnime />
              </Grid>
            ))}

          {!isLoading && listAnime.length > 0 && renderListAnime}
        </Grid>

        {!isLoading && listAnime.length < 1 && renderNoData}
      </Box>

      <TablePagination
        component="div"
        count={pagination.total}
        page={pagination.page - 1}
        onPageChange={handleChangePage}
        rowsPerPage={pagination.limit}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 15, 20, 25]}
        showFirstButton
        showLastButton
      />
    </Stack>
  );
};

export default Home;
