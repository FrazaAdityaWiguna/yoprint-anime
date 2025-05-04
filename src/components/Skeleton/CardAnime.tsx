import { type FC } from "react";
import { Skeleton, Stack } from "@mui/material";

const SkeletonCardAnime: FC = () => {
  return (
    <Stack spacing={2}>
      <Skeleton variant="rectangular" width={"100%"} height={180} />

      <Stack sx={{ p: "16px" }} spacing={1}>
        <Skeleton variant="rounded" width={"100%"} height={20} />
        <Skeleton variant="rounded" width={"100%"} height={20} />
      </Stack>
    </Stack>
  );
};

export default SkeletonCardAnime;
