import React from "react";
import {
  SiReact,
  SiMui,
  SiSupabase,
  SiNodedotjs,
  SiPostgresql,
  SiAndroid,
  SiSqlite,
} from "react-icons/si";
import { DiJava } from "react-icons/di";

import wisely from "/projects/wisely.png";
import dev4you from "/projects/Dev4You.png";
import cs2skin from "/projects/CesTwoSkin.png";
import needworkapp from "/projects/needworkapp.png";
import tictactoe from "/projects/tictactoe.png";

export const techIcons = {
  react: { icon: <SiReact size={22} />, label: "React" },
  mui: { icon: <SiMui size={22} />, label: "Material UI" },
  supabase: { icon: <SiSupabase size={22} />, label: "Supabase" },
  nodejs: { icon: <SiNodedotjs size={22} />, label: "Node.js" },
  postgres: { icon: <SiPostgresql size={22} />, label: "PostgreSQL" },
  android: { icon: <SiAndroid size={22} />, label: "Android" },
  java: { icon: <DiJava size={24} />, label: "Java" },
  sqlite: { icon: <SiSqlite size={22} />, label: "SQLite" },
};

export const projects = [
  {
    slug: "wisely",
    title: "Wisely",
    description:
      "A warehouse and sales tracking app that helps small businesses manage products, track expiration dates, and optimize restocks.",
    image: wisely,
    liveLink: "https://www.wisely.id",
    github: "https://github.com/nervouswilliam/WISE/tree/master/frontend",
    tech: ["react", "mui", "supabase"],
  },
  {
    slug: "dev4you",
    title: "Dev4You",
    description:
      "A platform connecting nonprofits with developers to build websites and apps at minimal cost while helping developers gain real-world experience.",
    image: dev4you,
    github: "https://github.com/nervouswilliam/skripsi",
    tech: ["react", "mui", "nodejs", "postgres"],
  },
  {
    slug: "need-work",
    title: "Need Work",
    description:
      "A search engine platform that helps people search for jobs from different job sites and allowing the to apply effortlessly.",
    image: needworkapp,
    liveLink: "https://www.needworkapp.com",
    github: "https://github.com/nervouswilliam/needworkapp.com",
    tech: ["react", "mui"],
  },
  {
    slug: "cestwoskin",
    title: "CesTwoSkin",
    description:
      "A mobile application that enables gamers to buy, sell, and trade Counter-Strike 2 weapon skins securely and effortlessly.",
    image: cs2skin,
    github: "https://github.com/nervouswilliam/cestwo_skin",
    tech: ["android", "java", "sqlite"],
  },
  {
    slug: "tic-tac-shift",
    title: "Tic Tac Shift",
    description:
      "A web Application version of Tic Tac Toe with a twist, featuring a shifting board mechanic to enhance gameplay and strategy.",
    image: tictactoe,
    liveLink: "https://www.tictacshift.com",
    github: "https://github.com/nervouswilliam/TicTacToe",
    tech: ["react"],
  },
];

export const getProjectBySlug = (slug) => {
  return projects.find((project) => project.slug === slug);
};