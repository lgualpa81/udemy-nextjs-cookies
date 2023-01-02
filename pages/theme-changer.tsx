import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { GetServerSideProps } from "next";
import { ChangeEvent, FC, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Layout } from "../components/layouts";
import axios from "axios";


interface Props {
  theme: string
}
const ThemeChangerPage: FC<Props> = ({theme}) => {
  
  
  const [currentTheme, setCurrentTheme] = useState(theme);
  const onThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedTheme: string = event.target.value;
    console.log({ selectedTheme });
    setCurrentTheme(selectedTheme);

    localStorage.setItem("theme", selectedTheme);
    Cookies.set("theme", selectedTheme);
  };

  const onClick = async () => {
    const { data } = await axios.get("/api/hello");
    console.log(data);
  };

  useEffect(() => {
    localStorage.setItem("theme", currentTheme);
  }, []);

  return (
    <Layout>
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel>Tema</FormLabel>
            <RadioGroup row value={currentTheme} onChange={onThemeChange}>
              <FormControlLabel
                value="light"
                control={<Radio />}
                label="Light"
              />
              <FormControlLabel value="dark" control={<Radio />} label="Dark" />
              <FormControlLabel
                value="custom"
                control={<Radio />}
                label="Custom"
              />
            </RadioGroup>
          </FormControl>
          <Button onClick={onClick}>Solicitud</Button>
        </CardContent>
      </Card>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;
  const { theme = "light", name = "name" } = req.cookies;
  const validThemes = ['light', 'dark', 'custom']
  return {
    props: {
      theme: validThemes.includes(theme) ? theme : 'dark',
      name,
    },
  };
};

export default ThemeChangerPage;
