import { useCallback, useEffect, useMemo, useState, type FC } from "react";
import { Button, Grid, Stack, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link, useParams } from "react-router";
import listApi from "../axios/listApi";
import { Anime } from "../type/typeApi";
import { AnimeStats } from "../components/AnimeStats/AnimeStats";
import SkeletonDetailAnime from "../components/Skeleton/DetailAnime";
import { toast } from "react-toastify";

const AnimeDetail: FC = () => {
  const params = useParams();

  const [dataAnime, setDataAnime] = useState<Anime>();
  const [isLoading, setisLoading] = useState(true);

  const _getAnimeById = useCallback((id: string) => {
    setisLoading(true);
    listApi.anime
      .getAnimeById(id)
      .then((res) => {
        setisLoading(false);
        const { data } = res.data;

        setDataAnime(data);
        console.log(data);
      })
      .catch((err) => {
        toast.error(err);
        setisLoading(false);
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (params?.id) {
      _getAnimeById(params.id);
    } else {
      setisLoading(false);
    }
  }, [_getAnimeById, params.id]);

  const renderDetailAnime = useMemo(() => {
    return (
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 3 }}>
          <img
            src={dataAnime?.images.webp.image_url}
            loading="lazy"
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 9 }} sx={{ gap: "16px" }}>
          <Stack
            spacing={2}
            sx={{
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Stack spacing={2}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  textAlign: {
                    xs: "center",
                    sm: "left",
                  },
                }}
              >
                Synopsis
              </Typography>
              <Typography
                sx={{
                  textAlign: {
                    xs: "justify",
                    sm: "left",
                  },
                }}
              >
                {dataAnime?.synopsis || "-"}
              </Typography>
            </Stack>
            <AnimeStats
              score={dataAnime?.score}
              scoredBy={dataAnime?.scored_by}
              rank={dataAnime?.rank}
              popularity={dataAnime?.popularity}
              members={dataAnime?.members}
            />
          </Stack>
        </Grid>
      </Grid>
    );
  }, [
    dataAnime?.images.webp.image_url,
    dataAnime?.members,
    dataAnime?.popularity,
    dataAnime?.rank,
    dataAnime?.score,
    dataAnime?.scored_by,
    dataAnime?.synopsis,
  ]);

  return (
    <Stack spacing={2}>
      {isLoading && <SkeletonDetailAnime />}

      {!isLoading && renderDetailAnime}

      <div>
        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{ backgroundColor: "#6640B3" }}
        >
          <ArrowBackIosIcon /> Back
        </Button>
      </div>
    </Stack>
  );
};

export default AnimeDetail;
