import { FC } from "react";
import { Stack, Typography } from "@mui/material";
import { formatNumberWithCommas } from "../../utils";

type AnimeStatsProps = {
  score?: number;
  scoredBy?: number;
  rank?: number;
  popularity?: number;
  members?: number;
};

type StatItem = {
  label: string;
  value: string | number | undefined;
  sub?: string;
  bgColor: string;
  color: string;
};

export const AnimeStats: FC<AnimeStatsProps> = ({
  score,
  scoredBy,
  rank,
  popularity,
  members,
}) => {
  const items: StatItem[] = [
    {
      label: "Score",
      value: score || "-",
      sub: scoredBy ? `${formatNumberWithCommas(scoredBy)} Users` : "-",
      bgColor: "#E1F1F1",
      color: "#0C419E",
    },
    {
      label: "Rank",
      value: rank ? `#${rank}` : "-",
      sub: "RANKED",
      bgColor: "#FBE4EC",
      color: "#481789",
    },
    {
      label: "Popularity",
      value: popularity ? `#${formatNumberWithCommas(popularity)}` : "-",
      sub: "POPULARITY",
      bgColor: "#F3E4F5",
      color: "#850F4D",
    },
    {
      label: "Members",
      value: members ? `#${formatNumberWithCommas(members)}` : "-",
      sub: "MEMBERS",
      bgColor: "#E3F2FC",
      color: "#196B5F",
    },
  ];

  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
      {items.map((item, idx) => (
        <Stack
          key={idx}
          sx={{
            width: {
              xs: "auto",
              sm: "150px",
            },
            backgroundColor: item.bgColor,
            color: item.color,
            p: "16px",
            borderRadius: 2,
            overflow: "auto",
          }}
          alignItems="center"
          justifyContent="center"
        >
          <Typography fontWeight="bold" sx={{ fontSize: "1.5rem" }}>
            {item.value}
          </Typography>
          <Typography sx={{ fontSize: "0.8rem" }}>{item.sub}</Typography>
        </Stack>
      ))}
    </Stack>
  );
};
