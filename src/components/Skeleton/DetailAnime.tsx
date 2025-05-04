import { Grid, Skeleton, Stack } from "@mui/material";
import { type FC } from "react";

const SkeletonDetailAnime: FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 3 }}>
        <Skeleton variant="rounded" width={"100%"} height={300} />
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
            <Skeleton variant="rounded" width={100} height={20} />
            <Skeleton variant="rounded" width={"100%"} height={150} />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            {[1, 2, 4, 5].map((val) => (
              <Skeleton
                key={val}
                variant="rounded"
                sx={{
                  width: {
                    xs: "auto",
                    sm: "150px",
                  },
                }}
                height={100}
              />
            ))}
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default SkeletonDetailAnime;
